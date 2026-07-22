// vec-model-guard — embedding-model stamp for a vector store. On a model switch, automatically wipe the
// old vectors to force a re-embed, preventing a silent "old-model vectors vs new-model query vectors"
// space mismatch (flagged Important in the whole-branch review).
// The stamp lives in a sibling file <storePath>.model; the vector store's own schema is unchanged (zero consumer changes).
import * as fs from 'fs';

/** Pure check: an old stamp exists and differs from the current model → should wipe and re-embed. First run (no stamp) does not wipe. */
export function shouldReset(prevModel: string | null, currentModel: string): boolean {
    return prevModel !== null && prevModel !== currentModel;
}

/** Call before loading the vector store: if the model changed, delete the old store (downstream existsSync reads empty → full re-embed). */
export function guardModel(storePath: string, currentModel: string): void {
    const marker = storePath + '.model';
    let prev: string | null = null;
    try { prev = fs.readFileSync(marker, 'utf-8').trim(); } catch { /* no stamp = first run */ }
    if (shouldReset(prev, currentModel)) {
        console.error(`[embed] embedding model changed (${prev} → ${currentModel}), wiping ${storePath} to force re-embed.`);
        try { fs.rmSync(storePath, { force: true }); } catch { /* ignore */ }
    }
}

/** Call after flushing the vector store: write the current model stamp. */
export function stampModel(storePath: string, currentModel: string): void {
    try { fs.writeFileSync(storePath + '.model', currentModel, 'utf-8'); } catch { /* best-effort */ }
}
