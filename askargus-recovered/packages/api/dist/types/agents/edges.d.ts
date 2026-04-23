import type { GraphEdge } from 'askargus-data-provider';
/**
 * Creates a stable key for edge deduplication.
 * Handles both single and array-based from/to values.
 */
export declare function getEdgeKey(edge: GraphEdge): string;
/**
 * Extracts all agent IDs referenced in an edge (both from and to).
 */
export declare function getEdgeParticipants(edge: GraphEdge): string[];
/**
 * Filters out edges that reference non-existent (orphaned) agents.
 * Only filters based on the 'to' field since those are the handoff targets.
 */
export declare function filterOrphanedEdges(edges: GraphEdge[], skippedAgentIds: Set<string>): GraphEdge[];
/** Collects all unique agent IDs referenced across an array of edges. */
export declare function collectEdgeAgentIds(edges: GraphEdge[] | undefined): Set<string>;
/**
 * Result of discovering and aggregating edges from connected agents.
 */
export interface EdgeDiscoveryResult {
    /** Deduplicated edges from all discovered agents */
    edges: GraphEdge[];
    /** Agent IDs that were not found (orphaned references) */
    skippedAgentIds: Set<string>;
}
/**
 * Collects and deduplicates edges, tracking new agents to process.
 * Used for BFS discovery of connected agents.
 */
export declare function createEdgeCollector(checkAgentInit: (agentId: string) => boolean, skippedAgentIds: Set<string>): {
    edgeMap: Map<string, GraphEdge>;
    agentsToProcess: Set<string>;
    collectEdges: (edgeList: GraphEdge[] | undefined) => void;
};
//# sourceMappingURL=edges.d.ts.map