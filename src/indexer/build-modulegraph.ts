// src/indexer/build-modulegraph.ts
import { pathToFileURL } from 'url';
import { ensureIndex } from './index.js';
import { buildChunks } from './chunks.js';
import { buildModuleGraph } from './modulegraph.js';

export async function main(): Promise<void> {
    await ensureIndex();                       // 保证 GLOBAL_INDEX + mapping 就绪
    const n = await buildChunks();
    console.error(`chunks: ${n} 条 → data/index/chunks.json`);
    const mg = buildModuleGraph();
    console.error(`module-graph: ${mg.modules.length} 模块 → data/index/module-graph.json`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
    main().catch(e => { console.error('Fatal:', e); process.exit(2); });
}
