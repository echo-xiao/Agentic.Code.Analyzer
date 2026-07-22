import { test } from 'node:test';
import assert from 'node:assert/strict';
import type { WikiMap, WikiPage } from '../../src/wikimap/schema.js';

test('WikiPage: page and title are synonymous; planning fields complete', () => {
  const p: WikiPage = {
    id: 'system-architecture', title: 'System Architecture', category: 'Overview',
    scope: 'Overall layering', modules: ['room'], seedFiles: ['app/room/server/x.ts'],
    page: 'System Architecture', sections: ['Layers'], diagrams: [], source_files: {},
  };
  assert.equal(p.page, p.title);                 // backward-compat convention
  assert.ok(Array.isArray(p.modules) && Array.isArray(p.seedFiles));
});

test('WikiMap: top-level fields complete', () => {
  const m: WikiMap = { repo: 'r', generated_at: 'd', derived_from: 'self-generated x', pages: [], file_to_pages: {} };
  assert.equal(m.pages.length, 0);
  assert.deepEqual(m.file_to_pages, {});
});
