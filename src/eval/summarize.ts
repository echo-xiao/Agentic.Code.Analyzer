#!/usr/bin/env npx tsx
/**
 * summarize — 方案2：给全库每个索引文件生成一句话英文摘要（Claude API，非 Gemini——用户指定）。
 *
 * 目标集 = 全部 skeleton（output.nosync/**​/*.skeleton.ts）——题目无关的产品态形状，覆盖全库
 * （~7600），不再是懒范围 top-60。摘要输入直接用 skeleton（imports+导出签名，浓缩全文件），
 * 连源文件、连索引都不用加载。
 * 缓存：按 skeleton 内容 sha1 哈希——skeleton 是源码的确定性产物（源码变→prewarm 重建 skeleton→
 * 哈希变→重总结），增量天然成立；重跑只补新增/变更文件，refresh 里"自动补上"。
 * 产物：data/file-summaries.json { relPath: { hash, summary } }（进仓，排序键确定性输出）。
 * 用途：候选混合排序的语义项（apn.ts 这类名字无信号的文件靠摘要 "Apple push notification delivery"
 *      被问题 token 命中）+ 候选地图逐行标注。
 * 红线：摘要只派生自代码本身（eval-blind），喂 agent 不喂 judge。
 * Run: npm run summaries:gen [-- --dry] [-- --limit=N]
 *   --dry      只报目标集统计与样例，不调 API（零成本预检）
 *   --limit=N  只跑前 N 个文件（先花几分钱验证输出质量，再放全量）
 *   断点续传：每批次落盘 + 内容哈希缓存——中断后重跑同一命令自动从断点继续。
 *   (需 .env 的 ANTHROPIC_API_KEY / CLAUDE_API_KEY)
 */
import "./utils/load-env.js";
import Anthropic from '@anthropic-ai/sdk';
import cliProgress from 'cli-progress';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { OUTPUT_DIR } from '../config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.join(ROOT, 'data', 'file-summaries.json');
const MODEL = 'claude-haiku-4-5-20251001';   // 一句话摘要，最便宜档足够
const BATCH = 20;          // 每次 API 调用打包 20 个文件
const HEAD_LINES = 40;     // 每 skeleton 送前 40 行（imports+签名，够写一句话，省 token）

type Store = Record<string, { hash: string; summary: string }>;

const sha1 = (s: string) => crypto.createHash('sha1').update(s).digest('hex');

// 递归 glob 全部 skeleton 文件（不加载索引，纯文件系统遍历）
function allSkeletons(dir: string, out: string[] = []): string[] {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) allSkeletons(p, out);
        else if (e.name.endsWith('.skeleton.ts')) out.push(p);
    }
    return out;
}

async function main() {
    const apiKey = process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY;
    // 无 key → 优雅跳过（exit 0）：摘要是增量可选层，不该拖垮整条 refresh 流水线
    if (!apiKey) { console.error('[summaries] ANTHROPIC_API_KEY 未设置 — 跳过摘要生成（不影响其余步骤）。'); return; }
    if (!fs.existsSync(OUTPUT_DIR)) { console.error('[summaries] output.nosync 不存在 — 先 npm run prewarm。'); return; }
    const client = new Anthropic({ apiKey });

    const store: Store = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf-8')) : {};
    const skeletons = allSkeletons(OUTPUT_DIR).sort();
    console.error(`全库 skeleton ${skeletons.length} 个`);

    // 读 skeleton + 哈希，挑出需要（新增或内容变更）的。key = skeleton 首行 "## File: <rel>" 的 rel。
    const pending: Array<{ rel: string; hash: string; head: string }> = [];
    let missing = 0;
    for (const sk of skeletons) {
        const content = fs.readFileSync(sk, 'utf-8');
        const m = content.match(/^## File:\s*(.+)$/m);
        if (!m) { missing++; continue; }         // 无 File 头（异常 skeleton）跳过
        const rel = m[1].trim();
        const hash = sha1(content);              // 哈希按 skeleton 算（源码变→skeleton 变→哈希变）
        if (store[rel]?.hash === hash) continue; // 缓存命中
        pending.push({ rel, hash, head: content.split('\n').slice(0, HEAD_LINES).join('\n') });
    }
    console.error(`缓存命中 ${skeletons.length - missing - pending.length} · 待生成 ${pending.length} · 异常跳过 ${missing}`);
    if (process.argv.includes('--dry')) {
        console.error(`[dry] 预计 ${Math.ceil(pending.length / BATCH)} 次 API 调用（${MODEL}）。待生成样例：`);
        for (const p of pending.slice(0, 8)) console.error(`  - ${p.rel}`);
        return;
    }
    const limitArg = process.argv.find(a => a.startsWith('--limit='))?.split('=')[1];
    if (limitArg) {
        pending.splice(Number(limitArg));
        console.error(`[limit] 本次只跑前 ${pending.length} 个`);
    }
    if (pending.length === 0) { console.error('无需生成。'); write(store); return; }

    const SCHEMA = {
        type: 'object',
        properties: {
            summaries: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: { path: { type: 'string' }, summary: { type: 'string' } },
                    required: ['path', 'summary'], additionalProperties: false,
                },
            },
        },
        required: ['summaries'], additionalProperties: false,
    } as const;

    let done = 0, failed = 0;
    const t0 = Date.now();
    const fmt = (sec: number) => sec >= 60 ? `${Math.floor(sec / 60)}分${Math.round(sec % 60)}秒` : `${Math.round(sec)}秒`;
    // 进度条：交互终端里是实时刷新条；管到 nohup 日志时（非 TTY）每 5 秒打一行（noTTYOutput）
    const bar = new cliProgress.SingleBar({
        format: '  摘要生成 [{bar}] {percentage}% | {value}/{total} 文件 | 已用 {elapsed} | 剩余 {eta_fmt} | 落盘 {saved} 失败 {failed}',
        noTTYOutput: true, notTTYSchedule: 5000, hideCursor: true, etaBuffer: 5,
    }, cliProgress.Presets.shades_classic);
    bar.start(pending.length, 0, { elapsed: '0秒', eta_fmt: '?', saved: Object.keys(store).length, failed: 0 });

    for (let i = 0; i < pending.length; i += BATCH) {
        const batch = pending.slice(i, i + BATCH);
        const filesBlock = batch.map(b => `=== ${b.rel} ===\n${b.head}`).join('\n\n');
        try {
            const resp = await client.messages.create({
                model: MODEL,
                max_tokens: 2048,
                system: 'You summarize source files of the Rocket.Chat codebase. For EACH file, write ONE English line (max 14 words) saying what the file does, using concrete domain nouns (e.g. "Apple push notification delivery via APN tokens"). No filler like "This file contains".',
                messages: [{ role: 'user', content: `Summarize each file (path + first ${HEAD_LINES} lines shown):\n\n${filesBlock}` }],
                // 注意：haiku 不支持 effort 参数（首跑全批 400 实证，2026-07-08）——只用 json_schema
                output_config: { format: { type: 'json_schema', schema: SCHEMA } },
            } as any);
            const block = (resp.content as any[]).find(b => b.type === 'text');
            const out = JSON.parse(block.text) as { summaries: Array<{ path: string; summary: string }> };
            for (const s of out.summaries) {
                const p = batch.find(b => b.rel === s.path || b.rel.endsWith(s.path));
                if (p) { store[p.rel] = { hash: p.hash, summary: s.summary.trim() }; done++; }
            }
        } catch (e: any) {
            failed += batch.length;
            bar.stop();
            console.error(`  批次 ${i} 失败: ${e?.message?.slice(0, 120)}`);
            bar.start(pending.length, Math.min(i + BATCH, pending.length));
        }
        // 断点保存：每批次立即落盘——中断/崩溃不丢已完成的；重跑时哈希缓存自动跳过已有条目（断点续传）
        write(store);
        const elapsed = (Date.now() - t0) / 1000;
        const batchNo = Math.floor(i / BATCH) + 1;
        const eta = (elapsed / batchNo) * (Math.ceil(pending.length / BATCH) - batchNo);
        bar.update(Math.min(i + BATCH, pending.length), { elapsed: fmt(elapsed), eta_fmt: fmt(eta), saved: Object.keys(store).length, failed });
    }
    bar.stop();
    write(store);
    console.error(`完成：新增/更新 ${done} 条，失败 ${failed} 个，库存 ${Object.keys(store).length} 条 → data/file-summaries.json · 总耗时 ${fmt((Date.now() - t0) / 1000)}`);
}

function write(store: Store) {
    const sorted: Store = {};
    for (const k of Object.keys(store).sort()) sorted[k] = store[k];
    fs.writeFileSync(OUT, JSON.stringify(sorted, null, 1), 'utf-8');
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
    main().catch(e => { console.error('Fatal:', e); process.exit(2); });
}
