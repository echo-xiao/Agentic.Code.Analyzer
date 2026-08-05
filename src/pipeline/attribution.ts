// Mechanical attribution: for each ground-truth core file, find the FIRST pipeline
// stage that lost it. This is the "wiki-routing bad vs codemap bad" instrument.
import type { QuestionTrace } from './types.js';

export type LossStage = 'routing' | 'graph' | 'paths' | 'budget' | 'hit';
const ORDER: LossStage[] = ['routing', 'graph', 'paths', 'budget', 'hit'];

export function attribute(trace: QuestionTrace, coreFiles: string[]): { stage: LossStage; missing: string[] } {
    const seedFiles = new Set(trace.seeds.map(s => s.file));
    const skeletonFiles = new Set(trace.skeleton.flatMap(s => s.files));
    const materialFiles = new Set(trace.reading.materials.map(m => m.file));
    const selectedFiles = new Set(trace.reading.materials.map(m => m.file));   // selected AND survived budget
    const stageOf = (f: string): LossStage => {
        if (materialFiles.has(f)) return 'hit';
        if (!seedFiles.has(f) && !skeletonFiles.has(f)) return 'routing';
        if (!skeletonFiles.has(f)) return 'graph';
        if (!selectedFiles.has(f)) return trace.reading.evicted.length ? 'budget' : 'paths';
        return 'hit';
    };
    const per = coreFiles.map(f => ({ f, stage: stageOf(f) }));
    const worst = per.reduce((w, x) => (ORDER.indexOf(x.stage) < ORDER.indexOf(w) ? x.stage : w), 'hit' as LossStage);
    return { stage: worst, missing: per.filter(x => x.stage !== 'hit').map(x => x.f) };
}
