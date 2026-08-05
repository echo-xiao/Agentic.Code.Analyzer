#!/usr/bin/env npx tsx
// Standalone index prewarm entry: build/refresh the ts-morph symbol index cache
// (output.nosync/) without starting anything else.
import { ensureIndex } from './index.js';

await ensureIndex();
console.error('Index prewarm complete.');
