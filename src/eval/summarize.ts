#!/usr/bin/env npx tsx
/**
 * summarize — 方案2：给候选排序会碰到的文件生成一句话英文摘要（Claude API，非 Gemini——用户指定）。
 *
 * 目标集（懒范围，不是全库 7632）：每题 trace 的候选排序 top-60 的并集 + wiki-map 引用文件。
 * 缓存：按文件内容 sha1 哈希，文件没变永不重算——重跑只补新增/变更文件，纯增量。
 * 产物：data/file-summaries.json { relPath: { hash, summary } }（进仓，排序键确定性输出）。
 * 用途：候选混合排序的语义项（问题 token 对摘要匹配——apn.ts 这类名字无信号的文件靠摘要
 *      "Apple push notification delivery" 才能被排上来）+ 候选地图逐行标注。
 * 红线：摘要只派生自代码本身（eval-blind），喂 agent 不喂 judge。
 * Run: npm run summaries:gen [-- --dry] [-- --limit=N]
 *   --dry      只报目标集统计与样例，不调 API（零成本预检）
 *   --limit=N  只跑前 N 个文件（先花几分钱验证输出质量，再放全量）
 *   断点续传：每批次落盘 + 内容哈希缓存——中断后重跑同一命令自动从断点继续。
 *   (需 .env 的 ANTHROPIC_API_KEY / CLAUDE_API_KEY)
 */
import "./utils/load-env.js";
import Anthropic from '@anthropic-ai/sdk';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { TARGET_SRC_DIR, getOutputPaths } from '../config.js';
import { rankCandidates } from '../server/engine/entry-map.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const TRACE_DIR = path.join(ROOT, 'logs', 'data', 'retrieval-trace');
const WIKI_MAP = path.join(ROOT, 'data', 'wiki-map.json');
const OUT = path.join(ROOT, 'data', 'file-summaries.json');
const MODEL = 'claude-haiku-4-5-20251001';   // 一句话摘要，最便宜档足够
const BATCH = 20;          // 每次 API 调用打包 20 个文件
const TOP_PER_Q = 60;      // 每题取排序 top-60 进目标集
const HEAD_LINES = 25;     // 每文件送 path + 前 25 行（够写一句话，省 token）

type Store = Record<string, { hash: string; summary: string }>;

function targetFiles(): string[] {
    const set = new Set<string>();
    if (fs.existsSync(TRACE_DIR)) {
        for (const f of fs.readdirSync(TRACE_DIR).sort()) {
            if (!f.endsWith('.json')) continue;
            const tr = JSON.parse(fs.readFileSync(path.join(TRACE_DIR, f), 'utf-8'));
            const tokens: string[] = tr.tokens?.used ?? [];
            const fr = new Map<string, number>();
            for (const s of (tr.seedStep ?? [])) {
                const opt = (s.options ?? []).find((o: any) => o.symbol === s.chosen);
                if (opt?.file) fr.set(opt.file, 0);
            }
            for (const w of (tr.walk ?? [])) {
                if (w.chosen == null) continue;
                for (const nf of (w.result?.newFiles ?? [])) {
                    if (!fr.has(nf) || fr.get(nf)! > w.round) fr.set(nf, w.round);
                }
            }
            for (const c of rankCandidates([...fr].map(([f2, round]) => ({ f: f2, round })), tokens).slice(0, TOP_PER_Q)) set.add(c);
        }
    }
    if (fs.existsSync(WIKI_MAP)) {
        const wm = JSON.parse(fs.readFileSync(WIKI_MAP, 'utf-8'));
        for (const k of Object.keys(wm.file_to_pages ?? {})) set.add(k);
    }
    return [...set].sort();
}

const sha1 = (s: string) => crypto.createHash('sha1').update(s).digest('hex');

async function main() {
    const apiKey = process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY;
    if (!apiKey) { console.error('ANTHROPIC_API_KEY (或 CLAUDE_API_KEY) 未设置。'); process.exit(1); }
    const client = new Anthropic({ apiKey });

    const store: Store = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf-8')) : {};
    const targets = targetFiles();
    console.error(`目标集 ${targets.length} 文件（trace top-${TOP_PER_Q} 并集 + wiki-map）`);

    // 读内容 + 哈希，挑出需要（新增或内容变更）的
    const pending: Array<{ rel: string; hash: string; head: string }> = [];
    let missing = 0;
    for (const rel of targets) {
        const abs = path.join(TARGET_SRC_DIR, rel);
        if (!fs.existsSync(abs)) { missing++; continue; }
        const content = fs.readFileSync(abs, 'utf-8');
        const hash = sha1(content);   // 哈希按源文件算（skeleton 随索引重建，缓存失效跟源码走）
        if (store[rel]?.hash === hash) continue;   // 缓存命中
        // 摘要输入优先用索引器的 skeleton（imports+导出签名，浓缩全文件、与行位置无关）——
        // 只看源文件前 N 行会漏"import 一长串、肉在中间"的文件；skeleton 缺失时回退原文件头。
        let head: string;
        try {
            const sk = fs.readFileSync(getOutputPaths(abs).skeletonPath, 'utf-8');
            head = sk.split('\n').slice(0, 35).join('\n');
        } catch {
            head = content.split('\n').slice(0, HEAD_LINES).join('\n');
        }
        pending.push({ rel, hash, head });
    }
    console.error(`缓存命中 ${targets.length - missing - pending.length} · 待生成 ${pending.length} · 磁盘缺失 ${missing}`);
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

    let done = 0;
    const t0 = Date.now();
    const fmt = (sec: number) => sec >= 60 ? `${Math.floor(sec / 60)}分${Math.round(sec % 60)}秒` : `${Math.round(sec)}秒`;
    const totalBatches = Math.ceil(pending.length / BATCH);
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
            // 断点保存：每批次立即落盘——中断/崩溃不丢已完成的；重跑时哈希缓存自动跳过已有条目（断点续传）
            write(store);
            const batchNo = Math.floor(i / BATCH) + 1;
            const elapsed = (Date.now() - t0) / 1000;
            const eta = (elapsed / batchNo) * (totalBatches - batchNo);
            console.error(`  ${Math.min(i + BATCH, pending.length)}/${pending.length} (已落盘 ${Object.keys(store).length} 条 · 已用 ${fmt(elapsed)} · 预计剩余 ${fmt(eta)})`);
        } catch (e: any) {
            console.error(`  批次 ${i} 失败: ${e?.message?.slice(0, 120)}`);
        }
    }
    write(store);
    console.error(`完成：新增/更新 ${done} 条，库存 ${Object.keys(store).length} 条 → data/file-summaries.json · 总耗时 ${fmt((Date.now() - t0) / 1000)}`);
}

function write(store: Store) {
    const sorted: Store = {};
    for (const k of Object.keys(store).sort()) sorted[k] = store[k];
    fs.writeFileSync(OUT, JSON.stringify(sorted, null, 1), 'utf-8');
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
    main().catch(e => { console.error('Fatal:', e); process.exit(2); });
}
