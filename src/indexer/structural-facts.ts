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

// relFile: 相对路径(与 mapping/chunks 一致);mappingSymbols: 该文件 mapping.json 的 symbols[]。
export function computeFacts(relFile: string, mappingSymbols: any[]): StructuralFacts {
  const key_exports = mappingSymbols.filter(s => s.exported && s.name).map(s => s.name).slice(0, TOPK);
  // 上游 = 本文件调用的外部符号(calls 里非本文件定义的名字);顺带 crossLayer
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
  // 下游 = 谁 import 本文件(fileDependents 的 key 是被依赖文件的真实路径)。
  // relFile 是相对路径;fileDependents key 是绝对路径 → 用 relPathOf 比对。
  let downstream: string[] = [];
  for (const [target, importers] of GLOBAL_INDEX.fileDependents) {
    if (relPathOf(target) === relFile) { downstream = [...importers]; break; }
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
