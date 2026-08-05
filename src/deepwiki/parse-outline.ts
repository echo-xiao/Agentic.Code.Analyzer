// Parse DeepWiki section HTML: pull github blob links (pinned commit) into SourceRefs.
import type { SourceRef } from './types.js';

const BLOB_RE = /github\.com\/RocketChat\/Rocket\.Chat\/blob\/[0-9a-f]+\/([^"#?]+)(?:\?[^"#]*)?#L(\d+)-L(\d+)/g;

export function parseSectionHtml(html: string): { sources: SourceRef[] } {
    const seen = new Set<string>();
    const sources: SourceRef[] = [];
    for (const m of html.matchAll(BLOB_RE)) {
        const key = `${m[1]}:${m[2]}:${m[3]}`;
        if (seen.has(key)) continue;
        seen.add(key);
        sources.push({ file: m[1], startLine: Number(m[2]), endLine: Number(m[3]) });
    }
    return { sources };
}
