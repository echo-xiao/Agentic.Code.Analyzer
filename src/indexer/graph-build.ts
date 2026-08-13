// graph-build.ts — build one package's graph shard.
//
// One ts-morph Project per workspace package, from that package's own tsconfig, so the checker
// sees a real program and cross-file references resolve. Emits: the package's declarations, its
// resolved static edges, the registry slots and coverage-mode overrides observed in it, and every
// reference that could not be bound.
//
// This module owns declarations, edges and unbound references. It does NOT decide what a slot or
// an override is — that is idioms.ts and overrides.ts, and it stays there so there is exactly one
// place where "which registries exist" is written down.
//
// Slots are recorded per package but JOINED globally in dispatch.ts: a register/dispatch pair
// routinely straddles two packages, so no single shard can see both halves.
import { Project, SourceFile } from 'ts-morph';
import * as fs from 'fs';
import * as path from 'path';
import { GENERATOR_VERSION } from '../config.js';
import type { WorkspacePackage } from './workspace.js';
import { collectDefs, enclosingDefId, relFileOf, type Def } from './defs.js';
import { bindReference, referenceNodesOf, type StaticEdgeKind } from './binding.js';
import { extractSlots, type Slot, type Unbound } from './idioms.js';
import { extractOverrides, type OverrideSite } from './overrides.js';

export type EdgeKind = StaticEdgeKind | 'registers' | 'dispatches' | 'handles';

export interface Edge { from: string; to: string; kind: EdgeKind }
export type { Slot, Unbound, OverrideSite };

export interface Shard {
    package: string;
    tsconfig: string | null;
    generatorVersion: string;
    files: string[];
    defs: Def[];
    edges: Edge[];
    slots: Slot[];
    overrides: OverrideSite[];
    unbound: Unbound[];
    // Files whose processing threw. Their defs may already be pushed while their edges and slots are
    // incomplete, and nothing else in the shard tells that apart from a file that genuinely has few
    // edges -- so the failure is recorded in the artifact, not just on stderr.
    failedFiles: string[];
    stats: { bound: number; external: number; unbound: number };
}

const TEST_MARKERS = ['.test.', '.spec.', '/tests/', '/test/', '/__tests__/', '.mocks.'];
const isTestFile = (rel: string): boolean => {
    const s = rel.toLowerCase();
    return TEST_MARKERS.some(m => s.includes(m));
};

function processFile(
    sf: SourceFile, repoRoot: string, keyspaceScope: string,
    out: { defs: Def[]; edges: Edge[]; slots: Slot[]; unbound: Unbound[]; stats: Shard['stats'] },
): void {
    const { defs, ranges } = collectDefs(sf, repoRoot);
    out.defs.push(...defs);

    const seenEdge = new Set<string>();
    for (const { node, edgeKind } of referenceNodesOf(sf)) {
        const from = enclosingDefId(node.getStart(), ranges);
        if (from === null) continue;
        const bind = bindReference(node, repoRoot);
        if (bind.kind === 'def') {
            out.stats.bound++;
            const key = `${from} -> ${bind.defId} :${edgeKind}`;
            if (!seenEdge.has(key)) {
                seenEdge.add(key);
                out.edges.push({ from, to: bind.defId, kind: edgeKind });
            }
        } else if (bind.kind === 'external') {
            out.stats.external++;
        } else {
            out.stats.unbound++;
            out.unbound.push({ at: from, text: node.getText().slice(0, 120), reason: bind.reason });
        }
    }

    const { slots, unbound } = extractSlots(sf, { repoRoot, keyspaceScope });
    out.slots.push(...slots);
    out.unbound.push(...unbound);
    out.stats.unbound += unbound.length;
}

// Workspace packages are source-only: none of them is built, and each package.json points `main`
// at a `dist/` that does not exist. Node resolution therefore fails for every `@scope/pkg` import,
// and the checker reports "no declarations". Measured on one 28-file workspace package: 0
// cross-package bindings, 28.8% of references unbound.
//
// Mapping each workspace package name to its `src` fixes it, and is also more precise than building
// the packages would be: a built package resolves to `dist/index.d.ts`, whose declarations live in a
// file the shard never collects defs for — every cross-package edge would dangle. Pointing at `src`
// binds to the real declaration. Same measurement with paths injected: 347 cross-package bindings,
// 0 of them in dist/.d.ts, unbound down to 0.3%.
//
// Derived from each package.json's `name` — no package name is hardcoded.
export function workspacePaths(packages: WorkspacePackage[]): Record<string, string[]> {
    const paths: Record<string, string[]> = {};
    for (const p of packages) {
        if (!p.name) continue;
        const src = path.join(p.dir, 'src');
        if (!fs.existsSync(src)) continue;
        paths[p.name] = [path.join(src, 'index.ts'), path.join(src, 'index.tsx')];
        paths[`${p.name}/*`] = [path.join(src, '*')];
    }
    return paths;
}

// `packages` is REQUIRED, deliberately not defaulted. Defaulting it to `[pkg]` would let a caller
// that forgets the argument silently lose all cross-package resolution: measured on one package,
// omitting it drops edges 689 -> 359, cross-package edges 330 -> 0, and raises unbound 110 -> 449,
// with no error anywhere.
export function buildShard(pkg: WorkspacePackage, repoRoot: string, packages: WorkspacePackage[]): Shard {
    const paths = workspacePaths(packages);
    const project = pkg.tsconfig
        ? new Project({ tsConfigFilePath: pkg.tsconfig, compilerOptions: { baseUrl: repoRoot, paths } })
        : new Project({ skipAddingFilesFromTsConfig: true, compilerOptions: { allowJs: true, baseUrl: repoRoot, paths } });
    if (!pkg.tsconfig) project.addSourceFilesAtPaths(`${pkg.dir}/**/*.{ts,tsx,js}`);

    // Scan range is part of a count's meaning: the same registry yields 141 / 136 / 78 keys
    // depending on it, and all three are correct. Stamping it on every slot keeps a range
    // difference from reading as an idiom regression.
    const keyspaceScope = `${pkg.id}@extractor-v${GENERATOR_VERSION}`;

    const out = {
        defs: [] as Def[], edges: [] as Edge[], slots: [] as Slot[], unbound: [] as Unbound[],
        stats: { bound: 0, external: 0, unbound: 0 },
    };
    const files: string[] = [];
    const failedFiles: string[] = [];
    const ownFiles: SourceFile[] = [];

    // Only this package's own files. With workspace paths injected the Program also contains every
    // imported package's sources (measured: 853 files loaded for a 28-file package), and without
    // this filter each shard would re-emit every other package's defs.
    const prefix = pkg.dir.endsWith(path.sep) ? pkg.dir : pkg.dir + path.sep;
    for (const sf of project.getSourceFiles()) {
        const abs = sf.getFilePath();
        if (!abs.startsWith(prefix)) continue;
        if (abs.includes('/node_modules/') || abs.endsWith('.d.ts')) continue;
        // Everything that can throw for this file sits INSIDE the guard, relFileOf included: it
        // realpaths both sides and can fail on a file deleted or made unreadable mid-run. Left
        // outside, such a throw aborts the whole package instead of costing one file.
        let rel: string = abs;
        try {
            rel = relFileOf(abs, repoRoot);
            if (isTestFile(rel)) continue;
            files.push(rel);
            ownFiles.push(sf);
            processFile(sf, repoRoot, keyspaceScope, out);
        } catch (e) {
            failedFiles.push(rel);
            console.error(`[graph-build] ${rel}: ${(e as Error).message}`);
        }
    }

    // Coverage mode reads the whole package at once, and even that is not enough: a key's CE and
    // EE halves sit in different packages, so the shard carries raw registration SITES and the
    // pairing happens in the global reduce.
    let overrides: OverrideSite[] = [];
    try {
        overrides = extractOverrides(ownFiles, { repoRoot, keyspaceScope });
    } catch (e) {
        console.error(`[graph-build] ${pkg.id} overrides: ${(e as Error).message}`);
    }

    return {
        package: pkg.id, tsconfig: pkg.tsconfig, generatorVersion: GENERATOR_VERSION,
        files, failedFiles, overrides, ...out,
    };
}
