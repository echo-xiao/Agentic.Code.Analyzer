import type { StructuralFacts } from '../indexer/structural-facts.js';

export interface LLMFields { role: string; responsibilities: string[]; characteristics: string[]; subsystem_hint: string; }
export interface FileSummary extends StructuralFacts {
  hash: string; role: string; responsibilities: string[]; characteristics: string[];
  subsystem_hint: string; ranking_line: string;
}

export const FILE_SUMMARY_LLM_SCHEMA = {
  type: 'object',
  properties: {
    role: { type: 'string' },
    responsibilities: { type: 'array', items: { type: 'string' } },
    characteristics: { type: 'array', items: { type: 'string' } },
    subsystem_hint: { type: 'string' },
  },
  required: ['role', 'responsibilities', 'characteristics', 'subsystem_hint'],
  additionalProperties: false,
} as const;

export function deriveRankingLine(llm: LLMFields, facts: StructuralFacts): string {
  const parts = [llm.role, ...facts.key_exports, ...llm.characteristics];
  return parts.filter(Boolean).join(' · ').replace(/\s+/g, ' ').trim().slice(0, 200);
}

export function assembleSummary(hash: string, llm: LLMFields, facts: StructuralFacts): FileSummary {
  return {
    hash,
    role: llm.role, responsibilities: llm.responsibilities,
    characteristics: llm.characteristics, subsystem_hint: llm.subsystem_hint,
    ...facts,
    ranking_line: deriveRankingLine(llm, facts),
  };
}
