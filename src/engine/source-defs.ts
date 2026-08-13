// source-defs.ts — read a definition's implementation by its id.
//
// Replaces two separate name→file guesses, each with its own heuristic and neither agreeing with
// the traversal's:
//
//   engine/source.ts:7      preferred-file suffix match, then try each candidate in turn
//   pipeline/reading.ts:20  bare files[0], no tier at all, then a blind 60-line window
//
// Both could hand the model a different same-named file's body than the skeleton anchored on, and
// fallbackRead did it with no signal that anything was approximate. A definition already records
// its file and line range, so there is nothing to guess and no ts-morph pass to re-run: this is a
// slice of a file the caller can verify by opening it at those lines.
import * as fs from 'fs';
import * as path from 'path';
import { GLOBAL_INDEX } from '../indexer/state.js';
import { TARGET_SRC_DIR } from '../config.js';

export interface Implementation {
    text: string;
    file: string;
    startLine: number;
    endLine: number;
    kind: string;
}

export function readDefinition(defId: string, repoRoot: string = TARGET_SRC_DIR): Implementation | null {
    // A dispatch node is a key, not a declaration: it has no file and no body by construction.
    if (defId.startsWith('#dispatch/')) return null;

    const def = GLOBAL_INDEX.defs.get(defId);
    if (!def) return null;

    let lines: string[];
    try {
        lines = fs.readFileSync(path.join(repoRoot, def.file), 'utf8').split('\n');
    } catch { return null; }

    // The index can be a revision or two behind the working tree; clamping keeps a stale range
    // from throwing, and the returned line numbers say exactly what was read.
    const startLine = Math.max(1, Math.min(def.line, lines.length));
    const endLine = Math.max(startLine, Math.min(def.endLine, lines.length));

    return {
        text: lines.slice(startLine - 1, endLine).join('\n'),
        file: def.file,
        startLine,
        endLine,
        kind: def.kind,
    };
}
