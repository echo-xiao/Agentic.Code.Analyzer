// dispatch.ts — the global reduce: slots and override sites from every shard become dispatch
// nodes, edges and sibling groups.
//
// Nothing is derived here. Two idioms that share a `space` are the two sides of one registry by
// construction, so a key needs no threshold and no scoring to find its other half. The earlier
// attempt at deriving pairs from key-space overlap is recorded as rejected in the spec: its top
// "dispatch keys" were GET, POST and the empty string, and no threshold separated them.
//
// This runs globally rather than per shard because both halves of a key routinely live in
// different packages — a hook registered in apps/meteor and run from packages/core-services, a
// model registered under CE in one package and re-registered under EE in another.
import { GENERATOR_VERSION } from '../config.js';
import type { Edge, EdgeKind } from './graph-build.js';
import type { Role, Slot, Space } from './idioms.js';
import { pairOverrides, multiImplementationKeys, type Override, type OverrideSite } from './overrides.js';

export interface SiblingRef {
    defId: string;
    space: Space;
    role: Role;
    key: string;
    handler?: string;
    scope?: 'out';
}

export interface DispatchArtifact {
    generatorVersion: string;
    edges: Edge[];
    siblings: Record<string, SiblingRef[]>;
    overrides: Override[];
    multiImplementation: Array<{ key: string; implementations: string[] }>;
    // Per in-scope trunk, how many distinct keys it produced. Feeds the non-zero self-check.
    trunkKeyCounts: Record<string, number>;
    // Keys with registrations but no dispatch, or the reverse. Not an error: a registered hook
    // nobody runs is a real coverage gap and is more useful visible than swallowed.
    oneSidedKeys: string[];
}

const OUT_OF_SCOPE_SPACES: ReadonlySet<string> = new Set(['slash-commands']);

// A key is a node in its own right. It is not a definition and has no body — it exists so that a
// caller and a handler that never reference each other still have one thing in common on the graph.
export function dispatchNodeId(space: string, key: string): string {
    return `#dispatch/${space}/${key}`;
}

export function buildDispatch(slots: Slot[], overrideSites: OverrideSite[]): DispatchArtifact {
    const siblings: Record<string, SiblingRef[]> = {};
    const edges: Edge[] = [];
    const seenEdge = new Set<string>();

    const addEdge = (from: string, to: string, kind: EdgeKind): void => {
        const k = `${from} -> ${to} :${kind}`;
        if (seenEdge.has(k)) return;
        seenEdge.add(k);
        edges.push({ from, to, kind });
    };

    for (const slot of slots) {
        const node = dispatchNodeId(slot.space, slot.key);
        (siblings[node] ??= []).push({
            defId: slot.at, space: slot.space, role: slot.role, key: slot.key,
            ...(slot.handler ? { handler: slot.handler } : {}),
            ...(slot.scope ? { scope: slot.scope } : {}),
        });

        addEdge(slot.at, node, slot.role === 'register' ? 'registers' : 'dispatches');
        // The handler hangs off the key, not off the registering statement: a chain that arrives at
        // the key needs somewhere to go next, and the registering module is usually a bare import.
        if (slot.role === 'register' && slot.handler && slot.handler !== slot.at) {
            addEdge(node, slot.handler, 'handles');
        }
    }

    const trunkKeyCounts: Record<string, number> = {};
    const oneSidedKeys: string[] = [];
    for (const [node, refs] of Object.entries(siblings)) {
        const space = refs[0].space;
        if (!OUT_OF_SCOPE_SPACES.has(space)) {
            trunkKeyCounts[space] = (trunkKeyCounts[space] ?? 0) + 1;
        }
        const roles = new Set(refs.map(r => r.role));
        if (roles.size < 2) oneSidedKeys.push(node);
    }

    const overrides = pairOverrides(overrideSites);

    return {
        generatorVersion: GENERATOR_VERSION,
        edges,
        siblings,
        overrides,
        multiImplementation: multiImplementationKeys(overrides),
        trunkKeyCounts,
        oneSidedKeys: oneSidedKeys.sort(),
    };
}
