// Reads a routed section's full wiki markdown from disk. The outline (outline.json) only ever
// carries a blurb + source refs; the full prose (used for prompt background and the entry-
// retrieval prose-mention bonus) lives in separate per-section files written by fetch-outline.ts,
// so it doesn't bloat the outline JSON the router prompt is built from.
import * as fs from 'fs';
import * as path from 'path';
import type { WikiSection } from './types.js';

export const SECTIONS_DIR = path.resolve('data/deepwiki/sections');

export function sectionContentPath(sectionId: string): string {
    return `data/deepwiki/sections/${sectionId}.md`;
}

// Reads a section's full markdown from its contentPath. Returns null if the section has no
// contentPath (older outline snapshot, or the fetcher found no content page for it) or the file
// is missing/unreadable — never throws, since this feeds optional prompt background, not a
// load-bearing path.
export function loadSectionContent(section: WikiSection): string | null {
    if (!section.contentPath) return null;
    try {
        return fs.readFileSync(path.resolve(section.contentPath), 'utf8');
    } catch {
        return null;
    }
}
