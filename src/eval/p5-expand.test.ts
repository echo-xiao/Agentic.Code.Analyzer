// src/eval/p5-expand.test.ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ground, expandOne } from './p5-expand.js';

test('ground: 只留真实存在的符号/模块(红线)', () => {
  const g = ground(
    { expandedSymbols: ['addRoute', 'FAKE_SYM'], candidateModules: ['ldap', 'no_mod'] },
    new Set(['addRoute', 'other']), new Set(['ldap', 'ui']),
  );
  assert.deepEqual(g.expandedSymbols, ['addRoute']);
  assert.deepEqual(g.candidateModules, ['ldap']);
});

test('expandOne: 调 llm 后接地', async () => {
  const llm = async () => ({ expandedSymbols: ['addRoute', 'ghost'], candidateModules: ['ldap', 'ghostmod'] });
  const g = await expandOne('slash commands', llm, new Set(['addRoute']), new Set(['ldap']));
  assert.deepEqual(g, { expandedSymbols: ['addRoute'], candidateModules: ['ldap'] });
});
