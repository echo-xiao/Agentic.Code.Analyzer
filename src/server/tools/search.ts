// search — find entry-point seeds. Exact lookups (symbol index + file-path fragment) plus content
// grep as the fallback for call-patterns and anything the index doesn't know. No ranking here —
// ordering lives in graph(expand) (engine/expand.ts).
import { spawnSync } from 'child_process';
import { GLOBAL_INDEX } from '../../indexer/state.js';
import { TARGET_SRC_DIR } from '../../config.js';
import { SESSION } from '../session.js';
import { filterByLayer, getArchitectureHint, relPath } from '../engine/common.js';

export function runSearch(args: { query?: string; layer?: string }): string {
    const { query, layer } = args;
    if (!query) return 'Missing parameter: query';
    SESSION.hasCalledSearchOrGraph = true;

    const sections: string[] = [];
    const seenPaths = new Set<string>();

    // 1. Exact symbol match.
    const exactMatch = GLOBAL_INDEX.symbols.get(query);
    if (exactMatch && exactMatch.size > 0) {
        let paths = Array.from(exactMatch);
        if (layer) paths = filterByLayer(paths, layer);
        if (paths.length > 0) {
            paths.forEach(p => seenPaths.add(p));
            sections.push(`🎯 Symbol "${query}":\n${paths.map((p, i) => `${i + 1}. ${p}`).join('\n')}`);
        }
    }

    // 2. File-path fragment — deterministic lookup over allFiles, so an agent that knows a
    // filename can locate the file (details needs the exact path).
    const q = query.toLowerCase();
    let pathMatches = Array.from(GLOBAL_INDEX.allFiles)
        .filter(f => f.toLowerCase().includes(q) && !seenPaths.has(f));
    if (layer) pathMatches = filterByLayer(pathMatches, layer);
    pathMatches = pathMatches.slice(0, 15);
    if (pathMatches.length > 0) {
        sections.push(`📁 Files:\n${pathMatches.join('\n')}`);
    }

    // 3. Content grep — for call-pattern queries ('sdk.call', 'Meteor.methods'), and as the last
    // resort when the symbol index matched nothing, so a wrong entry-symbol guess still surfaces a
    // file instead of returning "no results" and letting the agent give up.
    const isCallPattern = /[.'"(\s]/.test(query);
    if (isCallPattern || sections.length === 0) {
        const grepArgs = [
            '-r', '-n', '-F',
            '--include=*.ts', '--include=*.tsx',
            '--exclude-dir=node_modules', '--exclude-dir=dist',
            '--exclude=*.test.ts', '--exclude=*.spec.ts',
            query, TARGET_SRC_DIR,
        ];
        const grep = spawnSync('grep', grepArgs, { encoding: 'utf-8', maxBuffer: 4 * 1024 * 1024 });
        if (grep.stdout) {
            const byFile = new Map<string, { example: string; count: number }>();
            for (const line of grep.stdout.trim().split('\n').filter(Boolean)) {
                const m = line.match(/^(.+?):(\d+):(.*)$/);
                if (!m) continue;
                const rel = relPath(m[1]);
                if (layer && !rel.includes(`/${layer}/`)) continue;
                if (!byFile.has(rel)) byFile.set(rel, { example: m[3].trim(), count: 0 });
                byFile.get(rel)!.count++;
            }
            if (byFile.size > 0) {
                const sorted = Array.from(byFile.entries())
                    .sort((a, b) => b[1].count - a[1].count);
                const top = sorted.slice(0, 10);
                const formatted = top
                    .map(([file, { example, count }]) =>
                        `  ${file} (${count} match${count > 1 ? 'es' : ''})\n    → ${example}`)
                    .join('\n');
                const extra = sorted.length > 10 ? `\n  … +${sorted.length - 10} more files` : '';
                sections.push(`🔍 Text matches for "${query}" (${sorted.length} files, top 10 by count):\n${formatted}${extra}`);
            }
        }
    }

    if (sections.length === 0) return `No results for "${query}". Try a different keyword, or a call pattern (e.g. 'API.v1.addRoute').`;

    const hint = getArchitectureHint(query);
    const body = hint
        ? `${hint}\n\n---\n\n${sections.join('\n\n')}`
        : sections.join('\n\n');
    const navHint = `\n\n💡 **Next:** graph("${query}") — move="expand" maps the subsystem, "down" traces callees in order, "up" shows dependents. (plan sets the default move.)`;
    return body + navHint;
}
