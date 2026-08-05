// Shared transport for DeepWiki's official MCP endpoint (JSON-RPC 2.0 over HTTP).
// The endpoint may reply with a plain JSON body or Server-Sent Events (multiple
// "data:" lines, e.g. progress/notification frames followed by the actual
// tools/call result) — both are handled here.
export const MCP_ENDPOINT = 'https://mcp.deepwiki.com/mcp';

// Parse an MCP HTTP response body into the joined text of its result content.
// Exported as a pure function so response-shape edge cases can be unit tested
// without a live network call.
//
// SSE bodies can carry several "data:" lines (e.g. a notification frame before
// the actual JSON-RPC result), so every line is parsed and the first one that
// looks like a JSON-RPC response (has `result` or `error`) is used — not just
// the first "data:" line. A `result.content` array can hold several text
// items; all of them are joined, not just the first.
export function parseMcpResponse(bodyText: string, toolName: string): string {
    const dataLines = bodyText.split('\n').filter(line => line.startsWith('data:'));
    const candidateTexts = dataLines.length > 0
        ? dataLines.map(line => line.slice('data:'.length).trim())
        : [bodyText.trim()];

    let payload: any;
    for (const candidateText of candidateTexts) {
        if (!candidateText) continue;
        let parsed: any;
        try { parsed = JSON.parse(candidateText); } catch { continue; }
        if (parsed && (parsed.result !== undefined || parsed.error !== undefined)) {
            payload = parsed;
            break;
        }
    }
    if (payload === undefined) {
        throw new Error(`MCP tool ${toolName} returned an unparseable response: ${bodyText.slice(0, 300)}`);
    }
    if (payload.error) {
        throw new Error(`MCP tool ${toolName} returned an error: ${JSON.stringify(payload.error)}`);
    }

    const content = payload.result?.content;
    const text = Array.isArray(content)
        ? content
            .filter((c: any) => c && (c.type === 'text' || typeof c.text === 'string'))
            .map((c: any) => c.text)
            .join('\n')
        : '';
    if (!text) {
        throw new Error(`MCP tool ${toolName} returned no text content: ${JSON.stringify(payload).slice(0, 300)}`);
    }
    return text;
}

// Call an MCP tool via JSON-RPC 2.0 tools/call and return its joined text content.
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
    return parseMcpResponse(raw, name);
}
