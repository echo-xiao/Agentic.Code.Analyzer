// Mechanical attribution: for each ground-truth core file, find the FIRST pipeline
// stage that lost it. This is the "wiki-routing bad vs codemap bad" instrument.
//
// 'wiki-gap' is a separate axis from the pipeline stages below: it flags core files the
// DeepWiki wiki structurally cannot reach at all (absent from every section's sources AND
// never mentioned in any section's prose). Those are not fixable by improving routing,
// graph-building, path selection, or budgeting — they are unfixable-by-us losses, so they
// must not hide a genuine (fixable) pipeline loss behind worst-stage aggregation.
import type { QuestionTrace } from './types.js';

export type LossStage = 'routing' | 'graph' | 'paths' | 'budget' | 'hit' | 'wiki-gap';
const ORDER: LossStage[] = ['routing', 'graph', 'paths', 'budget', 'hit'];

export function attribute(
    trace: QuestionTrace,
    coreFiles: string[],
    opts: { wikiReachable?: Set<string> } = {},
): { stage: LossStage; missing: string[]; perFile: Array<{ file: string; stage: LossStage }> } {
    const seedFiles = new Set(trace.seeds.map(s => s.file));
    const skeletonFiles = new Set(trace.skeleton.flatMap(s => s.files));
    const materialFiles = new Set(trace.reading.materials.map(m => m.file));
    const selectedFiles = new Set(trace.reading.materials.map(m => m.file));   // selected AND survived budget
    const stageOf = (f: string): LossStage => {
        if (opts.wikiReachable && !opts.wikiReachable.has(f)) return 'wiki-gap';
        if (materialFiles.has(f)) return 'hit';
        if (!seedFiles.has(f) && !skeletonFiles.has(f)) return 'routing';
        if (!skeletonFiles.has(f)) return 'graph';
        if (!selectedFiles.has(f)) return trace.reading.evictedFiles.includes(f) ? 'budget' : 'paths';
        return 'hit';
    };
    const perFile = coreFiles.map(f => ({ file: f, stage: stageOf(f) }));
    const pipelineOnly = perFile.filter(x => x.stage !== 'wiki-gap');
    // Headline = worst stage among files the wiki could actually reach, so a fixable pipeline
    // loss never gets buried under unreachable-by-wiki files. Vacuous cases: no core files at
    // all -> 'hit' (nothing to lose); every core file is wiki-gap -> headline is 'wiki-gap'.
    const worst: LossStage = pipelineOnly.length > 0
        ? pipelineOnly.reduce((w, x) => (ORDER.indexOf(x.stage) < ORDER.indexOf(w) ? x.stage : w), 'hit' as LossStage)
        : (perFile.length > 0 ? 'wiki-gap' : 'hit');
    const missing = perFile.filter(x => x.stage !== 'hit').map(x => x.file);
    return { stage: worst, missing, perFile };
}
