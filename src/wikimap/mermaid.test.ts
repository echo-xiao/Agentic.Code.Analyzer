import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseMermaid, renderFlowchart, renderSequence } from './mermaid.js';

test('renderFlowchart → parseMermaid round-trip 保节点与边', () => {
  const nodes = { room: 'Room Service', msg: 'Message Service' };
  const mm = renderFlowchart(nodes, [['room', 'msg', 'sends']]);
  const d = parseMermaid(mm);
  assert.equal(d.nodes['room'], 'Room Service');
  assert.ok(d.edges.some(e => e[0] === 'room' && e[1] === 'msg'));
});

test('renderFlowchart 支持 subgraph', () => {
  const mm = renderFlowchart({ a: 'A', b: 'B' }, [['a', 'b']], { 'Core': ['a', 'b'] });
  assert.match(mm, /subgraph Core/);
  const d = parseMermaid(mm);
  assert.ok(d.subgraphs.includes('Core'));
});

test('renderSequence 出 sequenceDiagram + 步骤', () => {
  const mm = renderSequence('login', [['client', 'auth', 'POST /login']]);
  assert.match(mm, /sequenceDiagram/);
  assert.match(mm, /client->>auth: POST \/login/);
});
