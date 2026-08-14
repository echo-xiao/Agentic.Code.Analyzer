// One Chinese report per benchmark run. The answer no longer carries the trace (its output
// format is unconstrained now), so everything diagnostic lives here: the skeleton the model
// actually saw, plus a one-line-per-stage recap.
import * as fs from 'fs';
import * as path from 'path';
import type { QuestionTrace } from './types.js';

const REPORT_RE = /^(\d{4}-\d{2}-\d{2})-report-v(\d+)\.md$/;

// Reports are flat files named `<date>-report-v<n>.md`. The version is a single global counter,
// not per-day, so the filenames sort into run order even when several runs land on one date --
// that ordering is the whole point: a report only means something next to the one before it.
export function nextReportPath(runsDir: string, now = new Date()): string {
    const existing = fs.existsSync(runsDir) ? fs.readdirSync(runsDir) : [];
    const maxVersion = existing.reduce((max, name) => {
        const m = name.match(REPORT_RE);
        return m ? Math.max(max, Number(m[2])) : max;
    }, 0);
    const date = now.toISOString().slice(0, 10);
    return path.join(runsDir, `${date}-report-v${maxVersion + 1}.md`);
}

export interface RunRow {
    trace: QuestionTrace;
    answer: string;
    citations: { valid: string[]; fabricated: string[] };
    deepwiki: string;
}

const MODE_CN = { flow: '流程↓', impact: '影响↑' } as const;

// Prefix every major node line with whether its body actually reached the materials -- the
// difference between "the skeleton found it" and "the model got to read it" is the single most
// useful thing to see when a chain underperforms.
function renderSkeletonBlock(t: QuestionTrace): string[] {
    const read = new Set(t.reading.materials.map(m => m.nodeId));
    const out: string[] = ['<details><summary>调用骨架（模型看到的原文；✓ = 函数体已读进材料）</summary>', '', '```'];
    for (const line of t.skeletonText.split('\n')) {
        const m = line.match(/\[(\d+[a-z]+)\]/);
        out.push(m ? (read.has(m[1]) ? `✓ ${line}` : `· ${line}`) : `  ${line}`);
    }
    out.push('```', '', '</details>');
    return out;
}

function renderRecap(t: QuestionTrace): string[] {
    const L: string[] = [];
    L.push(`- 路由：命中 ${t.routing.sections.map(s => s.path).join('、') || '（无）'}`);

    L.push(`- 建池：${t.pools.map(p =>
        `${p.pageId}(${p.sections.length}小节/${p.fileCount}文件/${p.symbolCount}符号)`).join('、') || '（无）'}`);
    const empty = t.pools.filter(p => p.seeds.length === 0);
    if (empty.length) L.push(`  　　　${empty.map(p => p.pageId).join('、')} 池内无词法命中，未建链`);

    L.push(`- 种子：${t.chains.map(c =>
        `链${c.id} ${c.seed.symbol}@${c.seed.file}${c.tied ? '〔并列〕' : ''}${c.rerooted ? `〔上溯定根 ${c.rerooted.from}→${c.rerooted.to}〕` : ''}`
    ).join('、') || '（无链）'}`);

    L.push(`- 分链：${t.chains.map(c => `链${c.id} ${c.label}(${MODE_CN[c.mode]})`).join('、') || '（无）'}`);

    const cd = t.candidates;
    L.push(`- 去冗余：候选 ${cd.expanded}，去掉重复/子集 ${cd.droppedRedundant}，净 ${cd.expanded - cd.droppedRedundant}，取 ${cd.kept}`);

    L.push(`- 骨架：${t.skeleton.map(s =>
        `链${s.chainId} ${s.majorCount}正/${s.nodeCount}总/深${s.maxDepthReached}`).join('、') || '（无）'}`);

    L.push(`- 选链：留 ${t.selection.kept.join('、') || '（无）'}${t.selection.dropped.length ? `；丢 ${t.selection.dropped.join('、')}` : ''}`);

    const tokens = t.reading.materials.reduce((a, m) => a + m.tokens, 0);
    const capped = t.reading.cappedOut ? `；触顶，${t.reading.unread.length} 个未读` : '';
    L.push(`- 读取：骨架 ${t.readIds.length} 个正节点，读进 ${t.reading.materials.length} 件材料，${tokens} token${capped}`);
    return L;
}

export function renderReport(rows: RunRow[]): string {
    const L: string[] = ['# Benchmark Run Report', '', '| 题号 | 链数 | 正节点 | 材料 | token | LLM 请求 | 人工判分 |', '|---|---|---|---|---|---|---|'];
    for (const r of rows) {
        const t = r.trace;
        const tokens = t.reading.materials.reduce((a, m) => a + m.tokens, 0);
        L.push(`| ${t.qid} | ${t.chains.length} | ${t.readIds.length} | ${t.reading.materials.length} | ${tokens} | ${t.llm.calls} |  |`);
    }
    const total = rows.reduce((a, r) => a + r.trace.llm.calls, 0);
    L.push('', `合计：${rows.length} 题，${total} 次 LLM 请求。`, '');

    for (const r of rows) {
        L.push(`## ${r.trace.qid}：${r.trace.question}`, '', '### 本系统答案', '', r.answer, '');
        if (r.citations.fabricated.length) {
            L.push(`> 引用校验（诊断，非约束）：以下引用落在材料之外 —— ${r.citations.fabricated.join('、')}`, '');
        }
        L.push('### DeepWiki 对照答案', '', r.deepwiki, '', '### 过程复盘', '');
        L.push(...renderRecap(r.trace));
        L.push('');
        L.push(...renderSkeletonBlock(r.trace));
        L.push('');
    }
    return L.join('\n');
}
