// question token 集 + 词面亲和度。全流程（页面匹配/seed 选择/游走方向/停止）共用这一个信号源。
// fuzzysort v3：score ∈ 0..1，无匹配返回 undefined（2026-07-08 实测）。
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
    // 问句模式词：与内容无关但会 fuzzy 撞标题（'work' 0.82 命中 "Development Workflow"，trace 实证 2026-07-08）
    'work', 'works', 'working', 'happen', 'happens', 'happened', 'complete', 'entire',
]);

export function questionTokens(question: string): string[] {
    const raw = question
        .replace(/([a-z])([A-Z])/g, '$1 $2')   // 拆驼峰（问题里出现符号名时）
        .toLowerCase()
        .split(/[^a-z0-9]+/);
    const seen = new Set<string>();
    const out: string[] = [];
    for (const w of raw) {
        if (w.length < 3 || STOPWORDS.has(w) || seen.has(w)) continue;
        seen.add(w);
        out.push(w);
    }
    return out;
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
