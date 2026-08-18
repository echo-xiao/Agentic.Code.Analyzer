// Baseline answers from DeepWiki's official MCP endpoint, cached on disk so a benchmark
// rerun never re-asks. Control/ablation only.
import * as fs from 'fs';
import * as path from 'path';
import { DATA_DIR } from '../config.js';
import { callMcpTool } from './mcp.js';

const CACHE_DIR = path.join(DATA_DIR, 'deepwiki', 'answers');
const REPO = 'RocketChat/Rocket.Chat';
type PostFn = (question: string) => Promise<string>;

const mcpPost: PostFn = async (question) => {
    return callMcpTool('ask_question', { repoName: REPO, question });
};

export async function askDeepWiki(qid: string, question: string, opts: { postFn?: PostFn } = {}): Promise<string> {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
    const cachePath = path.join(CACHE_DIR, `${qid}.md`);
    if (fs.existsSync(cachePath)) return fs.readFileSync(cachePath, 'utf8');
    // A thrown error (network/parse failure) never reaches here, so nothing gets cached
    // for it. Also guard the case of a postFn that resolves with empty text instead of
    // throwing — an empty answer must not be written to the cache either, so a later
    // rerun still retries instead of permanently serving a blank baseline.
    const answer = await (opts.postFn ?? mcpPost)(question);
    if (answer) fs.writeFileSync(cachePath, answer);
    return answer;
}
