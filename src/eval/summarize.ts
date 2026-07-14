#!/usr/bin/env npx tsx
/**
 * summarize — P2: 给全库每个索引文件生成多字段结构化摘要（Claude API，每文件独立调用注入结构事实）。
 *
 * 目标集 = 全部 skeleton（output.nosync/**​/*.skeleton.ts）。
 * 产物：data/summaries/file-summaries.json { relPath: FileSummary }（进仓，排序键确定性输出）。
 * 缓存：按 skeleton 内容 sha1 哈希——skeleton 变→哈希变→重生成（断点续传）。
 * Run: npm run summaries:gen [-- --dry] [-- --limit=N]
 *   --dry      只报目标集统计与样例，不调 API（零成本预检）
 *   --limit=N  只跑前 N 个文件（先花几分钱验证输出质量，再放全量）
 */
import "./utils/load-env.js";
import Anthropic from '@anthropic-ai/sdk';
import cliProgress from 'cli-progress';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { OUTPUT_DIR } from '../config.js';
import { computeFacts } from '../indexer/structural-facts.js';
import { ensureIndex, LocalDatabase } from '../indexer/index.js';
import { GLOBAL_INDEX } from '../indexer/state.js';
import { assembleSummary, FILE_SUMMARY_LLM_SCHEMA, type FileSummary, type LLMFields } from './file-summary.js';
import { runPool, callWithRetry } from './utils/pool.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const SUMMARIES_DIR = path.join(ROOT, 'data', 'summaries');
const OUT = path.join(SUMMARIES_DIR, 'file-summaries.json');
export const MODEL_LEAF = 'claude-haiku-4-5-20251001';
const MAX_SKELETON_LINES = 400;

type Store = Record<string, FileSummary>;

const sha1 = (s: string) => crypto.createHash('sha1').update(s).digest('hex');

// 递归 glob 全部 skeleton 文件（纯文件系统遍历）
function allSkeletons(dir: string, out: string[] = []): string[] {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) allSkeletons(p, out);
        else if (e.name.endsWith('.skeleton.ts')) out.push(p);
    }
    return out;
}

/**
 * buildPrompt — 纯函数，把 skeleton + 结构事实合成提示字符串。
 * 导出供 Task 8 AB 脚本和单测使用。
 */
export function buildPrompt(rel: string, skeletonText: string, facts: FileSummary): string {
    const lines = skeletonText.split('\n');
    const truncated = lines.length > MAX_SKELETON_LINES;
    const skeletonBody = lines.slice(0, MAX_SKELETON_LINES).join('\n')
        + (truncated ? `\n\n// [truncated: ${lines.length} lines total, showing first ${MAX_SKELETON_LINES}]` : '');

    return [
        `You summarize ONE source file of the Rocket.Chat codebase. Output the 4 schema fields.`,
        `Use the STRUCTURAL FACTS below (they are ground truth from the dependency graph — do not contradict them):`,
        `- exports: ${facts.key_exports.join(', ') || '(none)'}`,
        `- fanIn (files importing this): ${facts.fanIn}  ·  fanOut: ${facts.fanOut}`,
        `- upstream (this file calls): ${facts.upstream.join(', ') || '(none)'}`,
        `- cross-layer edges: ${facts.crossLayerEdges.join(', ') || '(none)'}`,
        ``,
        `role = one line what this file does (concrete domain nouns). responsibilities = 2-4 short phrases.`,
        `characteristics = tags from: entry-point|singleton|cross-layer-dispatcher|service-class|react-component|react-hook|model|util|config|type-only|hot-path (a file with high fanIn is often hot-path; cross-layer edges → cross-layer-dispatcher).`,
        `subsystem_hint = which subsystem (e.g. messaging, livechat, auth).`,
        ``,
        `File: ${rel}`,
        '```', skeletonBody, '```',
    ].join('\n');
}

async function main() {
    const apiKey = process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY;
    // 无 key → 优雅跳过（exit 0）：摘要是增量可选层，不该拖垮整条 refresh 流水线
    if (!apiKey) { console.error('[summaries] ANTHROPIC_API_KEY 未设置 — 跳过摘要生成（不影响其余步骤）。'); return; }
    if (!fs.existsSync(OUTPUT_DIR)) { console.error('[summaries] output.nosync 不存在 — 先 npm run prewarm。'); return; }

    // 加载全局索引（确保 GLOBAL_INDEX.fileDependents/allFiles 填充，downstream/fanIn 才有数据）
    await ensureIndex();

    // 建输出目录
    fs.mkdirSync(SUMMARIES_DIR, { recursive: true });

    const client = new Anthropic({ apiKey });
    const store: Store = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf-8')) : {};
    const skeletons = allSkeletons(OUTPUT_DIR).sort();
    console.error(`全库 skeleton ${skeletons.length} 个`);

    // 读 skeleton + 哈希，挑出需要（新增或内容变更）的。
    const pending: Array<{ rel: string; hash: string; skeletonText: string; skeletonPath: string }> = [];
    let missing = 0;
    for (const sk of skeletons) {
        const content = fs.readFileSync(sk, 'utf-8');
        const m = content.match(/^## File:\s*(.+)$/m);
        if (!m) { missing++; continue; }         // 无 File 头（异常 skeleton）跳过
        const rel = m[1].trim();
        const hash = sha1(content);              // 哈希按 skeleton 算（源码变→skeleton 变→哈希变）
        if (store[rel]?.hash === hash) continue; // 缓存命中
        pending.push({ rel, hash, skeletonText: content, skeletonPath: sk });
    }
    console.error(`缓存命中 ${skeletons.length - missing - pending.length} · 待生成 ${pending.length} · 异常跳过 ${missing}`);

    if (process.argv.includes('--dry')) {
        console.error(`[dry] 预计 ${pending.length} 次 API 调用（每文件一次，${MODEL_LEAF}）。待生成样例：`);
        for (const p of pending.slice(0, 8)) console.error(`  - ${p.rel}`);
        return;
    }

    const limitArg = process.argv.find(a => a.startsWith('--limit='))?.split('=')[1];
    if (limitArg) {
        pending.splice(Number(limitArg));
        console.error(`[limit] 本次只跑前 ${pending.length} 个`);
    }
    if (pending.length === 0) { console.error('无需生成。'); write(store); return; }

    let done = 0, failed = 0;
    const t0 = Date.now();
    const fmt = (sec: number) => sec >= 60 ? `${Math.floor(sec / 60)}分${Math.round(sec % 60)}秒` : `${Math.round(sec)}秒`;

    // 进度条：交互终端里是实时刷新条；管到 nohup 日志时（非 TTY）每 5 秒打一行
    const bar = new cliProgress.SingleBar({
        format: '  摘要生成 [{bar}] {percentage}% | {value}/{total} 文件 | 已用 {elapsed} | 剩余 {eta_fmt} | 落盘 {saved} 失败 {failed}',
        noTTYOutput: true, notTTYSchedule: 5000, hideCursor: true, etaBuffer: 5,
    }, cliProgress.Presets.shades_classic);
    bar.start(pending.length, 0, { elapsed: '0秒', eta_fmt: '?', saved: Object.keys(store).length, failed: 0 });

    const CONCURRENCY = Number(process.env.SUMMARIES_CONCURRENCY || 8);
    console.error(`并发 ${CONCURRENCY}`);
    let processed = 0;
    await runPool(pending, CONCURRENCY, async ({ rel, hash, skeletonText, skeletonPath }) => {
        // 读 mapping.json 取 symbols
        const mappingPath = skeletonPath.replace('.skeleton.ts', '.mapping.json');
        let symbols: any[] = [];
        if (fs.existsSync(mappingPath)) {
            try {
                const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf-8'));
                symbols = mapping.symbols ?? [];
            } catch { /* mapping 读取失败，空 symbols */ }
        }

        const facts = computeFacts(rel, symbols);
        const factsForPrompt = { ...facts, hash: '', role: '', responsibilities: [], characteristics: [], subsystem_hint: '', ranking_line: '' } as FileSummary;
        const prompt = buildPrompt(rel, skeletonText, factsForPrompt);

        try {
            const resp = await callWithRetry(() => client.messages.create({
                model: MODEL_LEAF,
                max_tokens: 1024,
                messages: [{ role: 'user', content: prompt }],
                output_config: { format: { type: 'json_schema', schema: FILE_SUMMARY_LLM_SCHEMA } },
            } as any));

            const block = (resp.content as any[]).find((b: any) => b.type === 'text');
            const llm = JSON.parse(block.text) as LLMFields;
            store[rel] = assembleSummary(hash, llm, facts);
            done++;
        } catch (e: any) {
            failed++;
            console.error(`  文件 ${rel} 失败: ${e?.message?.slice(0, 120)}`);
        }

        // 断点保存：每完成一个立即落盘（writeFileSync 同步，单线程续；崩溃不丢已完成的，重跑哈希跳过）
        write(store);
        processed++;
        const elapsed = (Date.now() - t0) / 1000;
        const eta = (elapsed / processed) * (pending.length - processed);
        bar.update(processed, { elapsed: fmt(elapsed), eta_fmt: fmt(eta), saved: Object.keys(store).length, failed });
    });

    bar.stop();
    write(store);
    console.error(`完成：新增/更新 ${done} 条，失败 ${failed} 个，库存 ${Object.keys(store).length} 条 → data/summaries/file-summaries.json · 总耗时 ${fmt((Date.now() - t0) / 1000)}`);
}

function write(store: Store) {
    fs.mkdirSync(SUMMARIES_DIR, { recursive: true });
    const sorted: Store = {};
    for (const k of Object.keys(store).sort()) sorted[k] = store[k];
    fs.writeFileSync(OUT, JSON.stringify(sorted, null, 1), 'utf-8');
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
    main().catch(e => { console.error('Fatal:', e); process.exit(2); });
}
