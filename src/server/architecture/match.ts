// architecture/match.ts — the architecture LAYER's runtime entry (called by plan). Matches the WHOLE
// question against the hand-authored semantic map (subsystems.json: concepts + entry symbols +
// cross-layer flow) and returns the subsystem flow + index-validated seed symbols. This is the
// "where to start" half of plan; dir-map.ts is the structural counterpart. The semantic data
// (concepts/symbols/flows) is hand-authored; the dir-map is derived with the index. Both are the
// architecture layer, distinct from the execution layer (engine: seeds/expand/down/up over the index).
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { GLOBAL_INDEX } from '../../indexer/state.js';

const __dir = path.dirname(fileURLToPath(import.meta.url));
// Each subsystem entry: concepts (natural-language phrases for matching) · symbols (entry symbols to
// seed) · flow (cross-layer mechanism prose delivered to the agent).
const SUBSYSTEMS: Array<{ concepts: string[]; symbols: string[]; flow: string }> = JSON.parse(
    fs.readFileSync(path.resolve(__dir, 'subsystems.json'), 'utf-8')
);

// Concept-token matching for subsystem routing. STOP-list + camelCase split + light stemming.
const ARCH_STOP = new Set(['the', 'a', 'an', 'is', 'are', 'how', 'what', 'where', 'does', 'do', 'in', 'on', 'of', 'to', 'and', 'from', 'for', 'with', 'rocket', 'chat', 'rocketchat', 'work', 'works', 'new', 'get', 'use', 'used', 'using', 'when', 'which', 'system', 'feature']);
const archStem = (w: string): string => {
    if (w === 'sent') return 'send';   // common irregular that skews message-flow routing
    if (w.length > 5 && w.endsWith('ing')) return w.slice(0, -3);
    if (w.length > 4 && w.endsWith('ed')) return w.slice(0, -2);
    if (w.length > 3 && w.endsWith('s')) return w.slice(0, -1);
    return w;
};
const archTok = (s: string): string[] =>
    s.replace(/[-_/.]/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase()
        .split(/\s+/).filter(w => w.length > 2 && !ARCH_STOP.has(w)).map(archStem);
let ARCH_DF: Map<string, number> | null = null;   // concept-token → #subsystems containing it (IDF)
function archDF(): Map<string, number> {
    if (ARCH_DF) return ARCH_DF;
    const df = new Map<string, number>();
    for (const e of SUBSYSTEMS) for (const t of new Set(archTok(e.concepts.join(' ')))) df.set(t, (df.get(t) ?? 0) + 1);
    ARCH_DF = df;
    return df;
}

// Route the WHOLE question to the best-matching subsystem (called by plan). Returns its cross-layer
// flow plus index-validated seedSymbols: entry symbols that are REAL (present in GLOBAL_INDEX.symbols),
// ranked by fan-in centrality — the concrete names to hand the agent so a concept query still lands on
// the right symbol. Stale/renamed names (e.g. canSendMessage) drop out naturally because they aren't
// symbols — the index is the ground truth.
export function routeSubsystem(question: string): { flow: string; seedSymbols: string[] } | null {
    const df = archDF();
    const n = SUBSYSTEMS.length;
    const qtoks = new Set(archTok(question));
    // Score each subsystem by IDF-weighted overlap of the question with its concept phrases. Rare
    // concept tokens (video, ldap, e2e) discriminate; generic ones (message, user) contribute little.
    let best: (typeof SUBSYSTEMS)[number] | null = null, bestScore = 0;
    for (const e of SUBSYSTEMS) {
        let s = 0;
        for (const t of new Set(archTok(e.concepts.join(' ')))) if (qtoks.has(t)) s += Math.log(n / (df.get(t) ?? 1));
        if (s > bestScore) { bestScore = s; best = e; }
    }
    if (!best || bestScore < 1.0) return null;
    const centrality = (sym: string): number => {
        let max = 0;
        for (const p of GLOBAL_INDEX.symbols.get(sym) ?? []) max = Math.max(max, GLOBAL_INDEX.fileDependents.get(p)?.size ?? 0);
        return max;
    };
    const seedSymbols = best.symbols
        .filter(k => GLOBAL_INDEX.symbols.has(k))
        .sort((a, b) => centrality(b) - centrality(a))
        .slice(0, 5);
    return { flow: best.flow, seedSymbols };
}
