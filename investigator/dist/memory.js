"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBInvestigationStore = void 0;
exports.investigationNamespace = investigationNamespace;
exports.saveInvestigation = saveInvestigation;
exports.buildMemoryContext = buildMemoryContext;
const crypto_1 = require("crypto");
const langgraph_checkpoint_1 = require("@langchain/langgraph-checkpoint");
// ---------------------------------------------------------------------------
// MongoDBInvestigationStore — BaseStore implementation backed by MongoDB
// ---------------------------------------------------------------------------
/**
 * A LangGraph-compatible BaseStore backed by MongoDB.
 *
 * Supports:
 *  - put / get / delete / search / listNamespaces
 *  - Full-text search on `value.symptom`, `value.summary`, `value.claim`
 *  - Namespace-scoped queries for multi-user isolation
 *
 * @example
 * ```typescript
 * const store = new MongoDBInvestigationStore(mongoClient);
 * await store.start(); // creates indexes once
 *
 * const graph = buildInvestigator({ model, clients, store });
 * ```
 */
class MongoDBInvestigationStore extends langgraph_checkpoint_1.BaseStore {
    col;
    constructor(client, dbName = 'investigator', collectionName = 'memory') {
        super();
        this.col = client.db(dbName).collection(collectionName);
    }
    /** Call once on startup to create MongoDB indexes. */
    async start() {
        await this.col.createIndex({ namespace: 1, key: 1 }, { unique: true });
        await this.col.createIndex({ namespace: 1 });
        await this.col.createIndex({
            'value.symptom': 'text',
            'value.summary': 'text',
            'value.claim': 'text',
            'value.findings.claim': 'text',
        }, { name: 'text_search', weights: { 'value.symptom': 10, 'value.summary': 5 } });
        // Auto-expire investigations after 90 days
        await this.col.createIndex({ createdAt: 1 }, { expireAfterSeconds: 90 * 24 * 60 * 60, name: 'ttl_90d' });
    }
    async stop() {
        // nothing — MongoClient lifecycle is managed by the caller
    }
    // -------------------------------------------------------------------------
    // Core batch() — the only abstract method; all convenience methods delegate
    // -------------------------------------------------------------------------
    async batch(operations) {
        const results = await Promise.all(operations.map(async (op) => this._dispatch(op)));
        return results;
    }
    async _dispatch(op) {
        if ('namespacePrefix' in op)
            return this._search(op);
        if ('namespace' in op && 'key' in op && 'value' in op)
            return this._put(op);
        if ('namespace' in op && 'key' in op)
            return this._get(op);
        return this._listNamespaces(op);
    }
    async _put(op) {
        if (op.value === null) {
            await this.col.deleteOne({ namespace: op.namespace, key: op.key });
            return;
        }
        await this.col.updateOne({ namespace: op.namespace, key: op.key }, {
            $set: { namespace: op.namespace, key: op.key, value: op.value, updatedAt: new Date() },
            $setOnInsert: { createdAt: new Date() },
        }, { upsert: true });
    }
    async _get(op) {
        const doc = await this.col.findOne({ namespace: op.namespace, key: op.key });
        if (!doc)
            return null;
        return { namespace: doc.namespace, key: doc.key, value: doc.value, createdAt: doc.createdAt, updatedAt: doc.updatedAt };
    }
    async _search(op) {
        const query = {};
        if (op.namespacePrefix.length > 0) {
            // Match all namespace prefix segments
            query['namespace'] = { $all: op.namespacePrefix };
        }
        if (op.query) {
            query['$text'] = { $search: op.query };
        }
        if (op.filter) {
            for (const [k, v] of Object.entries(op.filter)) {
                query[`value.${k}`] = v;
            }
        }
        const projection = op.query
            ? { score: { $meta: 'textScore' } }
            : {};
        const sort = op.query
            ? { score: { $meta: 'textScore' } }
            : { createdAt: -1 };
        const docs = await this.col
            .find(query, { projection })
            .sort(sort)
            .skip(op.offset ?? 0)
            .limit(op.limit ?? 10)
            .toArray();
        return docs.map((doc) => ({
            namespace: doc.namespace,
            key: doc.key,
            value: doc.value,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
            score: doc['score'],
        }));
    }
    async _listNamespaces(op) {
        const docs = await this.col
            .find({}, { projection: { namespace: 1 } })
            .skip(op.offset ?? 0)
            .limit(op.limit ?? 100)
            .toArray();
        const seen = new Set();
        const result = [];
        for (const doc of docs) {
            const ns = op.maxDepth !== undefined ? doc.namespace.slice(0, op.maxDepth) : doc.namespace;
            const key = JSON.stringify(ns);
            if (!seen.has(key)) {
                seen.add(key);
                result.push(ns);
            }
        }
        return result;
    }
}
exports.MongoDBInvestigationStore = MongoDBInvestigationStore;
// ---------------------------------------------------------------------------
// Helpers used by graph nodes
// ---------------------------------------------------------------------------
/** Namespace for long-term investigation memory, scoped per user (or 'global'). */
function investigationNamespace(userId) {
    return ['investigations', userId ?? 'global'];
}
/**
 * Saves a completed investigation to the long-term store.
 * Called by the memorySaver node.
 */
async function saveInvestigation(store, state, durationMs) {
    const lastMsg = state.messages.at(-1);
    const rawSummary = lastMsg !== undefined
        ? typeof lastMsg.content === 'string'
            ? lastMsg.content
            : JSON.stringify(lastMsg.content)
        : '';
    const value = {
        symptom: state.symptom,
        summary: rawSummary.slice(0, 2000),
        findings: state.findings,
        queriesExecuted: state.results.length,
        durationMs,
        userId: state.userId,
    };
    const ns = investigationNamespace(state.userId);
    const key = (0, crypto_1.randomUUID)();
    await store.put(ns, key, value);
}
/**
 * Searches long-term store for past investigations similar to the given symptom.
 * Returns a formatted string injected into the planner's context.
 */
async function buildMemoryContext(store, symptom, userId, limit = 3) {
    const ns = investigationNamespace(userId);
    const hits = await store.search(ns, { query: symptom, limit }).catch(() => []);
    if (hits.length === 0)
        return '';
    const lines = hits.map((hit, i) => {
        const v = hit.value;
        const findingSummary = (v.findings ?? [])
            .slice(0, 3)
            .map((f) => `  • [${f.confidence}] ${f.claim}`)
            .join('\n');
        return [
            `Past investigation ${i + 1}: "${v.symptom ?? '?'}"`,
            `Summary: ${(v.summary ?? '').slice(0, 300)}`,
            findingSummary ? `Key findings:\n${findingSummary}` : '',
        ]
            .filter(Boolean)
            .join('\n');
    });
    return lines.join('\n\n');
}
//# sourceMappingURL=memory.js.map