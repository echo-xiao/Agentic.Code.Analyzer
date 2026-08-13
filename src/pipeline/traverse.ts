// traverse.ts — graph traversal primitives, keyed by definition.
//
// Replaces the name-keyed versions in skeleton.ts. Every heuristic those needed existed to
// compensate for one thing: a bare name carried every same-named symbol's edges. With an edge that
// already knows both of its ends, they all go:
//
//   fanIn                counted every same-named symbol's callers. canAccessRoomAsync has a
//                        single definition and fanIn 43, and was cut as a hot leaf 18 times.
//   downstream file      filtered callees to those whose call site shared the node's file,
//     filter             because a name inherited 165 out-edges when only 19 were its own.
//   upstream import      required the caller's file to import a defining file. Measured: it
//     evidence           dropped 77.3% of static upstream edges, 36,265 of them because the
//                        definition lived in another package and the import was never recorded.
//   boundary early-stop  cut any edge leaving the anchor's top-level path — 40.5% of unambiguous
//                        edges — while every real Rocket.Chat flow crosses packages.
import { GLOBAL_INDEX } from '../indexer/state.js';
import type { EdgeType } from '../indexer/state.js';
import type { SiblingRef } from '../indexer/dispatch.js';

export type Direction = 'down' | 'up';

export interface DefCandidate {
    defId: string;
    edgeType: EdgeType;
    direction: Direction;
}

const TEST_MARKERS = ['.test.', '.spec.', '/tests/', '/test/', '/__tests__/', '.mocks.'];

export const isDispatchNode = (defId: string): boolean => defId.startsWith('#dispatch/');

// A dispatch node has no file, and its members were already filtered when their own shard was
// built, so it is never a test path.
export function isTestDef(defId: string): boolean {
    if (isDispatchNode(defId)) return false;
    const file = GLOBAL_INDEX.defs.get(defId)?.file ?? defId.split('#')[0];
    const s = file.toLowerCase();
    return TEST_MARKERS.some(m => s.includes(m));
}

export function fanIn(defId: string): number {
    return GLOBAL_INDEX.in.get(defId)?.length ?? 0;
}

function candidates(defId: string, direction: Direction): DefCandidate[] {
    const edges = (direction === 'down' ? GLOBAL_INDEX.out : GLOBAL_INDEX.in).get(defId) ?? [];
    const out: DefCandidate[] = [];
    const seen = new Set<string>();
    for (const e of edges) {
        const other = direction === 'down' ? e.to : e.from;
        if (other === defId || seen.has(other)) continue;
        if (isTestDef(other)) continue;
        seen.add(other);
        out.push({ defId: other, edgeType: e.kind as EdgeType, direction });
    }
    return out;
}

export const downstreamOf = (defId: string): DefCandidate[] => candidates(defId, 'down');
export const upstreamOf = (defId: string): DefCandidate[] => candidates(defId, 'up');

// Everything wired to one dispatch key, with the role each side plays. This is the group a reader
// needs when a chain arrives at a key: the callers and the handlers share no import and no symbol,
// so the key is the only place they are visible together.
export function siblingsOf(defId: string): SiblingRef[] {
    return GLOBAL_INDEX.dispatch.get(defId) ?? [];
}
