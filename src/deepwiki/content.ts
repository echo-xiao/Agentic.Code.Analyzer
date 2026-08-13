// Where a routed section's full wiki markdown lives. The outline (outline.json) only ever carries
// a blurb + source refs; the prose goes into separate per-section files written by
// fetch-outline.ts, so it doesn't bloat the outline JSON the router prompt is built from.
// sections.ts is what reads them back.
import * as path from 'path';

export const SECTIONS_DIR = path.resolve('data/deepwiki/sections');

export function sectionContentPath(sectionId: string): string {
    return `data/deepwiki/sections/${sectionId}.md`;
}
