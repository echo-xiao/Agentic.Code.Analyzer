// Types for the DeepWiki outline used as the v1 routing layer (control/ablation only).
export interface SourceRef { file: string; startLine: number; endLine: number }
// contentPath: repo-relative path to the section's full wiki markdown (written by
// fetch-outline.ts to data/deepwiki/sections/<id>.md), optional because older outline.json
// snapshots (and any section the fetcher couldn't find a content page for) won't have one.
export interface WikiSection { id: string; title: string; blurb: string; sources: SourceRef[]; contentPath?: string }
export interface WikiOutline { repo: string; commit: string; sections: WikiSection[] }
