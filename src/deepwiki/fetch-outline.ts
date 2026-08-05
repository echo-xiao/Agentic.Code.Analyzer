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
    sections.push({ id: slug, title, blurb: text.slice(0, 200), sources });
    console.error(`  ${slug}: ${sources.length} sources`);
}
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({ repo: REPO, commit: COMMIT, sections } satisfies WikiOutline, null, 2));
console.error(`Wrote ${OUT}`);
