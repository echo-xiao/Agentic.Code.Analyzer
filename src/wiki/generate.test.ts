/**
 * generate.test.ts — unit tests for generateWiki().
 *
 * Strategy: inject no-op spies for all four steps (outline/write/diagram/verify)
 * and override wikiMapPath with a tmp file — no real data/ is read or written,
 * no real API calls are made.
 *
 * Asserts:
 *   (a) Steps run in the correct order: outline → write → diagram → verify
 *   (b) wiki-map.json derived_from starts with "self-generated "
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';

import { generateWiki } from './generate.js';

/** Create a minimal wiki-map.json in a fresh tmp dir; return its path. */
function makeTmpWikiMap(): { tmpDir: string; wikiMapPath: string } {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'wiki-gen-test-'));
  const wikiMapPath = path.join(tmpDir, 'wiki-map.json');
  fs.writeFileSync(wikiMapPath, JSON.stringify({
    repo: 'test',
    generated_at: '',
    derived_from: '',
    pages: [],
    file_to_pages: {},
  }), 'utf-8');
  return { tmpDir, wikiMapPath };
}

test('generateWiki — steps run in correct order (outline→write→diagram→verify)', async () => {
  const callOrder: string[] = [];

  const { tmpDir, wikiMapPath } = makeTmpWikiMap();

  try {
    await generateWiki({
      outline:     async () => { callOrder.push('outline'); },
      write:       async () => { callOrder.push('write'); },
      diagram:     async () => { callOrder.push('diagram'); },
      verify:      async () => { callOrder.push('verify'); },
      wikiMapPath,
    });
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }

  // (a) Correct order
  assert.deepEqual(
    callOrder,
    ['outline', 'write', 'diagram', 'verify'],
    `Expected steps in order outline→write→diagram→verify, got: ${JSON.stringify(callOrder)}`,
  );
});

test('generateWiki — derived_from starts with "self-generated "', async () => {
  const { tmpDir, wikiMapPath } = makeTmpWikiMap();

  try {
    await generateWiki({
      outline:     async () => {},
      write:       async () => {},
      diagram:     async () => {},
      verify:      async () => {},
      wikiMapPath,
    });
  } finally {
    // Read before cleanup
    const written = JSON.parse(fs.readFileSync(wikiMapPath, 'utf-8'));

    fs.rmSync(tmpDir, { recursive: true, force: true });

    // (b) derived_from must start with "self-generated "
    assert.ok(
      typeof written.derived_from === 'string' && written.derived_from.startsWith('self-generated '),
      `derived_from should start with "self-generated " but got: "${written.derived_from}"`,
    );
  }
});
