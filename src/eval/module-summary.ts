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
  // Internal edges: downstream relations between member files (approximation: a file's downstream hits another file in the same module)
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
    `Describe the files below as **one subsystem**: entry point → how data flows internally → public interface. Describe the connections using the given edges, **do not list files individually**, and do not invent edges.`,
    `Module: ${input.moduleId} (subsystem ${input.subsystem})`,
    `Core files (by fanIn):`,
    ...input.fileSummaries.slice(0, 20).map(f => `  - ${f.file} [fanIn ${f.fanIn}] ${f.role}`),
    `Internal data-flow edges: ${input.internalEdges.join('; ') || '(few)'}`,
    `Inter-module boundary edges: ${input.boundaryEdges.map(e => `${e[0]}→${e[1]}(${e[2]})`).join(', ') || '(none)'}`,
    `Output the 6 schema fields.`,
  ].join('\n');
}
