import * as fs from 'fs';

export interface PathStep { file: string; symbol: string }

export interface TestCase {
    id: string;
    question: string;
    questionType: string;
    subsystem: string;
    difficulty: string;
    source?: string;
    groundTruthFiles: string[];
    groundTruthPath?: PathStep[];
    keySymbols?: string[];
    // grouped-v1 enrichments
    core?: string[];        // must-find files (the call-chain spine)
    supporting?: string[];  // nice-to-find files (bonus, not penalised if missing)
    ordered?: boolean;      // call-chain order is meaningful for this question
    // injected at load time
    groupId?: string;
}

export interface TestGroup {
    id: string;
    subsystems?: string[];
    subsystem?: string;
    questions: TestCase[];
}

interface GroupedFile { schema?: string; note?: string; groups: TestGroup[] }

/**
 * Loads testcases.json. Supports both the legacy flat array and the new
 * grouped-v1 format ({ groups: [{ id, questions: [...] }] }).
 * Returns groups (each group = an ordered agy session) plus a flattened
 * list (for the per-question automated harnesses).
 */
export function loadTestcases(filePath: string): { groups: TestGroup[]; flat: TestCase[] } {
    const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    if (Array.isArray(raw)) {
        // legacy flat format → one synthetic group
        const flat = raw as TestCase[];
        return { groups: [{ id: 'all', questions: flat }], flat };
    }

    const grouped = raw as GroupedFile;
    const groups = grouped.groups ?? [];
    const flat: TestCase[] = [];
    for (const g of groups) {
        for (const q of g.questions) {
            q.groupId = g.id;
            flat.push(q);
        }
    }
    return { groups, flat };
}
