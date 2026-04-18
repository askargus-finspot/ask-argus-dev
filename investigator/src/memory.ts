import { randomUUID } from 'crypto';
import type { Collection, MongoClient, Sort } from 'mongodb';
import {
  BaseStore,
  type Item,
  type SearchItem,
  type Operation,
  type OperationResults,
  type GetOperation,
  type PutOperation,
  type SearchOperation,
  type ListNamespacesOperation,
} from '@langchain/langgraph-checkpoint';
import type { InvestigationState } from './state';
import type { Finding } from './types';

// ---------------------------------------------------------------------------
// Stored document shape inside MongoDB
// ---------------------------------------------------------------------------

interface StoreDoc {
  namespace: string[];
  key: string;
  value: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

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
export class MongoDBInvestigationStore extends BaseStore {
  private readonly col: Collection<StoreDoc>;

  constructor(
    client: MongoClient,
    dbName = 'investigator',
    collectionName = 'memory',
  ) {
    super();
    this.col = client.db(dbName).collection<StoreDoc>(collectionName);
  }

  /** Call once on startup to create MongoDB indexes. */
  async start(): Promise<void> {
    await this.col.createIndex({ namespace: 1, key: 1 }, { unique: true });
    await this.col.createIndex({ namespace: 1 });
    await this.col.createIndex(
      {
        'value.symptom': 'text',
        'value.summary': 'text',
        'value.claim': 'text',
        'value.findings.claim': 'text',
      },
      { name: 'text_search', weights: { 'value.symptom': 10, 'value.summary': 5 } },
    );
    // Auto-expire investigations after 90 days
    await this.col.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 90 * 24 * 60 * 60, name: 'ttl_90d' },
    );
  }

  async stop(): Promise<void> {
    // nothing — MongoClient lifecycle is managed by the caller
  }

  // -------------------------------------------------------------------------
  // Core batch() — the only abstract method; all convenience methods delegate
  // -------------------------------------------------------------------------

  async batch<Op extends Operation[]>(operations: Op): Promise<OperationResults<Op>> {
    const results = await Promise.all(
      operations.map(async (op) => this._dispatch(op)),
    );
    return results as OperationResults<Op>;
  }

  private async _dispatch(op: Operation): Promise<unknown> {
    if ('namespacePrefix' in op) return this._search(op as SearchOperation);
    if ('namespace' in op && 'key' in op && 'value' in op) return this._put(op as PutOperation);
    if ('namespace' in op && 'key' in op) return this._get(op as GetOperation);
    return this._listNamespaces(op as ListNamespacesOperation);
  }

  private async _put(op: PutOperation): Promise<void> {
    if (op.value === null) {
      await this.col.deleteOne({ namespace: op.namespace, key: op.key });
      return;
    }
    await this.col.updateOne(
      { namespace: op.namespace, key: op.key },
      {
        $set: { namespace: op.namespace, key: op.key, value: op.value, updatedAt: new Date() },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true },
    );
  }

  private async _get(op: GetOperation): Promise<Item | null> {
    const doc = await this.col.findOne({ namespace: op.namespace, key: op.key });
    if (!doc) return null;
    return { namespace: doc.namespace, key: doc.key, value: doc.value, createdAt: doc.createdAt, updatedAt: doc.updatedAt };
  }

  private async _search(op: SearchOperation): Promise<SearchItem[]> {
    const query: Record<string, unknown> = {};

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

    const sort: Sort = op.query
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
      score: (doc as Record<string, unknown>)['score'] as number | undefined,
    }));
  }

  private async _listNamespaces(op: ListNamespacesOperation): Promise<string[][]> {
    const docs = await this.col
      .find({}, { projection: { namespace: 1 } })
      .skip(op.offset ?? 0)
      .limit(op.limit ?? 100)
      .toArray();

    const seen = new Set<string>();
    const result: string[][] = [];

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

// ---------------------------------------------------------------------------
// Stored investigation value shape
// ---------------------------------------------------------------------------

export interface StoredInvestigationValue {
  symptom: string;
  summary: string;
  findings: Finding[];
  queriesExecuted: number;
  durationMs: number;
  userId?: string;
}

// ---------------------------------------------------------------------------
// Helpers used by graph nodes
// ---------------------------------------------------------------------------

/** Namespace for long-term investigation memory, scoped per user (or 'global'). */
export function investigationNamespace(userId?: string): string[] {
  return ['investigations', userId ?? 'global'];
}

/**
 * Saves a completed investigation to the long-term store.
 * Called by the memorySaver node.
 */
export async function saveInvestigation(
  store: BaseStore,
  state: InvestigationState,
  durationMs: number,
): Promise<void> {
  const lastMsg = state.messages.at(-1);
  const rawSummary =
    lastMsg !== undefined
      ? typeof lastMsg.content === 'string'
        ? lastMsg.content
        : JSON.stringify(lastMsg.content)
      : '';

  const value: StoredInvestigationValue = {
    symptom: state.symptom,
    summary: rawSummary.slice(0, 2000),
    findings: state.findings,
    queriesExecuted: state.results.length,
    durationMs,
    userId: state.userId,
  };

  const ns = investigationNamespace(state.userId);
  const key = randomUUID();

  await store.put(ns, key, value as unknown as Record<string, unknown>);
}

/**
 * Searches long-term store for past investigations similar to the given symptom.
 * Returns a formatted string injected into the planner's context.
 */
export async function buildMemoryContext(
  store: BaseStore,
  symptom: string,
  userId?: string,
  limit = 3,
): Promise<string> {
  const ns = investigationNamespace(userId);

  const hits = await store.search(ns, { query: symptom, limit }).catch(() => [] as SearchItem[]);

  if (hits.length === 0) return '';

  const lines = hits.map((hit, i) => {
    const v = hit.value as Partial<StoredInvestigationValue>;
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
