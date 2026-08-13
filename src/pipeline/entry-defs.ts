// entry-defs.ts — chain entry on definitions.
//
// This is the ONE place a name still turns into something: question → symbol name → candidate
// definitions. Everywhere else the graph carries resolved ids, so nothing has to be located.
//
// The name-keyed version walked `symbols` (name → files) and something downstream then had to pick
// one file. Here a definition already knows its file, so two same-named definitions are simply two
// candidates and the scoring decides on evidence rather than on glob order.
import { GLOBAL_INDEX } from '../indexer/state.js';
import { isTestDef } from './traverse.js';

export interface DefCandidateSeed {
    defId: string;
    symbol: string;
    file: string;
    kind: string;
}

export interface SeedDef extends DefCandidateSeed {
    score: number;
    // True when the top score is shared. Reported rather than broken silently: a wrong seed is a
    // one-way walk, so the caller should know the choice was arbitrary.
    tied: boolean;
}

export function defsInFiles(files: string[]): DefCandidateSeed[] {
    const wanted = new Set(files);
    const out: DefCandidateSeed[] = [];
    for (const def of GLOBAL_INDEX.defs.values()) {
        if (!wanted.has(def.file)) continue;
        // Every file has a module pseudo-definition; it has no body worth reading and, named by
        // basename in the old index, 59 different index.ts files collided into one symbol.
        if (def.kind === 'module') continue;
        if (isTestDef(def.id)) continue;
        out.push({ defId: def.id, symbol: def.name, file: def.file, kind: def.kind });
    }
    return out.sort((a, b) => a.defId.localeCompare(b.defId));
}

// Enough stemming to survive ordinary English inflection, and no more. Without it a question
// reading "how are messages sent" scored `sendMessage` at zero — `sent` is not `send`, `messages`
// is not `message` — so every candidate tied at zero and the pick fell to defId order.
const STEM: Array<[RegExp, string]> = [
    [/^sent$/, 'send'], [/^sending$/, 'send'],
    [/^made$/, 'make'], [/^got$/, 'get'], [/^built$/, 'build'],
    [/(ies)$/, 'y'], [/(sses|shes|ches|xes)$/, 's'], [/([a-z]{3,})s$/, '$1'],
    [/([a-z]{3,})ed$/, '$1'], [/([a-z]{3,})ing$/, '$1'],
];

const stem = (w: string): string => {
    for (const [re, to] of STEM) if (re.test(w)) return w.replace(re, to);
    return w;
};

const tokensOf = (s: string): string[] =>
    s.split(/[^A-Za-z0-9]+/).flatMap(w => w.split(/(?=[A-Z])/)).filter(Boolean)
        .map(w => stem(w.toLowerCase()));

export function pickSeedDef(candidates: DefCandidateSeed[], question: string): SeedDef | null {
    if (candidates.length === 0) return null;
    const q = new Set(tokensOf(question));

    const scored = candidates.map(c => {
        const toks = tokensOf(c.symbol);
        const hit = toks.filter(t => q.has(t)).length;
        // Precision over recall: a candidate whose every token is in the question beats one that
        // merely contains a matching token among many.
        const score = toks.length === 0 ? 0 : hit / toks.length + hit * 0.01;
        return { ...c, score };
    }).sort((a, b) => b.score - a.score || a.defId.localeCompare(b.defId));

    const top = scored[0];
    const tied = scored.length > 1 && scored[1].score === top.score;
    return { ...top, tied };
}
