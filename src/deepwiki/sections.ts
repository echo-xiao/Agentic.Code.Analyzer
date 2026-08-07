// Step 0 (offline, no LLM): split each wiki page's markdown into its `##` / `###` subsections and
// attribute source citations to the subsection they appear under.
//
// The page is too coarse a unit. `2.2-core-application` has 17 subsections, 11 files and 33
// symbols, but "how is a message sent on the client side" only concerns its `Message Sending
// Workflow` subsection -- which cites exactly the two sendMessage.ts files and nothing else. At
// page granularity those two sit in the same pool as deployment config, room navigation and the
// listeners module.
//
// The data is already on disk: fetch-outline.ts parses these same inline citations, it just
// flattens them page-wide and drops the position.
import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';

export const SECTIONS_DIR = path.resolve('data/deepwiki/sections');

// `[apps/meteor/x.ts:12-34]()` — the inline, line-anchored citation form. The plain
// `- [path](path)` bullets in each page's header list are page-wide and carry no position, so
// they are deliberately not matched here.
const CITATION = /\[([^\]:]+):([\d,\-]+)\]\(\)/g;
const HEADING = /^(#{2,3})\s+(.*)$/;

export interface WikiSubsection {
    pageId: string;
    heading: string;
    path: string;              // "2.2-core-application › Message Sending Workflow"
    sources: string[];         // repo-relative files cited under this heading, deduped
    prose: string;             // text between this heading and the next
}

export function parseSections(pageId: string, markdown: string): WikiSubsection[] {
    const out: WikiSubsection[] = [];
    let heading: string | null = null;
    let sources: string[] = [];
    let prose: string[] = [];

    const flush = () => {
        // A subsection with no line-anchored citation contributes no code, so it never becomes a
        // routable unit. Measured: 159 of 453 subsections are prose-only ("Purpose and Scope",
        // "Overview", diagram captions).
        if (heading !== null && sources.length > 0) {
            out.push({ pageId, heading, path: `${pageId} › ${heading}`, sources, prose: prose.join('\n') });
        }
    };

    for (const line of markdown.split('\n')) {
        const h = line.match(HEADING);
        if (h) {
            flush();
            heading = h[2].trim();
            sources = [];
            prose = [];
            continue;
        }
        if (heading === null) continue;                 // page preamble, before any heading
        prose.push(line);
        for (const m of line.matchAll(CITATION)) {
            if (!sources.includes(m[1])) sources.push(m[1]);
        }
    }
    flush();
    return out;
}

export function loadAllSections(dir = SECTIONS_DIR): WikiSubsection[] {
    const out: WikiSubsection[] = [];
    for (const file of glob.sync(path.join(dir, '*.md')).sort()) {
        const pageId = path.basename(file, '.md');
        out.push(...parseSections(pageId, fs.readFileSync(file, 'utf8')));
    }
    return out;
}
