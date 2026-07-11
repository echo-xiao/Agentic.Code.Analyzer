// wiki 结构 schema —— 自生成沿用（原 DeepWiki 解析器的接口，去解析器后集中于此）。
// WikiPage 同时承载"消费字段"(page/sections/diagrams/source_files，entry-map/wiki 在读，P4 才迁 id)
// 与 §7.1 "计划字段"(id/title/category/scope/modules/seedFiles，outline 步填)。约定 page===title。
export interface WikiDiagram { nodes: Record<string, string>; edges: string[][]; subgraphs: string[] }
export interface ProseSection { section: string; text: string }

export interface WikiPage {
  // —— 计划字段（§7.1 outline 填）——
  id: string;                 // 'system-architecture'
  title: string;              // 人读标题（== page）
  category: string;           // 'Overview' | 'System Architecture' | ...（自派生）
  scope: string;              // 这章讲什么（写作 agent 的 brief）
  modules: string[];          // 负责的 moduleId（来自 module-graph，硬锚）
  seedFiles: string[];        // 起点文件（入口）
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
}
