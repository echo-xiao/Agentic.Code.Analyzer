// wiki structure schema — self-generated wiki interfaces (centralized here after removing the parser).
// WikiPage carries both the "consumer fields" (page/sections/diagrams/source_files, read by entry-map/wiki; id migration deferred to P4)
// and the §7.1 "planning fields" (id/title/category/scope/modules/seedFiles, filled by the outline step). Convention: page === title.
export interface WikiDiagram { nodes: Record<string, string>; edges: string[][]; subgraphs: string[] }
export interface ProseSection { section: string; text: string; narrative?: string }

// nav tree structure (reader-question-driven top-level navigation; numbering 1/1.1/1.1.1 is computed on the fly by assignNumbers, not persisted).
// section = collapsible group (axis fixes the reading-band order); page = leaf, id == WikiPage.id. Depth <= 4 (L1 intent / L2 area / L3 family / L4 page).
export interface NavNode {
  kind: 'section' | 'page';
  id: string;
  title: string;
  axis?: 'overview' | 'architecture' | 'feature' | 'operations' | 'reference' | 'integrate';
  children?: NavNode[];
}

export interface WikiPage {
  // —— planning fields (§7.1, filled by outline) ——
  id: string;                 // 'system-architecture'
  title: string;              // human-readable title (== page)
  category: string;           // 'Overview' | 'System Architecture' | ... (self-derived)
  scope: string;              // what this chapter covers (brief for the writing agent)
  modules: string[];          // owned moduleIds (from module-graph, hard anchor)
  seedFiles: string[];        // starting files (entry points)
  summary?: string;           // §4 prose-layer addition: Purpose and Scope overview (overlay, not a structural field)
  synthetic?: boolean;        // synthetic page (not module-anchored; modules:[] → neutral in the gate)
  readerQuestions?: string[]; // reader questions answered by a synthetic page/chapter (optional, used as anchor)
  // —— consumer fields (preserved; page===title) ——
  page: string;               // consumer key, == title
  sections: string[];         // §7.3 section names produced by writing
  diagrams: WikiDiagram[];    // §7.4 real-edge rendering
  source_files: Record<string, string[]>; // citation backfill: file → line ranges
}

export interface WikiMap {
  repo: string;
  generated_at: string;
  derived_from: string;       // "self-generated <sha> <date>"
  pages: WikiPage[];
  file_to_pages: Record<string, string[]>; // used by §8 routing
  nav?: NavNode[];            // reader-question-driven top-level navigation tree (optional; when old data has no nav, the frontend falls back to category grouping)
}
