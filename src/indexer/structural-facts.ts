import { GLOBAL_INDEX } from './state.js';
import { relPathOf } from './chunks.js';

export const CROSS_LAYER_EDGE_TYPES = new Set<string>([
  'event_emit', 'event_listen', 'pubsub_publish', 'pubsub_subscribe',
  'rest_call', 'rest_route', 'stream_def', 'stream_sub',
]);
const TOPK = 8;

export interface StructuralFacts {
  key_exports: string[]; upstream: string[]; downstream: string[];
  fanIn: number; fanOut: number; crossLayerEdges: string[];
}

// relFile: relative path (consistent with mapping/chunks); mappingSymbols: the symbols[] from this file's mapping.json.
export function computeFacts(relFile: string, mappingSymbols: any[]): StructuralFacts {
  const key_exports = mappingSymbols.filter(s => s.exported && s.name).map(s => s.name).slice(0, TOPK);
  // upstream = external symbols this file calls (names in calls not defined in this file); also collect crossLayer
  const upstreamSet = new Set<string>(); const crossLayer = new Set<string>();
  let fanOut = 0;
  for (const s of mappingSymbols) {
    for (const c of (s.calls ?? [])) {
      const name = typeof c === 'string' ? c : c.name;
      const edgeType = typeof c === 'string' ? 'call' : (c.edgeType ?? 'call');
      if (!name) continue;
      fanOut++;
      upstreamSet.add(name);
      if (CROSS_LAYER_EDGE_TYPES.has(edgeType)) crossLayer.add(`${edgeType}:${name}`);
    }
  }
  // downstream = who imports this file (fileDependents keys are the real paths of the depended-on files).
  // relFile is a relative path; fileDependents keys are absolute paths → compare via relPathOf.
  let downstream: string[] = [];
  for (const [target, importers] of GLOBAL_INDEX.fileDependents) {
    if (relPathOf(target) === relFile) { downstream = [...importers].map(imp => relPathOf(imp)); break; }
  }
  const fanIn = downstream.length;
  return {
    key_exports,
    upstream: [...upstreamSet].slice(0, TOPK),
    downstream: downstream.slice(0, TOPK),
    fanIn, fanOut,
    crossLayerEdges: [...crossLayer].slice(0, TOPK),
  };
}
