// 注入的通用开发者意图 taxonomy —— 本文件是全流程唯一"非从代码派生"的知识落点。
export type IntentL1 = 'Understand Internals' | 'Build & Integrate' | 'Reference';

export const TAXONOMY: { l1: IntentL1; label: string; areas: string[] }[] = [
  { l1: 'Understand Internals', label: 'Understand Internals', areas: ['Architecture', 'Subsystem Deep-Dives', 'Dev & Contributing'] },
  { l1: 'Build & Integrate',    label: 'Build & Integrate',    areas: ['Integration Interfaces', 'Embed & Bridge', 'Data & i18n'] },
  { l1: 'Reference',            label: 'Reference',            areas: ['API & Contracts', 'Config & Catalogs', 'Package Index'] },
];

const BY_L1 = new Map(TAXONOMY.map(t => [t.l1, t]));
export function areasOf(l1: IntentL1): string[] { return BY_L1.get(l1)?.areas ?? []; }
export function isValidArea(l1: IntentL1, area: string): boolean { return areasOf(l1).includes(area); }
