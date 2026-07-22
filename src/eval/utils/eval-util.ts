// Shared deterministic helpers for the eval report scripts (no LLM, no key).
import * as fs from 'fs';
import * as path from 'path';

// Does the answer text mention this ground-truth file (full path, dir/base, or dir/base-no-ext)?
export function fileMatches(text: string, gtFile: string): boolean {
    if (text.includes(gtFile)) return true;
    const base = path.basename(gtFile);
    const dir = path.basename(path.dirname(gtFile));
    if (text.includes(`${dir}/${base}`)) return true;
    return text.includes(`${dir}/${base.replace(/\.(tsx?|js)$/, '')}`);
}

// Pull path-like file references out of answer prose.
export function extractCitedFiles(answer: string): string[] {
    const m = answer.match(/(?:apps\/meteor|packages|ee)\/[\w./-]+\.(?:tsx?|js)/g) ?? [];
    return Array.from(new Set(m));
}
