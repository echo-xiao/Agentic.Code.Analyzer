// question token set + lexical affinity. The whole pipeline (page matching / seed selection / walk direction / stopping) shares this single signal source.
// fuzzysort v3: score ∈ 0..1, returns undefined on no match (measured 2026-07-08).
import fuzzysort from 'fuzzysort';

const STOPWORDS = new Set([
    'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
    'how', 'what', 'when', 'where', 'which', 'who', 'why', 'does', 'do', 'did',
    'can', 'could', 'should', 'would', 'will', 'shall', 'may', 'might',
    'in', 'on', 'at', 'to', 'of', 'for', 'with', 'by', 'from', 'as', 'into',
    'and', 'or', 'not', 'no', 'it', 'its', 'this', 'that', 'these', 'those',
    'after', 'before', 'about', 'between', 'through', 'during', 'via',
    'i', 'you', 'we', 'they', 'he', 'she', 'my', 'your', 'our', 'their',
    'there', 'here', 'then', 'than', 'so', 'if', 'else', 'each', 'all', 'any', 'some',
    // Question-pattern words: content-irrelevant but fuzzy-collide with titles ('work' scores 0.82 against "Development Workflow", trace evidence 2026-07-08)
    'work', 'works', 'working', 'happen', 'happens', 'happened', 'complete', 'entire',
]);

export function questionTokens(question: string): string[] {
    const raw = question
        .replace(/([a-z])([A-Z])/g, '$1 $2')   // split camelCase (when a symbol name appears in the question)
        .toLowerCase()
        .split(/[^a-z0-9]+/);
    const seen = new Set<string>();
    const out: string[] = [];
    for (const w of raw) {
        if (w.length < 3 || STOPWORDS.has(w)) continue;   // filter the raw word against stopwords first (works/happens are in the set)
        const t = singularize(w);
        if (t.length < 3 || STOPWORDS.has(t) || seen.has(t)) continue;   // filter again after normalization (catches leaks like does→doe)
        seen.add(t);
        out.push(t);
    }
    return out;
}

// Lightweight plural normalization: fuzzysort requires every query character to appear in order, so the
// trailing s of 'notifications' makes sendPushNotification / "Push Notification Integration" all NO MATCH
// (measured 2026-07-08, claude-01's two witnesses blocked by a single letter). Rules from loose to strict:
// ies→y, sses→ss; leave ss/us/is/os endings untouched (process/status/analysis/photos family); otherwise drop the trailing s.
function singularize(w: string): string {
    if (w.length <= 3) return w;
    if (w.endsWith('ies')) return w.slice(0, -3) + 'y';
    if (w.endsWith('sses')) return w.slice(0, -2);
    if (w.endsWith('ss') || w.endsWith('us') || w.endsWith('is') || w.endsWith('os')) return w;
    if (w.endsWith('s')) return w.slice(0, -1);
    return w;
}

export function scoreString(tokens: string[], target: string): number {
    let best = 0;
    for (const t of tokens) {
        const r = fuzzysort.single(t, target);
        if (r && r.score > best) best = r.score;
    }
    return best;
}

export function bestAffinity(tokens: string[], candidates: string[]): number {
    let best = 0;
    for (const c of candidates) {
        const s = scoreString(tokens, c);
        if (s > best) best = s;
    }
    return best;
}
