// Claude-derived ground truth: types, JSON IO, and the overlay that swaps a TestCase's answer-spine
// (core/supporting/groundTruthPath/keySymbols) for one extracted from the answers-claude gold answers.
// Question metadata (question/type/subsystem/difficulty/ordered) is preserved from testcases.json.
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { loadTestcases, type TestCase, type TestGroup } from './load-testcases.js';

export interface TruthStep { file: string; symbol: string; }
export interface ClaudeTruth { core: string[]; supporting: string[]; chain: TruthStep[]; keySymbols: string[]; }
export type ClaudeTruthMap = Record<string, ClaudeTruth | undefined>;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const TESTCASES_PATH = path.join(__dirname, 'testcases.json');
export const CLAUDE_TRUTH_PATH = path.join(__dirname, 'claude-truth.json');

/** Body of the `## Answer` section, up to the next `## ` heading or EOF; whole file if the heading is absent. */
export function extractAnswerSection(md: string): string {
    const lines = md.split('\n');
    const start = lines.findIndex(l => l.trim() === '## Answer');
    if (start === -1) return md.trim();
    const rest = lines.slice(start + 1);
    const end = rest.findIndex(l => /^##\s/.test(l));
    return (end === -1 ? rest : rest.slice(0, end)).join('\n').trim();
}

export function readClaudeTruth(p: string): ClaudeTruthMap {
    return JSON.parse(fs.readFileSync(p, 'utf-8')) as ClaudeTruthMap;
}

export function writeClaudeTruth(map: ClaudeTruthMap, p: string): void {
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, JSON.stringify(map, null, 2), 'utf-8');
}

export function attachTruth(tc: TestCase, truth: ClaudeTruth): TestCase {
    return {
        ...tc,
        core: truth.core,
        supporting: truth.supporting,
        groundTruthFiles: Array.from(new Set([...truth.core, ...truth.supporting])),
        groundTruthPath: truth.chain,
        keySymbols: truth.keySymbols,
    };
}

export function loadTestcasesWithTruth(tcPath: string, truthPath: string): { groups: TestGroup[]; flat: TestCase[] } {
    const { groups, flat } = loadTestcases(tcPath);
    const truth: ClaudeTruthMap = fs.existsSync(truthPath) ? readClaudeTruth(truthPath) : {};
    // Join by id: question from testcases, spine from claude-truth. No fallback — a question with no
    // claude-truth entry can't be deterministically scored, so WARN and exclude it.
    const kept = flat.filter(tc => {
        if (truth[tc.id]) return true;
        console.error(`WARN: no claude-truth for ${tc.id} — excluded from the deterministic eval`);
        return false;
    });
    const flatAttached = kept.map(tc => attachTruth(tc, truth[tc.id]!));
    const byId = new Map(flatAttached.map(tc => [tc.id, tc]));
    const groupsAttached = groups.map(g => ({ ...g, questions: g.questions.filter(q => byId.has(q.id)).map(q => byId.get(q.id)!) }));
    return { groups: groupsAttached, flat: flatAttached };
}
