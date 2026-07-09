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
        if (w.length < 3 || STOPWORDS.has(w)) continue;   // 原始词先过一遍停用词（works/happens 在表里）
        const t = singularize(w);
        if (t.length < 3 || STOPWORDS.has(t) || seen.has(t)) continue;   // 归一后再过（does→doe 这类漏网）
        seen.add(t);
        out.push(t);
    }
    return out;
}

// 复数轻量归一：fuzzysort 要求 query 每个字符按序出现，'notifications' 的尾 s 会让
// sendPushNotification / "Push Notification Integration" 全部 NO MATCH（实测 2026-07-08，
// claude-01 的双证人被一个字母拦住）。规则从宽到严：ies→y、sses→ss；ss/us/is/os 结尾不动
// （process/status/analysis/photos 类）；其余去尾 s。
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
