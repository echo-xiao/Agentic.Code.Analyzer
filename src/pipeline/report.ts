// Single Chinese-language report per benchmark run: summary table + per-question
// sections (answer -> DeepWiki baseline -> plain-language trace recap).
import type { QuestionTrace } from './types.js';
import type { LossStage } from './attribution.js';

export interface RunRow {
    trace: QuestionTrace; answer: string; fabricated: string[]; deepwiki: string;
    loss: { stage: LossStage; missing: string[]; perFile: Array<{ file: string; stage: LossStage }> };
}
const STAGE_CN: Record<LossStage, string> = { routing: '路由/检索丢', graph: '建图丢', paths: '选路丢', budget: '预算挤掉', hit: '命中', 'wiki-gap': 'wiki层不可达' };

export function renderReport(rows: RunRow[]): string {
    const L: string[] = ['# Benchmark Run Report', '', '| 题号 | 归因 | 缺失文件数 | wiki不可达 | LLM 请求 | 人工判分 |', '|---|---|---|---|---|---|'];
    for (const r of rows) {
        const wikiGapCount = r.loss.perFile.filter(f => f.stage === 'wiki-gap').length;
        L.push(`| ${r.trace.qid} | ${STAGE_CN[r.loss.stage]} | ${r.loss.missing.length} | ${wikiGapCount} | ${r.trace.llm.calls} |  |`);
    }
    const total = rows.reduce((a, r) => a + r.trace.llm.calls, 0);
    L.push('', `合计：${rows.length} 题，${total} 次 LLM 请求。`, '');
    for (const r of rows) {
        L.push(`## ${r.trace.qid}：${r.trace.question}`, '', '### 本系统答案', '', r.answer, '');
        if (r.fabricated.length) L.push(`> 引用校验：以下引用落在材料之外，按虚构处理：${r.fabricated.join('、')}`, '');
        L.push('### DeepWiki 对照答案', '', r.deepwiki, '', '### 过程复盘', '');
        L.push(`- 路由：点名 ${r.trace.routing.sections.map(s => s.sectionId).join('、') || '（无，走纯词法兜底）'}`);
        L.push(`- 入口：top ${r.trace.seeds.length} seed：${r.trace.seeds.slice(0, 5).map(s => `${s.symbol}(rrf ${s.rrf.toFixed(3)})`).join('、')}`);
        L.push(`- 分链：${r.trace.chains.map(c => `链${c.id} ${c.label}(预算${(c.budgetShare * 100).toFixed(0)}%)`).join('、')}`);
        L.push(`- 骨架：${r.trace.skeleton.map(s => `链${s.chainId} ${s.majorCount}正/${s.nodeCount}总`).join('、')}`);
        L.push(`- 选路：勾了 ${r.trace.selectedIds.join('、') || '无'}${r.trace.droppedIds.length ? `；幻觉丢弃 ${r.trace.droppedIds.join('、')}` : ''}`);
        L.push(`- 读取：${r.trace.reading.materials.length} 件材料，${r.trace.reading.materials.reduce((a, m) => a + m.tokens, 0)} token${r.trace.reading.evicted.length ? `；挤掉 ${r.trace.reading.evicted.join('、')}` : ''}`);
        L.push(`- 归因：${STAGE_CN[r.loss.stage]}`);
        for (const f of r.loss.perFile) {
            if (f.stage === 'hit') continue;
            L.push(`  - ${f.file}：${STAGE_CN[f.stage]}`);
        }
        L.push('');
    }
    return L.join('\n');
}
