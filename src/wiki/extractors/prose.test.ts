import { test } from 'node:test';
import assert from 'node:assert/strict';
import { collectFacts, groundText, addProse } from './prose.js';
import type { MetaChapter } from './types.js';

const CHAPTER: MetaChapter = {
  page: {
    id: 'monorepo-structure', title: 'Monorepo Structure', category: 'System Architecture',
    scope: '72 packages · 218 edges', modules: [], seedFiles: [],
    page: 'Monorepo Structure', sections: [], diagrams: [],
    source_files: { 'package.json': [], 'turbo.json': [] },
  },
  prose: [
    { section: 'Workspace Config', text: 'Root `package.json` defines workspaces. Sources: package.json:L1-L10' },
    { section: 'Build Orchestration', text: 'Turbo drives builds. Sources: turbo.json:L1' },
  ],
};
const ALL_FILES = new Set(['package.json', 'turbo.json']);

test('collectFacts pulls source_files keys, cited paths, and fact text', () => {
  const f = collectFacts(CHAPTER);
  assert.ok(f.allowedPaths.has('package.json'));
  assert.ok(f.allowedPaths.has('turbo.json'));
  assert.match(f.factText, /72 packages/);
});

test('groundText keeps sentences citing only real paths and numbers', () => {
  const f = collectFacts(CHAPTER);
  const g = groundText('The repo has 72 packages. Turbo orchestrates builds.', f, ALL_FILES);
  assert.equal(g.dropped.length, 0);
  assert.match(g.clean, /72 packages/);
});

test('groundText drops a sentence citing a path not in the facts', () => {
  const f = collectFacts(CHAPTER);
  const g = groundText('Turbo drives builds. A hidden file lives at fake/ghost.ts here.', f, ALL_FILES);
  assert.equal(g.dropped.length, 1);
  assert.doesNotMatch(g.clean, /ghost\.ts/);
  assert.match(g.clean, /Turbo drives builds/);
});

test('groundText drops a sentence with a hallucinated number', () => {
  const f = collectFacts(CHAPTER);
  const g = groundText('There are 999 secret packages.', f, ALL_FILES);
  assert.equal(g.dropped.length, 1);
  assert.equal(g.clean, '');
});

test('addProse adds summary + per-section narrative from a fake model and strips drift', async () => {
  const fakeModel = async (_s: string, _u: string) => JSON.stringify({
    summary: 'This page maps 72 packages and 218 edges.',
    narratives: {
      'Workspace Config': 'The root package.json declares all workspaces.',
      'Build Orchestration': 'Turbo orchestrates builds. It also reads fake/ghost.ts for config.',
    },
  });
  const out = await addProse(CHAPTER, { generate: fakeModel, allFiles: ALL_FILES });

  // summary grounded + non-empty
  assert.match(out.page.summary ?? '', /72 packages/);
  // clean narrative kept
  const wc = out.prose.find(s => s.section === 'Workspace Config')!;
  assert.match(wc.narrative ?? '', /workspaces/);
  // drift sentence stripped, but the clean sentence survives (still non-empty)
  const bo = out.prose.find(s => s.section === 'Build Orchestration')!;
  assert.ok(bo.narrative && bo.narrative.length > 0);
  assert.doesNotMatch(bo.narrative, /ghost\.ts/);
  // structural fields untouched
  assert.equal(out.prose.length, 2);
  assert.match(wc.text, /workspaces/);
});

test('addProse degrades to structural-only when the model returns non-JSON', async () => {
  const junkModel = async () => 'I could not produce JSON, sorry.';
  const out = await addProse(CHAPTER, { generate: junkModel, allFiles: ALL_FILES });
  assert.equal(out.page.summary, undefined);
  assert.equal(out.prose.every(s => s.narrative === undefined), true);
  assert.equal(out.prose.length, 2);   // structure intact
});
