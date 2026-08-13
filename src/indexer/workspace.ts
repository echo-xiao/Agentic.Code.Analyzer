// workspace.ts — workspace package identity.
//
// Everything downstream is scoped by package: a Program is built per package, a graph shard is
// written per package, and incremental invalidation walks the package dependency graph. Package
// names, directories and dependencies are all read from package.json files — no repo-specific
// names appear in this file.
import * as fs from 'fs';
import * as path from 'path';
import { globSync } from 'glob';

export interface WorkspacePackage {
    id: string;                 // repo-relative dir, e.g. 'apps/meteor' — also the shard id
    dir: string;                // absolute
    name: string | null;        // package.json "name", null when unnamed
    tsconfig: string | null;    // absolute path, null when the package has none
    deps: string[];             // names of OTHER workspace packages this one depends on
}

function readJson(p: string): any | null {
    try { return JSON.parse(fs.readFileSync(p, 'utf-8')); } catch { return null; }
}

// The target repo must be installed before indexing: without node_modules the packages' tsconfigs
// cannot even resolve their own `extends`, so the checker would silently bind nothing. Failing
// loudly here is the whole point — a degraded index looks identical to a good one from the outside.
export function assertDepsInstalled(repoRoot: string): void {
    if (fs.existsSync(path.join(repoRoot, 'node_modules'))) return;
    throw new Error(
        `Target repo has no node_modules: ${repoRoot}\n` +
        `Binding resolution needs the workspace installed. Run:\n` +
        `  cd ${repoRoot} && node .yarn/releases/yarn-4.12.0.cjs install`);
}

export function discoverWorkspace(repoRoot: string): WorkspacePackage[] {
    const root = readJson(path.join(repoRoot, 'package.json'));
    const patterns: string[] = Array.isArray(root?.workspaces)
        ? root.workspaces
        : Array.isArray(root?.workspaces?.packages) ? root.workspaces.packages : [];

    const dirs = new Set<string>();
    for (const pattern of patterns) {
        for (const m of globSync(`${pattern}/package.json`, { cwd: repoRoot, ignore: '**/node_modules/**' })) {
            dirs.add(path.dirname(m));
        }
    }

    const packages: WorkspacePackage[] = [];
    for (const id of [...dirs].sort()) {
        const dir = path.join(repoRoot, id);
        const pkg = readJson(path.join(dir, 'package.json'));
        const tsconfig = path.join(dir, 'tsconfig.json');
        packages.push({
            id,
            dir,
            name: typeof pkg?.name === 'string' ? pkg.name : null,
            tsconfig: fs.existsSync(tsconfig) ? tsconfig : null,
            deps: [],
        });
    }

    // Second pass: a dep counts only if it names another package in this same workspace.
    const workspaceNames = new Set(packages.map(p => p.name).filter((n): n is string => n !== null));
    for (const p of packages) {
        const pkg = readJson(path.join(p.dir, 'package.json'));
        const all = { ...(pkg?.dependencies ?? {}), ...(pkg?.devDependencies ?? {}), ...(pkg?.peerDependencies ?? {}) };
        p.deps = Object.keys(all).filter(n => n !== p.name && workspaceNames.has(n)).sort();
    }
    return packages;
}

// Longest matching directory wins: a nested workspace (a package inside another package's tree)
// must claim its own files rather than leaving them to the outer package.
export function packageIdOf(absFile: string, packages: WorkspacePackage[]): string | null {
    let best: string | null = null;
    for (const p of packages) {
        const prefix = p.dir.endsWith(path.sep) ? p.dir : p.dir + path.sep;
        if (absFile.startsWith(prefix) && (best === null || p.dir.length > best.length)) best = p.dir;
    }
    if (best === null) return null;
    return packages.find(p => p.dir === best)!.id;
}

// A package's bindings depend on the declarations of the packages it imports, so an upstream
// change can change a downstream binding. Walk dependents transitively.
export function dirtyClosure(dirtyIds: string[], packages: WorkspacePackage[]): string[] {
    const byName = new Map(packages.filter(p => p.name).map(p => [p.name!, p.id]));
    const dependents = new Map<string, string[]>();      // package id -> ids that depend on it
    for (const p of packages) {
        for (const depName of p.deps) {
            const depId = byName.get(depName);
            if (!depId) continue;
            if (!dependents.has(depId)) dependents.set(depId, []);
            dependents.get(depId)!.push(p.id);
        }
    }
    const seen = new Set<string>();
    const queue = [...dirtyIds];
    while (queue.length > 0) {
        const id = queue.shift()!;
        if (seen.has(id)) continue;
        seen.add(id);
        for (const d of dependents.get(id) ?? []) queue.push(d);
    }
    return [...seen].sort();
}
