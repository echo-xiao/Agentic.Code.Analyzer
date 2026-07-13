// wiki 结构 schema —— 自生成 wiki 接口（去解析器后集中于此）。
// WikiPage 同时承载"消费字段"(page/sections/diagrams/source_files，entry-map/wiki 在读，P4 才迁 id)
// 与 §7.1 "计划字段"(id/title/category/scope/modules/seedFiles，outline 步填)。约定 page===title。
export interface WikiDiagram { nodes: Record<string, string>; edges: string[][]; subgraphs: string[] }
export interface ProseSection { section: string; text: string; narrative?: string }

// nav 树结构(读者问题驱动的顶层导航;编号 1/1.1/1.1.1 由 assignNumbers 现算,不落库)。
// section = 可折叠分组(axis 定阅读带序);page = 叶子,id == WikiPage.id。深度 ≤ 4（L1 意图 / L2 区 / L3 家族 / L4 页）。
export interface NavNode {
  kind: 'section' | 'page';
  id: string;
  title: string;
  axis?: 'overview' | 'architecture' | 'feature' | 'operations' | 'reference' | 'integrate';
  children?: NavNode[];
}

export interface WikiPage {
  // —— 计划字段（§7.1 outline 填）——
  id: string;                 // 'system-architecture'
  title: string;              // 人读标题（== page）
  category: string;           // 'Overview' | 'System Architecture' | ...（自派生）
  scope: string;              // 这章讲什么（写作 agent 的 brief）
  modules: string[];          // 负责的 moduleId（来自 module-graph，硬锚）
  seedFiles: string[];        // 起点文件（入口）
  summary?: string;           // §4 prose 层新增：Purpose and Scope 总述（叠加，不进结构字段）
  synthetic?: boolean;        // 合成页（非模块锚定；modules:[] → gate 中性）
  readerQuestions?: string[]; // 合成页/章回答的读者问题（可选，做锚）
  // —— 消费字段（保留；page===title）——
  page: string;               // 消费方 key，== title
  sections: string[];         // §7.3 写作产出的小节名
  diagrams: WikiDiagram[];    // §7.4 真实边渲染
  source_files: Record<string, string[]>; // 引用回填 file→行范围
}

export interface WikiMap {
  repo: string;
  generated_at: string;
  derived_from: string;       // "self-generated <sha> <date>"
  pages: WikiPage[];
  file_to_pages: Record<string, string[]>; // §8 路由用
  nav?: NavNode[];            // 读者问题驱动的顶层导航树（可选；旧数据无 nav 时前端回退 category 分组）
}
