// 注入的通用开发者意图 taxonomy —— 本文件是全流程唯一"非从代码派生"的知识落点。
export type IntentL1 = 'Understand Internals' | 'Build & Integrate' | 'Reference';

export const TAXONOMY: { l1: IntentL1; label: string; areas: string[] }[] = [
  { l1: 'Understand Internals', label: '理解内部', areas: ['全局架构', '子系统深潜', '开发与贡献'] },
  { l1: 'Build & Integrate',    label: '构建与集成', areas: ['集成接口', '嵌入与桥接', '数据与本地化'] },
  { l1: 'Reference',            label: '参考速查', areas: ['API 与契约', '配置与清单', '包目录'] },
];

const BY_L1 = new Map(TAXONOMY.map(t => [t.l1, t]));
export function areasOf(l1: IntentL1): string[] { return BY_L1.get(l1)?.areas ?? []; }
export function isValidArea(l1: IntentL1, area: string): boolean { return areasOf(l1).includes(area); }
