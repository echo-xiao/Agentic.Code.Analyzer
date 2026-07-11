#!/usr/bin/env npx tsx
/**
 * generate.ts — P3 wiki:gen (pipeline orchestrator).
 *
 * generateWiki(deps?):
 *   Runs the four pipeline steps in order:
 *     1. outline  → generateOutline() from ./outline.ts
 *     2. write    → runs write.ts as subprocess (main() not exported)
 *     3. diagram  → generateDiagrams() from ./diagram.ts
 *     4. verify   → runs verify.ts as subprocess (main() not exported)
 *   Then stamps wiki-map.json:
 *     derived_from = "self-generated <shortSha> <date>"
 *     generated_at = <ISO timestamp>
 *
 * Accepts an optional `deps` object for test injection:
 *   { outline, write, diagram, verify, wikiMapPath }
 * Each step defaults to the real step function when omitted.
 * wikiMapPath defaults to data/wiki-map.json; tests override with a tmp file.
 *
 * CLI entrypoint: import.meta.url guard calls generateWiki() with real deps.
 * Do NOT run this during a live refresh — it fires dozens of API calls.
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync, spawnSync } from 'child_process';
import { fileURLToPath, pathToFileURL } from 'url';

import { DATA_DIR } from '../config.js';
import { generateOutline } from './outline.js';
import { generateDiagrams } from './diagram.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_WIKI_MAP_PATH = path.join(DATA_DIR, 'wiki-map.json');

// ── Deps type ────────────────────────────────────────────────────────────────

export interface GenerateDeps {
  outline:     () => Promise<unknown>;
  write:       () => Promise<unknown>;
  diagram:     () => Promise<unknown> | unknown;
  verify:      () => Promise<unknown>;
  /** Override wiki-map path (used by tests to avoid touching data/). */
  wikiMapPath: string;
}

// ── Helper: run a .ts step as a child process ─────────────────────────────────

function runStep(tsFile: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const result = spawnSync(
      'npx',
      ['tsx', tsFile],
      {
        stdio: 'inherit',
        env: { ...process.env },
        cwd: path.resolve(__dirname, '../../'),
      },
    );
    if (result.status === 0) {
      resolve();
    } else {
      reject(new Error(`[wiki:gen] Step ${path.basename(tsFile)} exited with code ${result.status}`));
    }
  });
}

// ── generateWiki ──────────────────────────────────────────────────────────────

export async function generateWiki(deps?: Partial<GenerateDeps>): Promise<void> {
  const outline     = deps?.outline     ?? (() => generateOutline());
  const write       = deps?.write       ?? (() => runStep(path.join(__dirname, 'write.ts')));
  const diagram     = deps?.diagram     ?? (() => generateDiagrams());
  const verify      = deps?.verify      ?? (() => runStep(path.join(__dirname, 'verify.ts')));
  const wikiMapPath = deps?.wikiMapPath ?? DEFAULT_WIKI_MAP_PATH;

  console.log('[wiki:gen] Step 1/4 — outline');
  await outline();

  console.log('[wiki:gen] Step 2/4 — write');
  await write();

  console.log('[wiki:gen] Step 3/4 — diagram');
  await diagram();

  console.log('[wiki:gen] Step 4/4 — verify');
  await verify();

  // Stamp derived_from + generated_at
  let shortSha = 'unknown';
  try {
    shortSha = execSync('git rev-parse --short HEAD', { encoding: 'utf-8' }).trim();
  } catch {
    console.warn('[wiki:gen] Could not read git HEAD sha — using "unknown"');
  }
  const date = new Date().toISOString().slice(0, 10);
  const derivedFrom = `self-generated ${shortSha} ${date}`;

  try {
    const wikiMap = JSON.parse(fs.readFileSync(wikiMapPath, 'utf-8'));
    wikiMap.derived_from = derivedFrom;
    wikiMap.generated_at = new Date().toISOString();
    fs.writeFileSync(wikiMapPath, JSON.stringify(wikiMap, null, 2), 'utf-8');
    console.log(`[wiki:gen] Stamped derived_from="${derivedFrom}" → ${wikiMapPath}`);
  } catch (e) {
    console.warn('[wiki:gen] Could not stamp wiki-map.json (file may not exist yet):', e);
  }

  console.log('[wiki:gen] Done.');
}

// ── Entry point ───────────────────────────────────────────────────────────────

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  generateWiki().catch(err => {
    console.error('[wiki:gen] Fatal:', err);
    process.exit(1);
  });
}
