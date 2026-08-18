// Where a routed section's full wiki markdown lives. The outline (outline.json) only ever carries
// a blurb + source refs; the prose goes into separate per-section files written by
// fetch-outline.ts, so it doesn't bloat the outline JSON the router prompt is built from.
// sections.ts is what reads them back.
import * as path from 'path';
import { DATA_DIR } from '../config.js';

// Anchored to DATA_DIR (derived from __dirname), not to the current directory: an MCP
// host spawns the server from wherever it happens to be, and a cwd-relative path
// silently resolved to zero sections there.
export const SECTIONS_DIR = path.join(DATA_DIR, 'deepwiki', 'sections');

export function sectionContentPath(sectionId: string): string {
    return path.join(SECTIONS_DIR, `${sectionId}.md`);
}
