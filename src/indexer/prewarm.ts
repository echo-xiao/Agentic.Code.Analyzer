#!/usr/bin/env npx tsx
// Standalone graph build: one shard per workspace package plus the reduced dispatch artifact.
//
// There is nothing to "warm" any more. The old entry refreshed a per-file cache that the pipeline
// then re-read; the shards are the index, so this simply builds them.
import { buildGraph } from './build-graph.js';

const summary = buildGraph({ progress: true });
const refs = summary.stats.bound + summary.stats.external + summary.stats.unbound;
const pct = (n: number) => `${((100 * n) / Math.max(1, refs)).toFixed(1)}%`;

console.error(`packages=${summary.packages} files=${summary.files} defs=${summary.defs}`);
console.error(`edges=${summary.edges} cross-package=${summary.crossPackageEdges} dispatch-nodes=${summary.dispatchNodes} overrides=${summary.overrides}`);
console.error(`refs=${refs} bound=${pct(summary.stats.bound)} external=${pct(summary.stats.external)} unbound=${pct(summary.stats.unbound)}`);
console.error(`trunks: ${Object.entries(summary.trunkKeyCounts).map(([k, v]) => `${k} ${v}`).join(' · ')}`);

// The non-zero self-check is a build gate, not a metric: an idiom that matches nothing is
// indistinguishable from one that works, and this is where that becomes visible.
if (summary.budget?.status === 'failed') {
    for (const f of summary.budget.failures) console.error(`  ! ${f}`);
    process.exit(1);
}
