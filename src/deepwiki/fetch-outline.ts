#!/usr/bin/env npx tsx
// One-shot fetch of the DeepWiki Rocket.Chat outline -> data/deepwiki/outline.json.
// Control/ablation data only — never shipped, never committed.
//
// Transport: DeepWiki's official MCP endpoint (JSON-RPC 2.0 over HTTP, response may be
// plain JSON or a single SSE "data:" line — both are handled below). This replaced an
// earlier HTML-scraping transport; the MCP endpoint is now the only transport, with no
// HTML fallback.
//
// Note on data shape: unlike the deepwiki.com HTML pages (which embed literal
// github.com/.../blob/<commit>/<file>#L<start>-L<end> links, see parse-outline.ts),
// the MCP read_wiki_contents tool returns markdown with "Sources: [file:start-end]()"
// style references (no github blob URLs, no commit hash) — confirmed by probing the
// live endpoint before writing this. parseSectionHtml (and its test) therefore does not
// apply to MCP content and is left untouched; the MCP-specific extraction below is a
// separate, dedicated parser for this markdown shape.
import * as fs from 'fs';
import * as path from 'path';
import type { SourceRef, WikiOutline, WikiSection } from './types.js';

const MCP_ENDPOINT = 'https://mcp.deepwiki.com/mcp';
const REPO = 'RocketChat/Rocket.Chat';
// The MCP API does not return a pinned commit hash (unlike the old HTML pages, which
// showed "Last indexed: ... (e75965c0)"). Kept as the last known indexed commit.
const COMMIT = 'e75965c0';
const OUT = path.resolve('data/deepwiki/outline.json');
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

interface StructureEntry { id: string; title: string }

// Call an MCP tool via JSON-RPC 2.0 tools/call and return its text content.
// The endpoint may reply with a plain JSON body or a single SSE "data:" line
// (content-type: text/event-stream); this handles both.
async function callMcpTool(name: string, args: Record<string, unknown>): Promise<string> {
    const res = await fetch(MCP_ENDPOINT, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            accept: 'application/json, text/event-stream',
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: Date.now(),
            method: 'tools/call',
            params: { name, arguments: args },
        }),
    });
    if (!res.ok) throw new Error(`MCP request for ${name} failed: HTTP ${res.status}`);
    const raw = await res.text();
    const dataLine = raw.split('\n').find(line => line.startsWith('data:'));
    const jsonText = dataLine ? dataLine.slice('data:'.length).trim() : raw.trim();
    const payload = JSON.parse(jsonText);
    if (payload.error) throw new Error(`MCP tool ${name} returned an error: ${JSON.stringify(payload.error)}`);
    const text = payload.result?.content?.[0]?.text;
    if (typeof text !== 'string') throw new Error(`MCP tool ${name} returned no text content`);
    return text;
}

// read_wiki_structure returns a nested bullet list like:
//   - 1 Overview
//   - 2 System Architecture
//     - 2.1 Monorepo Structure
// Derive a stable id (e.g. "2.1-monorepo-structure") from the section number + title.
function parseStructure(text: string): StructureEntry[] {
    const entries: StructureEntry[] = [];
    const lineRe = /^[ \t]*-[ \t]+(\d+(?:\.\d+)?)[ \t]+(.+?)[ \t]*$/gm;
    for (const m of text.matchAll(lineRe)) {
        const num = m[1];
        const title = m[2].trim();
        const slugTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        entries.push({ id: `${num}-${slugTitle}`, title });
    }
    return entries;
}

// read_wiki_contents returns one markdown blob for the whole wiki, with each section
// starting at a "# Page: <Title>" marker. Split into a title -> body map.
function splitPages(text: string): Map<string, string> {
    const marker = /^# Page: (.+)$/gm;
    const matches = [...text.matchAll(marker)];
    const pages = new Map<string, string>();
    for (let i = 0; i < matches.length; i++) {
        const title = matches[i][1].trim();
        const start = matches[i].index! + matches[i][0].length;
        const end = i + 1 < matches.length ? matches[i + 1].index! : text.length;
        if (!pages.has(title.toLowerCase())) pages.set(title.toLowerCase(), text.slice(start, end));
    }
    return pages;
}

// Sources are cited as "[file:start-end]()" or "[file:line]()" links — sometimes inline
// on a "Sources:"/"**Sources:**" line (comma-separated, possibly several ranges bundled
// for one file, e.g. "[package.json:1-23,24-36]()"), sometimes as a "- [file:range]()"
// bullet list on the lines *following* a standalone "**Sources:**" marker. Rather than
// anchor on the marker line (fragile across both styles), scan the whole section body:
// the "[path:digits(-digits)?(,digits(-digits)?)*]()" shape is distinctive enough (empty
// parens) that it only ever appears in these source citations.
function extractSources(sectionBody: string): SourceRef[] {
    const seen = new Set<string>();
    const sources: SourceRef[] = [];
    const LINK_RE = /\[([^\]:]+):([\d,\-]+)\]\(\)/g;
    for (const m of sectionBody.matchAll(LINK_RE)) {
        const file = m[1];
        for (const part of m[2].split(',')) {
            const range = part.match(/^(\d+)(?:-(\d+))?$/);
            if (!range) continue;
            const startLine = Number(range[1]);
            const endLine = range[2] ? Number(range[2]) : startLine;
            const key = `${file}:${startLine}:${endLine}`;
            if (seen.has(key)) continue;
            seen.add(key);
            sources.push({ file, startLine, endLine });
        }
    }
    return sources;
}

// Blurb = first 200 chars of the section's own prose. Markdown has no page-chrome
// problem like the old HTML transport did, so this just drops the "Relevant source
// files" <details> block and heading lines, then takes the remaining text.
function extractBlurb(sectionBody: string): string {
    const detailsEnd = sectionBody.indexOf('</details>');
    const prose = detailsEnd !== -1 ? sectionBody.slice(detailsEnd + '</details>'.length) : sectionBody;
    const plain = prose
        .split('\n')
        .filter(line => !/^#{1,6}[ \t]/.test(line.trim()))
        .join(' ')
        .replace(/[`*_>]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    return plain.slice(0, 200);
}

const structureText = await callMcpTool('read_wiki_structure', { repoName: REPO });
const structure = parseStructure(structureText);
console.error(`Found ${structure.length} section pages`);

await sleep(1000);
const contentsText = await callMcpTool('read_wiki_contents', { repoName: REPO });
const pages = splitPages(contentsText);

const sections: WikiSection[] = [];
for (const entry of structure) {
    const body = pages.get(entry.title.toLowerCase());
    if (!body) {
        console.error(`  ${entry.id}: WARNING no content found for title "${entry.title}"`);
        sections.push({ id: entry.id, title: entry.title, blurb: '', sources: [] });
        continue;
    }
    const sources = extractSources(body);
    const blurb = extractBlurb(body);
    sections.push({ id: entry.id, title: entry.title, blurb, sources });
    console.error(`  ${entry.id}: ${sources.length} sources`);
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({ repo: REPO, commit: COMMIT, sections } satisfies WikiOutline, null, 2));
console.error(`Wrote ${OUT}`);
