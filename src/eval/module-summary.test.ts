import { test } from 'node:test';
import assert from 'node:assert/strict';
import { assembleModuleInput, buildModulePrompt } from './module-summary.js';

test('assembleModuleInput: 文件摘要按 fanIn 排序 + 带边界边', () => {
  const mod = { id: 'livechat', subsystem: 'livechat', files: ['a.ts','b.ts'], edges: [['livechat','messaging',5]] };
  const fs = { 'a.ts': { role: 'queue', fanIn: 2, key_exports: ['QueueManager'], upstream:[], downstream:[] }, 'b.ts': { role: 'route', fanIn: 9, key_exports: ['RoutingManager'], upstream:[], downstream:[] } };
  const inp = assembleModuleInput(mod as any, fs as any, { file_to_module: {} } as any);
  assert.equal(inp.moduleId, 'livechat');
  assert.equal(inp.fileSummaries[0].file, 'b.ts');   // fanIn 高的在前
  assert.deepEqual(inp.boundaryEdges, [['livechat','messaging',5]]);
});

test('buildModulePrompt: 强制"不要逐个列文件"', () => {
  const p = buildModulePrompt({ moduleId:'x', subsystem:'x', fileSummaries:[], internalEdges:[], boundaryEdges:[] });
  assert.ok(/不要逐个列文件|do not list/i.test(p));
});
