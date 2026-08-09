import { execFileSync } from 'child_process';
import { TARGET_SRC_DIR, isIndexedSourceFile } from '../config.js';

export interface ChangeSet {
    /** All paths are repository-relative, exactly as git prints them. */
    added: string[];
    modified: string[];
    deleted: string[];
    renamed: Array<{ from: string; to: string }>;
}

// Parsing is separated from the git call so it can be tested against fixture strings -- driving
// real renames through a real repository just to check a tab-separated parser is not worth it.
export function parseNameStatus(raw: string): ChangeSet {
    const out: ChangeSet = { added: [], modified: [], deleted: [], renamed: [] };

    for (const line of raw.split('\n')) {
        if (!line.trim()) continue;
        const parts = line.split('\t');
        const status = parts[0];

        if (status.startsWith('R')) {
            const from = parts[1];
            const to = parts[2];
            if (!from || !to) continue;
            const fromIsSource = isIndexedSourceFile(from);
            const toIsSource = isIndexedSourceFile(to);
            // A rename that crosses the source boundary is, for the index, a plain removal or
            // addition -- there is no mapping to carry across.
            if (fromIsSource && toIsSource) out.renamed.push({ from, to });
            else if (fromIsSource) out.deleted.push(from);
            else if (toIsSource) out.added.push(to);
            continue;
        }

        const file = parts[1];
        if (!file || !isIndexedSourceFile(file)) continue;
        if (status === 'A') out.added.push(file);
        else if (status === 'M') out.modified.push(file);
        else if (status === 'D') out.deleted.push(file);
    }

    return out;
}

function git(args: string[], repoDir: string): string | null {
    try {
        return execFileSync('git', ['-C', repoDir, ...args], {
            encoding: 'utf-8',
            maxBuffer: 64 * 1024 * 1024,
            stdio: ['ignore', 'pipe', 'ignore'],
        });
    } catch {
        return null;
    }
}

export function currentCommit(repoDir: string = TARGET_SRC_DIR): string | null {
    return git(['rev-parse', 'HEAD'], repoDir)?.trim() ?? null;
}

// A dirty tree means the files on disk are not the files at HEAD, so a diff against HEAD would
// describe something other than what the indexer just read. Callers fall back to full detection.
export function isCleanWorktree(repoDir: string = TARGET_SRC_DIR): boolean {
    const out = git(['status', '--porcelain'], repoDir);
    return out !== null && out.trim() === '';
}

export function changeSetSince(
    fromCommit: string,
    toCommit = 'HEAD',
    repoDir: string = TARGET_SRC_DIR,
): ChangeSet | null {
    const raw = git(['diff', '--name-status', '-M', fromCommit, toCommit], repoDir);
    return raw === null ? null : parseNameStatus(raw);
}
