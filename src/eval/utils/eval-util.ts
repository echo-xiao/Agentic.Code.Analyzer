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

function symMatch(text: string, sym: string): boolean {
    return new RegExp(`\\b${sym.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(text);
}

// Lenient coverage: fraction of {core files ∪ key symbols} the answer mentions.
export function coverage(text: string, core: string[], syms: string[]): number {
    const total = core.length + syms.length;
    if (!total) return 1;
    return (core.filter(f => fileMatches(text, f)).length + syms.filter(s => symMatch(text, s)).length) / total;
}

// Read a markdown section between a start marker and the first of any end markers.
export function readSection(file: string, start: string, ends: string[]): string {
    try {
        let s = fs.readFileSync(file, 'utf-8');
        if (start && s.includes(start)) s = s.split(start)[1];
        for (const e of ends) if (s.includes(e)) s = s.split(e)[0];
        return s.trim();
    } catch { return ''; }
}

export function tokensOf(file: string, re: RegExp): number {
    try { return Number((fs.readFileSync(file, 'utf-8').match(re)?.[1] ?? '0').replace(/,/g, '')); } catch { return 0; }
}

// Pull path-like file references out of answer prose.
export function extractCitedFiles(answer: string): string[] {
    const m = answer.match(/(?:apps\/meteor|packages|ee)\/[\w./-]+\.(?:tsx?|js)/g) ?? [];
    return Array.from(new Set(m));
}
