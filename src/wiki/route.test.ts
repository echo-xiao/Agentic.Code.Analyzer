import { test } from 'node:test';
import assert from 'node:assert/strict';
import { routeLeaves, type RouteInput, type Routed } from './route.js';

const PAGES: RouteInput[] = [
  { id: 'a', title: 'Auth', scope: '' },
  { id: 'b', title: 'REST index', scope: '' },
  { id: 'c', title: 'Missing', scope: '' },
];

test('合法路由原样保留；非法 l2 修复；漏页兜底', async () => {
  const classify = async (): Promise<Routed[]> => [
    { id: 'a', l1: 'Understand Internals', l2: '子系统深潜' },
    { id: 'b', l1: 'Reference', l2: '瞎写的区' },   // 非法 l2
    // c 漏掉
  ];
  const r = await routeLeaves(PAGES, classify);
  assert.deepEqual(r['a'], { l1: 'Understand Internals', l2: '子系统深潜' });
  assert.equal(r['b'].l1, 'Reference');
  assert.equal(r['b'].l2, 'API 与契约');            // 修复到该 l1 第一个区
  assert.deepEqual(r['c'], { l1: 'Understand Internals', l2: '子系统深潜' }); // 兜底
});
