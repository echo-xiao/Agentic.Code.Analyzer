import * as fs from 'fs';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { ListToolsRequestSchema, CallToolRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { OUTPUT_DIR } from '../config.js';
import { ensureIndex, LocalDatabase } from '../indexer/index.js';
import { TOOL_DEFINITIONS, handleToolCall } from './registry.js';
import { GLOBAL_INDEX } from '../indexer/state.js';

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

await ensureIndex();

if (process.argv.includes('--prewarm')) process.exit(0);

const db = new LocalDatabase(OUTPUT_DIR);
db.watchAndReload(GLOBAL_INDEX);

const server = new Server(
    { name: 'rocket-chat-code-analyzer', version: '1.0.0' },
    { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOL_DEFINITIONS }));
server.setRequestHandler(CallToolRequestSchema, async ({ params: { name, arguments: args } }) =>
    handleToolCall(name, args ?? {})
);

await server.connect(new StdioServerTransport());
console.error('✅ MCP Server running on stdio');

const shutdown = () => { process.exit(0); };
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
