// Shared transport for DeepWiki's official MCP endpoint (JSON-RPC 2.0 over HTTP).
// The endpoint may reply with a plain JSON body or a single SSE "data:" line
// (content-type: text/event-stream) — both are handled here.
export const MCP_ENDPOINT = 'https://mcp.deepwiki.com/mcp';

// Call an MCP tool via JSON-RPC 2.0 tools/call and return its text content.
export async function callMcpTool(name: string, args: Record<string, unknown>): Promise<string> {
    const res = await fetch(MCP_ENDPOINT, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            accept: 'application/json, text/event-stream',
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: Date.now(),
            method: 'tools/call',
            params: { name, arguments: args },
        }),
    });
    if (!res.ok) throw new Error(`MCP request for ${name} failed: HTTP ${res.status}`);
    const raw = await res.text();
    const dataLine = raw.split('\n').find(line => line.startsWith('data:'));
    const jsonText = dataLine ? dataLine.slice('data:'.length).trim() : raw.trim();
    const payload = JSON.parse(jsonText);
    if (payload.error) throw new Error(`MCP tool ${name} returned an error: ${JSON.stringify(payload.error)}`);
    const text = payload.result?.content?.[0]?.text;
    if (typeof text !== 'string') throw new Error(`MCP tool ${name} returned no text content`);
    return text;
}
