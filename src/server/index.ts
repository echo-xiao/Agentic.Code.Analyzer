import * as fs from 'fs';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { ListToolsRequestSchema, CallToolRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { OUTPUT_DIR } from '../config.js';
import { preWarmCache, initializeGlobalIndex, LocalDatabase, computeAllEmbeddings } from '../indexer/index.js';
import { TOOL_DEFINITIONS, handleToolCall } from './registry.js';
import { GLOBAL_INDEX } from '../indexer/state.js';

// ============================================================================
// MCP Server 启动入口
// ============================================================================
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// 增量预热，拿到变更数量
const { updatedCount } = preWarmCache();

// 若有文件变更或没有持久化的索引缓存，重建并保存；否则直接加载
const db = new LocalDatabase(OUTPUT_DIR);
if (updatedCount > 0 || !db.loadIndex(GLOBAL_INDEX)) {
    initializeGlobalIndex();
    db.saveIndex(GLOBAL_INDEX);
} else {
    console.error('⚡ Index loaded from cache (no source changes detected).');
}

// Embedding 计算：增量，仅处理新增/变更的 symbol
await computeAllEmbeddings();

// --prewarm: 只建索引，不启动 MCP server
if (process.argv.includes('--prewarm')) process.exit(0);

// 监听磁盘 index 变化，自动热重载到内存
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
