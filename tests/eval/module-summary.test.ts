import { test } from 'node:test';
import assert from 'node:assert/strict';
import { assembleModuleInput, buildModulePrompt } from '../../src/eval/module-summary.js';

test('assembleModuleInput: 文件摘要按 fanIn 排序 + 带边界边', () => {
  const mod = { id: 'livechat', subsystem: 'livechat', files: ['a.ts','b.ts'], edges: [['livechat','messaging',5]] };
  const fs = { 'a.ts': { role: 'queue', fanIn: 2, key_exports: ['QueueManager'], upstream:[], downstream:[] }, 'b.ts': { role: 'route', fanIn: 9, key_exports: ['RoutingManager'], upstream:[], downstream:[] } };
  const inp = assembleModuleInput(mod as any, fs as any, { file_to_module: {} } as any);
  assert.equal(inp.moduleId, 'livechat');
  assert.equal(inp.fileSummaries[0].file, 'b.ts');   // fanIn 高的在前
  assert.deepEqual(inp.boundaryEdges, [['livechat','messaging',5]]);
});

test('assembleModuleInput: rel 路径 downstream 正确产生 internalEdges', () => {
  // 验证 structural-facts 归一 rel 路径后 memberSet 交集能命中
  const mod = { id: 'x', subsystem: 'x', files: ['x/a.ts', 'x/b.ts'], edges: [] };
  const fs2 = {
    'x/a.ts': { role: '', fanIn: 1, key_exports: [], downstream: ['x/b.ts'] },
    'x/b.ts': { role: '', fanIn: 0, key_exports: [], downstream: [] },
  };
  const inp = assembleModuleInput(mod as any, fs2 as any, {});
  assert.ok(inp.internalEdges.length > 0, '内部边应 > 0，rel 路径交集未命中则为空');
  assert.ok(inp.internalEdges.includes('x/b.ts → x/a.ts'), `期望边 'x/b.ts → x/a.ts'，实际: ${JSON.stringify(inp.internalEdges)}`);
});

test('buildModulePrompt: 强制"不要逐个列文件"', () => {
  const p = buildModulePrompt({ moduleId:'x', subsystem:'x', fileSummaries:[], internalEdges:[], boundaryEdges:[] });
  assert.ok(/不要逐个列文件|do not list/i.test(p));
});
