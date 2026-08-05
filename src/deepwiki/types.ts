// Types for the DeepWiki outline used as the v1 routing layer (control/ablation only).
export interface SourceRef { file: string; startLine: number; endLine: number }
export interface WikiSection { id: string; title: string; blurb: string; sources: SourceRef[] }
export interface WikiOutline { repo: string; commit: string; sections: WikiSection[] }
