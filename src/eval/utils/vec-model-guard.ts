// vec-model-guard — 向量库的 embedding 模型戳。换模型时自动清空旧向量强制重嵌,
// 防止"旧模型向量 vs 新模型 query 向量"静默混空间(whole-branch review 的 Important）。
// 戳存在 <storePath>.model 旁文件;向量库本身 schema 不变(消费方零改)。
import * as fs from 'fs';

/** 纯判断:有旧戳且与当前模型不同 → 该清空重嵌。首次(无戳)不清。 */
export function shouldReset(prevModel: string | null, currentModel: string): boolean {
    return prevModel !== null && prevModel !== currentModel;
}

/** 加载向量库前调用:若模型变了,删掉旧向量库(下游 existsSync 读到空 → 全量重嵌)。 */
export function guardModel(storePath: string, currentModel: string): void {
    const marker = storePath + '.model';
    let prev: string | null = null;
    try { prev = fs.readFileSync(marker, 'utf-8').trim(); } catch { /* 无戳 = 首次 */ }
    if (shouldReset(prev, currentModel)) {
        console.error(`[embed] embedding 模型变了 (${prev} → ${currentModel}),清空 ${storePath} 强制重嵌。`);
        try { fs.rmSync(storePath, { force: true }); } catch { /* ignore */ }
    }
}

/** 落盘向量库后调用:写当前模型戳。 */
export function stampModel(storePath: string, currentModel: string): void {
    try { fs.writeFileSync(storePath + '.model', currentModel, 'utf-8'); } catch { /* best-effort */ }
}
