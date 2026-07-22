import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseMermaid, renderFlowchart, renderSequence } from '../../src/wikimap/mermaid.js';

test('renderFlowchart -> parseMermaid round-trip preserves nodes and edges', () => {
  const nodes = { room: 'Room Service', msg: 'Message Service' };
  const mm = renderFlowchart(nodes, [['room', 'msg', 'sends']]);
  const d = parseMermaid(mm);
  assert.equal(d.nodes['room'], 'Room Service');
  assert.ok(d.edges.some(e => e[0] === 'room' && e[1] === 'msg' && e[2] === 'sends'));
});

test('renderFlowchart supports subgraph', () => {
  const mm = renderFlowchart({ a: 'A', b: 'B' }, [['a', 'b']], { 'Core': ['a', 'b'] });
  assert.match(mm, /subgraph Core/);
  const d = parseMermaid(mm);
  assert.ok(d.subgraphs.includes('Core'));
});

test('renderSequence emits sequenceDiagram + steps', () => {
  const mm = renderSequence('login', [['client', 'auth', 'POST /login']]);
  assert.match(mm, /sequenceDiagram/);
  assert.match(mm, /client->>auth: POST \/login/);
});

test('renderFlowchart edge label with | and " does not break round-trip', () => {
  const mm = renderFlowchart({ a: 'A', b: 'B' }, [['a', 'b', 'reads|writes "x"']]);
  const d = parseMermaid(mm);
  assert.ok(d.edges.some(e => e[0] === 'a' && e[1] === 'b'), 'edge a->b should still parse');
});
