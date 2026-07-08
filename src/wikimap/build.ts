// src/wikimap/build.ts
// 一次性构建脚本：拉 DeepWiki 全文 → 压缩 → data/wiki-map.json。运行期零 DeepWiki 依赖。
// 用法: npm run wiki:map
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { parseWikiMarkdown } from './parse.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = process.env.WIKI_REPO ?? 'RocketChat/Rocket.Chat';
const OUT = path.join(__dirname, '..', '..', 'data', 'wiki-map.json');

async function main() {
    const transport = new StreamableHTTPClientTransport(new URL('https://mcp.deepwiki.com/mcp'));
    const client = new Client({ name: 'aca-wikimap', version: '0.1.0' });
    await client.connect(transport);
    console.error(`Fetching read_wiki_contents for ${REPO}...`);
    const res = await client.callTool({ name: 'read_wiki_contents', arguments: { repoName: REPO } });
    const text = ((res as any).content ?? []).map((x: any) => x.text).filter(Boolean).join('\n');
    if (!text) throw new Error('empty wiki contents');
    await client.close();

    const map = parseWikiMarkdown(text, REPO);
    fs.mkdirSync(path.dirname(OUT), { recursive: true });
    fs.writeFileSync(OUT, JSON.stringify(map, null, 1), 'utf-8');

    const nFiles = Object.keys(map.file_to_pages).length;
    const nDiagrams = map.pages.reduce((s, p) => s + p.diagrams.length, 0);
    const nEdges = map.pages.reduce((s, p) => s + p.diagrams.reduce((t, d) => t + d.edges.length, 0), 0);
    console.error(`wiki-map: ${map.pages.length} pages, ${nDiagrams} diagrams, ${nEdges} edges, ${nFiles} files -> ${OUT}`);
}

main().catch(e => { console.error('Fatal:', e); process.exit(1); });
