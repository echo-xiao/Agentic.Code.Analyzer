#!/usr/bin/env npx tsx
// One-shot fetch of the DeepWiki Rocket.Chat outline -> data/deepwiki/outline.json.
// Control/ablation data only — never shipped, never committed.
import * as fs from 'fs';
import * as path from 'path';
import { parseSectionHtml } from './parse-outline.js';
import type { WikiOutline, WikiSection } from './types.js';

const BASE = 'https://deepwiki.com';
const REPO = 'RocketChat/Rocket.Chat';
const COMMIT = 'e75965c0';
const OUT = path.resolve('data/deepwiki/outline.json');
const UA = 'Mozilla/5.0 (compatible; deepwiki-outline-fetcher/1.0)';
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
const strip = (h: string) => h.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const CHROME_MARKER = 'Index your code with Devin';
const SOURCE_FILES_MARKER = 'Relevant source files';
// File-path-like tokens (containing a slash, or ending in a known source-file extension)
// let us walk past deepwiki's "Relevant source files" list without hardcoding page content.
const FILE_EXT_RE = /\.(ts|tsx|js|jsx|json|md|yml|yaml|patch|info|lock|sh|py|css|scss|txt|toml|cjs|mjs|env)$/i;
const isPathLikeToken = (tok: string) => tok.includes('/') || FILE_EXT_RE.test(tok);

// The stripped page text includes a lot of site chrome (nav, "Index your code with
// Devin...", the full section list, a "Relevant source files" file listing) before the
// actual section prose. Every deepwiki section page follows the same layout: title ->
// chrome -> nav -> "Relevant source files" -> <file list> -> real content -> footer chrome.
// Skip past the file list (by scanning for the first run of non-path-like tokens after the
// marker) to land on real, section-specific prose instead of identical boilerplate.
function extractBlurb(strippedText: string, title: string): string {
    const markerIdx = strippedText.indexOf(SOURCE_FILES_MARKER);
    if (markerIdx !== -1) {
        const tokens = strippedText.slice(markerIdx + SOURCE_FILES_MARKER.length).trim().split(' ');
        let i = 0;
        while (i < tokens.length) {
            const lookahead = tokens.slice(i, i + 5);
            if (lookahead.length > 0 && lookahead.every(t => !isPathLikeToken(t))) break;
            i++;
        }
        const rest = tokens.slice(i).join(' ').trim();
        if (rest.length > 0) return rest.slice(0, 200);
    }
    // Fallback 1: anchor on the section title text.
    const lowerText = strippedText.toLowerCase();
    const lowerTitle = title.toLowerCase();
    const titleIdx = lowerText.indexOf(lowerTitle);
    if (titleIdx !== -1) {
        const start = titleIdx + title.length;
        return strippedText.slice(start).trim().slice(0, 200);
    }
    // Fallback 2: drop the known chrome prefix if present.
    const chromeIdx = strippedText.indexOf(CHROME_MARKER);
    if (chromeIdx !== -1) {
        const start = chromeIdx + CHROME_MARKER.length;
        return strippedText.slice(start).trim().slice(0, 200);
    }
    return strippedText.slice(0, 200);
}

const home = await (await fetch(`${BASE}/${REPO}`, { headers: { 'User-Agent': UA } })).text();
const slugs = [...new Set([...home.matchAll(new RegExp(`href="/${REPO}/([\\w.-]+)"`, 'g'))].map(m => m[1]))];
console.error(`Found ${slugs.length} section pages`);

const sections: WikiSection[] = [];
for (const slug of slugs) {
    await sleep(1000);
    const html = await (await fetch(`${BASE}/${REPO}/${slug}`, { headers: { 'User-Agent': UA } })).text();
    // Prefer sources found directly in the rendered HTML (blob links present as of writing).
    // Fallback: deepwiki may switch to client-side rendering with data embedded in
    // __NEXT_DATA__ (or similar inline JSON blobs) instead of literal <a href> tags.
    // In that case, stringify the embedded JSON payload and run the same regex over it.
    let { sources } = parseSectionHtml(html);
    if (sources.length === 0) {
        const nextDataMatch = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
        if (nextDataMatch) {
            try {
                const payload = JSON.parse(nextDataMatch[1]);
                sources = parseSectionHtml(JSON.stringify(payload)).sources;
            } catch {
                // ignore malformed inline JSON, leave sources empty for this section
            }
        }
    }
    const text = strip(html);
    const title = slug.replace(/^\d+(\.\d+)?-/, '').replace(/-/g, ' ');
    sections.push({ id: slug, title, blurb: extractBlurb(text, title), sources });
    console.error(`  ${slug}: ${sources.length} sources`);
}
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({ repo: REPO, commit: COMMIT, sections } satisfies WikiOutline, null, 2));
console.error(`Wrote ${OUT}`);
