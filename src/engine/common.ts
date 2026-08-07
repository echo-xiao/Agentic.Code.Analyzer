// Shared path helper over the index. The rest of this module (layer filters, edge labels,
// root-file picking, import-distance BFS) served the retired graph-navigation engine
// (up/down/expand/seeds) and went with it; only relPath outlived that engine.

// Repo-relative path from an absolute one — the convention every index map and every
// pipeline type uses for `file`.
export function relPath(p: string): string {
    return p.split('Rocket.Chat/')[1] || p;
}
