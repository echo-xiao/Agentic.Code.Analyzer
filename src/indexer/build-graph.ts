// build-graph.ts — build every package's shard, reduce them, write the artifacts, load the index.
//
// One pass, no incremental logic yet: the target repo is an external, rarely-moving checkout and a
// full build is minutes. Incremental invalidation walks the package dependency graph
// (workspace.dirtyClosure) and belongs with the prune rework, not here.
import * as fs from 'fs';
import cliProgress from 'cli-progress';
import { GRAPH_DIR, TARGET_SRC_DIR } from '../config.js';
import { assertDepsInstalled, discoverWorkspace } from './workspace.js';
import { buildShard, type Shard } from './graph-build.js';
import { buildDispatch } from './dispatch.js';
import { writeShard, writeDispatch, loadGlobalIndex } from './graph-store.js';
import { selfCheckIdioms } from './idioms.js';
import { checkAgainstBudget } from './dispatch-budget.js';

export interface BuildOptions {
    repoRoot?: string;
    graphDir?: string;
    budgetFile?: string | null;      // null skips the guard, for fixtures
    progress?: boolean;
}

export interface BuildSummary {
    packages: number;
    files: number;
    defs: number;
    edges: number;
    crossPackageEdges: number;
    dispatchNodes: number;
    overrides: number;
    stats: { bound: number; external: number; unbound: number; droppedEdges: number };
    trunkKeyCounts: Record<string, number>;
    budget: { status: string; failures: string[] } | null;
}

export function buildGraph(opts: BuildOptions = {}): BuildSummary {
    const repoRoot = opts.repoRoot ?? TARGET_SRC_DIR;
    const graphDir = opts.graphDir ?? GRAPH_DIR;
    const budgetFile = opts.budgetFile === undefined ? 'dispatch-budget.json' : opts.budgetFile;

    // Without an install the checker resolves nothing and the index comes out empty but perfectly
    // well-formed — indistinguishable from a healthy one downstream. Fail here instead.
    assertDepsInstalled(repoRoot);

    const packages = discoverWorkspace(repoRoot);
    const buildable = packages.filter(p => p.tsconfig);

    // A stale shard from a package that no longer exists would be read back as live. Rebuilding
    // the directory is cheaper and safer than reconciling it.
    fs.rmSync(graphDir, { recursive: true, force: true });
    fs.mkdirSync(graphDir, { recursive: true });

    const bar = opts.progress
        ? new cliProgress.SingleBar({ format: '  [{bar}] {value}/{total} packages | {pkg}', clearOnComplete: true, stream: process.stderr }, cliProgress.Presets.shades_classic)
        : null;
    bar?.start(buildable.length, 0, { pkg: '' });

    const shards: Shard[] = [];
    for (const pkg of buildable) {
        bar?.increment({ pkg: pkg.id });
        const shard = buildShard(pkg, repoRoot, packages);
        writeShard(shard, graphDir);
        shards.push(shard);
    }
    bar?.stop();

    // Both halves of a key routinely sit in different packages, so pairing is global by necessity.
    const art = buildDispatch(shards.flatMap(s => s.slots), shards.flatMap(s => s.overrides));
    writeDispatch(art, graphDir);
    loadGlobalIndex(shards, art);

    const rows = selfCheckIdioms(shards.flatMap(s => s.slots), { throwOnZero: false });
    const budget = budgetFile
        ? checkAgainstBudget(rows, `repo@extractor-v${art.generatorVersion}`, budgetFile)
        : null;

    const crossPackageEdges = shards.reduce((n, s) =>
        n + s.edges.filter(e => !e.to.startsWith(s.package + '/')).length, 0);

    return {
        packages: shards.length,
        files: shards.reduce((n, s) => n + s.files.length, 0),
        defs: shards.reduce((n, s) => n + s.defs.length, 0),
        edges: shards.reduce((n, s) => n + s.edges.length, 0) + art.edges.length,
        crossPackageEdges,
        dispatchNodes: Object.keys(art.siblings).length,
        overrides: art.overrides.length,
        stats: {
            bound: shards.reduce((n, s) => n + s.stats.bound, 0),
            external: shards.reduce((n, s) => n + s.stats.external, 0),
            unbound: shards.reduce((n, s) => n + s.stats.unbound, 0),
            droppedEdges: 0,
        },
        trunkKeyCounts: art.trunkKeyCounts,
        budget: budget ? { status: budget.status, failures: budget.failures } : null,
    };
}
