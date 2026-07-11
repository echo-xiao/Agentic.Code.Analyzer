#!/usr/bin/env npx tsx
/**
 * summarize-ab — P2 Task 8: AB diagnostic comparing Haiku vs Sonnet summaries for leaf model quality.
 *
 * Calls summarizeOne(rel, model) for 6 real Rocket.Chat files with both models,
 * prints role + characteristics side-by-side for manual inspection.
 * No API cost on bare import (guard prevents main() running unless invoked directly).
 */
import './utils/load-env.js';
import { pathToFileURL } from 'url';
import { summarizeOne } from './summarize.js';

const SAMPLES = [
  'apps/meteor/app/2fa/server/code/EmailCheck.ts',
  'apps/meteor/app/lib/server/functions/sendMessage.ts',
  'apps/meteor/client/views/room/composer/ComposerBoxPopupEmoji.tsx',
  'apps/meteor/app/livechat/server/lib/QueueManager.ts',
  'packages/core-typings/src/IMessage.ts',
  'apps/meteor/app/api/server/v1/channels.ts',
];

async function main() {
  for (const rel of SAMPLES) {
    try {
      const h = await summarizeOne(rel, 'claude-haiku-4-5-20251001');
      const s = await summarizeOne(rel, 'claude-sonnet-4-6');
      console.log(`\n=== ${rel} ===`);
      console.log('Haiku  role:', h.role);
      console.log('       char:', h.characteristics.join(', '));
      console.log('Sonnet role:', s.role);
      console.log('       char:', s.characteristics.join(', '));
    } catch (e: any) {
      console.log(`\n=== ${rel} === SKIP: ${e?.message?.slice(0, 80)}`);
    }
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) main();
