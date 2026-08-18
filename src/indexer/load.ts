// Both entries -- the benchmark loop in src/pipeline/cli.ts and the MCP server in
// src/mcp/server.ts -- start by reading the shards and populating the global index. The two
// differ only in what they do when the index is missing, so the loading itself lives here.
import { readShards, readDispatch, loadGlobalIndex } from './graph-store.js';

// Returns the shard count; 0 means the index has not been built and nothing was loaded.
export function loadIndex(): number {
    const shards = readShards();
    if (shards.length > 0) loadGlobalIndex(shards, readDispatch());
    return shards.length;
}
