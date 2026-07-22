import { test } from 'node:test';
import assert from 'node:assert/strict';
import { routeLeaves, type RouteInput, type Routed } from '../../src/wiki/route.js';

const PAGES: RouteInput[] = [
  { id: 'a', title: 'Auth', scope: '' },
  { id: 'b', title: 'REST index', scope: '' },
  { id: 'c', title: 'Missing', scope: '' },
];

test('valid routing kept as-is; invalid l2 repaired; missing page falls back', async () => {
  const classify = async (): Promise<Routed[]> => [
    { id: 'a', l1: 'Understand Internals', l2: 'Subsystem Deep-Dives' },
    { id: 'b', l1: 'Reference', l2: 'Made-up Area' },   // invalid l2
    // c omitted
  ];
  const r = await routeLeaves(PAGES, classify);
  assert.deepEqual(r['a'], { l1: 'Understand Internals', l2: 'Subsystem Deep-Dives' });
  assert.equal(r['b'].l1, 'Reference');
  assert.equal(r['b'].l2, 'API & Contracts');       // repaired to the first area of that l1
  assert.deepEqual(r['c'], { l1: 'Understand Internals', l2: 'Subsystem Deep-Dives' }); // fallback
});
