// 从 gen:mcp 的答案 md 里解析真 agent 的实际调用序列（trace 的对照物，不参与游走逻辑）。
// 行格式由 src/eval/gen.ts:160-163 写出；hitBudget 判定与 report.ts:114 一致（calls >= 8）。
import * as fs from 'fs';
import * as path from 'path';

export interface AgentCall { step: number; tool: string; args: string }
export interface AgentCalls { source: string; verdict: string | null; totalCalls: number; hitBudget: boolean; sequence: AgentCall[] }

const HEADER_RE = /## Tool Calls \((\d+) calls/;
const STEP_RE = /^\*\*Step (\d+):\*\* `(\w+)\((.*)\)` → \d+ tokens$/gm;

export function parseAgentCalls(id: string, answersDir: string, verdictsPath: string): AgentCalls | null {
    const mdPath = path.join(answersDir, `${id}.md`);
    if (!fs.existsSync(mdPath)) return null;
    const txt = fs.readFileSync(mdPath, 'utf-8');
    const header = txt.match(HEADER_RE);
    const totalCalls = header ? +header[1] : 0;
    const sequence: AgentCall[] = [];
    for (const m of txt.matchAll(STEP_RE)) sequence.push({ step: +m[1], tool: m[2], args: m[3] });

    let verdict: string | null = null;
    if (fs.existsSync(verdictsPath)) {
        const v = fs.readFileSync(verdictsPath, 'utf-8');
        const row = v.match(new RegExp(`^\\| ${id.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')} \\| (\\w+) \\|`, 'm'));
        if (row) verdict = row[1];
    }
    return { source: path.join(path.basename(answersDir), `${id}.md`), verdict, totalCalls, hitBudget: totalCalls >= 8, sequence };
}
