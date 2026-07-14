import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { parseAgentCalls } from '../../../src/eval/walker/agent-calls.js';

const MD = `# Q?

## Plan

intent: call-chain

## Gemini Answer

blah

## Tool Calls (2 calls, 4,634 tokens)

**Step 1:** \`plan({"question":"Q?","intent":"call-chain"})\` → 1920 tokens
**Step 2:** \`search({"query":"sendMessage"})\` → 728 tokens

## Files Seen In Tool Results (1)

- \`a.ts\`
`;
const VERDICTS = `# header

| id | verdict | mode | reason |
|---|---|---|---|
| q-x | PASS | — | fine. |
`;

function setup(): { dir: string; vpath: string } {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ac-'));
    fs.writeFileSync(path.join(dir, 'q-x.md'), MD);
    const vpath = path.join(dir, 'verdicts.md');
    fs.writeFileSync(vpath, VERDICTS);
    return { dir, vpath };
}

test('解析调用序列 + verdict + hitBudget', () => {
    const { dir, vpath } = setup();
    const a = parseAgentCalls('q-x', dir, vpath)!;
    assert.equal(a.totalCalls, 2);
    assert.equal(a.hitBudget, false);
    assert.equal(a.verdict, 'PASS');
    assert.deepEqual(a.sequence[0], { step: 1, tool: 'plan', args: '{"question":"Q?","intent":"call-chain"}' });
    assert.equal(a.sequence[1].tool, 'search');
    assert.match(a.source, /^[^/]+\/q-x\.md$/);
});

test('hitBudget=true 当 totalCalls >= 8', () => {
    const { dir, vpath } = setup();
    const mdBudget = `# Q?

## Tool Calls (8 calls, 10,000 tokens)

**Step 1:** \`plan({})\` → 1920 tokens
**Step 2:** \`search({})\` → 728 tokens
**Step 3:** \`tool({})\` → 100 tokens
**Step 4:** \`tool({})\` → 100 tokens
**Step 5:** \`tool({})\` → 100 tokens
**Step 6:** \`tool({})\` → 100 tokens
**Step 7:** \`tool({})\` → 100 tokens
**Step 8:** \`tool({})\` → 100 tokens
`;
    fs.writeFileSync(path.join(dir, 'q-budget.md'), mdBudget);
    const a = parseAgentCalls('q-budget', dir, vpath)!;
    assert.equal(a.totalCalls, 8);
    assert.equal(a.hitBudget, true);
});

test('0-call case: totalCalls=0, sequence=[], hitBudget=false', () => {
    const { dir, vpath } = setup();
    const md0Call = `# Q?

## Tool Calls (0 calls, 0 tokens)

## Files Seen In Tool Results (0)
`;
    fs.writeFileSync(path.join(dir, 'q-zero.md'), md0Call);
    const a = parseAgentCalls('q-zero', dir, vpath)!;
    assert.equal(a.totalCalls, 0);
    assert.deepEqual(a.sequence, []);
    assert.equal(a.hitBudget, false);
});

test('日志缺失返回 null；verdicts 无该题时 verdict=null', () => {
    const { dir, vpath } = setup();
    assert.equal(parseAgentCalls('nope', dir, vpath), null);
    fs.writeFileSync(vpath, '# empty');
    assert.equal(parseAgentCalls('q-x', dir, vpath)!.verdict, null);
});
