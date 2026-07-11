// 把 DeepWiki read_wiki_contents 的 markdown 全文压缩成结构化入口图。
// 红线：wiki-map 只保留结构（标题/路径/节点/边）；散文由 parseWikiProse 另存独立产物
// （data/wiki-prose.json），只被 wiki 工具消费，walker/eval 永不 import（方案1，2026-07-08）。

import type { WikiDiagram, WikiMap, WikiPage, ProseSection } from './schema.js';
export type { WikiDiagram, WikiMap, WikiPage, ProseSection } from './schema.js';

// 每页的散文，按 ## 章节切分；mermaid 块剥除（结构已在 parseWikiMarkdown 里）；
// 保留 Sources 行（路径引用对 agent 有用）。
export function parseWikiProse(text: string): Record<string, ProseSection[]> {
    const parts = text.split(/^# Page: (.+)$/m);
    const out: Record<string, ProseSection[]> = {};
    for (let i = 1; i < parts.length; i += 2) {
        const title = parts[i].trim();
        const body = (parts[i + 1] ?? '').replace(/```mermaid\n[\s\S]*?```/g, '');
        const secParts = body.split(/^## (.+)$/m);
        const sections: ProseSection[] = [];
        const intro = secParts[0].replace(/^# .*$/gm, '').trim();
        if (intro) sections.push({ section: '(intro)', text: intro });
        for (let j = 1; j < secParts.length; j += 2) {
            const t = (secParts[j + 1] ?? '').trim();
            if (t) sections.push({ section: secParts[j].trim(), text: t });
        }
        if (sections.length) out[title] = sections;
    }
    return out;
}

const NODE_RE = /^\s*(\w+)\[["']?(.+?)["']?\]\s*$/gm;
const EDGE_RE = /^\s*(\w+)\s*(?:-{1,3}\.?-*>|={2}>)\s*(?:\|"?([^|"\n]*)"?\|\s*)?(\w+)\s*$/gm;
const SUBGRAPH_RE = /subgraph\s+"?([^"\n]+?)"?\s*$/gm;
const SRC_RE = /\[([\w./ @-]+?)(?::(\d+(?:-\d+)?))?\]\(\)/g;
const MERMAID_RE = /```mermaid\n([\s\S]*?)```/g;
const SECTION_RE = /^## (.+)$/gm;

function cleanLabel(s: string): string {
    return s.replace(/<br\s*\/?>/g, ' / ').trim();
}

function parseMermaid(block: string): WikiDiagram {
    const nodes: Record<string, string> = {};
    for (const m of block.matchAll(NODE_RE)) nodes[m[1]] = cleanLabel(m[2]);
    const edges: string[][] = [];
    for (const m of block.matchAll(EDGE_RE)) {
        // 跳过误匹配节点定义的行（EDGE_RE 只该命中 A --> B 形态）
        if (!m[3]) continue;
        const e = [m[1], m[3]];
        if (m[2]) e.push(m[2].trim());
        edges.push(e);
    }
    const subgraphs = [...block.matchAll(SUBGRAPH_RE)].map(m => m[1].trim());
    return { nodes, edges, subgraphs };
}

/** title → slug: lowercase, non-alnum → '-' */
function slugify(title: string): string {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export function parseWikiMarkdown(text: string, repo: string): WikiMap {
    const parts = text.split(/^# Page: (.+)$/m);
    const pages: WikiPage[] = [];
    const fileToPages = new Map<string, Set<string>>();

    for (let i = 1; i < parts.length; i += 2) {
        const title = parts[i].trim();
        const body = parts[i + 1] ?? '';
        const sections = [...body.matchAll(SECTION_RE)].map(m => m[1].trim());
        const diagrams = [...body.matchAll(MERMAID_RE)].map(m => parseMermaid(m[1]));

        const sourceFiles: Record<string, string[]> = {};
        for (const m of body.matchAll(SRC_RE)) {
            const file = m[1].trim();
            const lastSeg = file.split('/').pop() ?? '';
            if (!lastSeg.includes('.')) continue;           // 非文件（如标题误匹配）丢弃
            const lines = m[2];
            if (!(file in sourceFiles)) sourceFiles[file] = [];
            if (lines && !sourceFiles[file].includes(lines)) sourceFiles[file].push(lines);
            let s = fileToPages.get(file);
            if (!s) { s = new Set(); fileToPages.set(file, s); }
            s.add(title);
        }
        // 计划字段填默认值（§7.1；parse.ts 在 Task 3 删除，这里只为 tsc --noEmit 通过）
        pages.push({
            id: slugify(title), title, category: '', scope: '', modules: [], seedFiles: [],
            page: title, sections, diagrams, source_files: sourceFiles,
        });
    }

    const file_to_pages: Record<string, string[]> = {};
    for (const [f, ps] of [...fileToPages.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
        file_to_pages[f] = [...ps].sort();
    }
    return { repo, generated_at: new Date().toISOString(), derived_from: 'deepwiki mcp read_wiki_contents', pages, file_to_pages };
}
