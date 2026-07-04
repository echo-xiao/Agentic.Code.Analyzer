// wiki — runtime bridge to DeepWiki's MCP (public repos, free). Gives the agent an on-demand
// architecture oracle: ask_question over the repo's auto-generated wiki. The answer is prose +
// real file paths; the agent must still ground/verify cited paths via search/details.
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { GLOBAL_INDEX } from '../../indexer/state.js';

const REPO = process.env.WIKI_REPO ?? 'RocketChat/Rocket.Chat';

// The product's value-add: DeepWiki gives prose; WE verify every cited path against the live index.
// Appends a grounding footer so the agent trusts real paths and ignores stale/hallucinated ones.
function ground(text: string): string {
    const paths = [...new Set([...text.matchAll(/(?:apps|packages|ee)\/[\w./-]+\.(?:tsx?|js)/g)].map(m => m[0]))];
    if (!paths.length) return text;
    const files = [...GLOBAL_INDEX.allFiles].map(f => f.replace(/\\/g, '/'));
    const real: string[] = [], fake: string[] = [];
    for (const p of paths) (files.some(f => f.endsWith('/' + p) || f.endsWith(p)) ? real : fake).push(p);
    let footer = `\n\n---\n[grounding] ${real.length}/${paths.length} cited paths verified in this codebase's index.`;
    if (fake.length) footer += `\n⚠️ NOT in this codebase (stale/hallucinated — do NOT cite): ${fake.join(', ')}`;
    return text + footer;
}

let clientP: Promise<Client> | null = null;
function getClient(): Promise<Client> {
    if (!clientP) {
        clientP = (async () => {
            const transport = new StreamableHTTPClientTransport(new URL('https://mcp.deepwiki.com/mcp'));
            const c = new Client({ name: 'aca', version: '0.1.0' });
            await c.connect(transport);
            return c;
        })();
    }
    return clientP;
}

export async function askWiki(question: string): Promise<string> {
    if (!question) return 'Missing parameter: question';
    try {
        const c = await getClient();
        const res = await c.callTool({ name: 'ask_question', arguments: { repoName: REPO, question } });
        const text = ((res as any).content ?? []).map((x: any) => x.text).filter(Boolean).join('\n');
        return text ? ground(text) : '(no wiki answer)';
    } catch (e: any) {
        return `wiki error: ${e?.message ?? e}`;
    }
}
