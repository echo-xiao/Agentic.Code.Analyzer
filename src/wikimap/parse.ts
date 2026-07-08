// 把 DeepWiki read_wiki_contents 的 markdown 全文压缩成结构化入口图。
// 红线：只保留结构（标题/路径/节点/边），散文一律丢弃。

export interface WikiDiagram { nodes: Record<string, string>; edges: string[][]; subgraphs: string[] }
export interface WikiPage { page: string; sections: string[]; diagrams: WikiDiagram[]; source_files: Record<string, string[]> }
export interface WikiMap { repo: string; derived_from: string; pages: WikiPage[]; file_to_pages: Record<string, string[]> }

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
        pages.push({ page: title, sections, diagrams, source_files: sourceFiles });
    }

    const file_to_pages: Record<string, string[]> = {};
    for (const [f, ps] of [...fileToPages.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
        file_to_pages[f] = [...ps].sort();
    }
    return { repo, derived_from: 'deepwiki mcp read_wiki_contents', pages, file_to_pages };
}
