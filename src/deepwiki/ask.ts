// Baseline answers from DeepWiki's official MCP endpoint, cached on disk so a benchmark
// rerun never re-asks. Control/ablation only.
import * as fs from 'fs';
import * as path from 'path';
import { callMcpTool } from './mcp.js';

const CACHE_DIR = path.resolve('data/deepwiki/answers');
const REPO = 'RocketChat/Rocket.Chat';
type PostFn = (question: string) => Promise<string>;

const mcpPost: PostFn = async (question) => {
    return callMcpTool('ask_question', { repoName: REPO, question });
};

export async function askDeepWiki(qid: string, question: string, opts: { postFn?: PostFn } = {}): Promise<string> {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
    const cachePath = path.join(CACHE_DIR, `${qid}.md`);
    if (fs.existsSync(cachePath)) return fs.readFileSync(cachePath, 'utf8');
    const answer = await (opts.postFn ?? mcpPost)(question);
    fs.writeFileSync(cachePath, answer);
    return answer;
}
