// src/indexer/modulegraph-eval.ts —— 零测试,纯诊断脚本(人工看数)
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { MODULE_GRAPH_PATH } from '../config.js';
import type { ModuleGraph } from './modulegraph.js';

function main() {
    const mg: ModuleGraph = JSON.parse(fs.readFileSync(MODULE_GRAPH_PATH, 'utf-8'));
    console.error(`模块数: ${mg.modules.length}`);
    const sizes = mg.modules.map(m => m.files.length).sort((a, b) => b - a);
    console.error(`最大模块 ${sizes[0]} 文件 · 中位 ${sizes[Math.floor(sizes.length / 2)]} · 单文件模块数 ${sizes.filter(s => s === 1).length}`);
    // 巨型分量警戒:最大模块 > 全库 20% 说明 resolution 太低 / hub 降权不足
    const total = mg.modules.reduce((s, m) => s + m.files.length, 0);
    if (sizes[0] > total * 0.2) console.error(`⚠️ 最大模块占 ${Math.round(100 * sizes[0] / total)}% — 调高 resolution 或加强 hub 降权`);
}
if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) main();
