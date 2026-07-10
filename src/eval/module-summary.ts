export interface ModuleSummaryInput {
  moduleId: string; subsystem: string;
  fileSummaries: Array<{ file: string; role: string; fanIn: number; key_exports: string[] }>;
  internalEdges: string[]; boundaryEdges: Array<[string, string, number]>;
}

export const MODULE_SUMMARY_SCHEMA = {
  type: 'object',
  properties: {
    overview: { type: 'string' },
    keyComponents: { type: 'array', items: { type: 'object', properties: { name: {type:'string'}, file: {type:'string'}, role: {type:'string'} }, required: ['name','file','role'], additionalProperties: false } },
    internalFlow: { type: 'array', items: { type: 'string' } },
    publicInterface: { type: 'array', items: { type: 'string' } },
    dependencies: { type: 'array', items: { type: 'string' } },
    crossLayer: { type: 'array', items: { type: 'string' } },
  },
  required: ['overview','keyComponents','internalFlow','publicInterface','dependencies','crossLayer'],
  additionalProperties: false,
} as const;

export function assembleModuleInput(mod: any, fileSummaries: Record<string, any>, graph: any): ModuleSummaryInput {
  const files = (mod.files ?? []).map((f: string) => {
    const fs = fileSummaries[f];
    return fs ? { file: f, role: fs.role ?? '', fanIn: fs.fanIn ?? 0, key_exports: fs.key_exports ?? [] } : { file: f, role: '', fanIn: 0, key_exports: [] };
  }).sort((a: any, b: any) => b.fanIn - a.fanIn);
  // 内部边:成员文件间的 downstream 关系(近似:某文件 downstream 命中同模块另一文件)
  const memberSet = new Set(mod.files ?? []);
  const internalEdges: string[] = [];
  for (const f of (mod.files ?? [])) {
    const fs = fileSummaries[f];
    for (const d of (fs?.downstream ?? [])) if (memberSet.has(d)) internalEdges.push(`${d} → ${f}`);
  }
  return { moduleId: mod.id, subsystem: mod.subsystem, fileSummaries: files, internalEdges: internalEdges.slice(0, 30), boundaryEdges: mod.edges ?? [] };
}

export function buildModulePrompt(input: ModuleSummaryInput): string {
  return [
    `把下面这些文件当**一个子系统**描述:入口 → 内部如何流转 → 对外接口。用给定的边描述连接,**不要逐个列文件**,禁止发明边。`,
    `模块: ${input.moduleId}(子系统 ${input.subsystem})`,
    `核心文件(按 fanIn):`,
    ...input.fileSummaries.slice(0, 20).map(f => `  - ${f.file} [fanIn ${f.fanIn}] ${f.role}`),
    `内部数据流边: ${input.internalEdges.join('; ') || '(少)'}`,
    `模块间边界边: ${input.boundaryEdges.map(e => `${e[0]}→${e[1]}(${e[2]})`).join(', ') || '(无)'}`,
    `输出 schema 的 6 个字段。`,
  ].join('\n');
}
