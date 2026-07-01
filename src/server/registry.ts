// registry — MCP adapter only: tool schemas + dispatch + call metering. All behavior lives in
// tools/ (one tool per file) and engine/ (one algorithm per file).
import { trackCall } from './session.js';
import { runPlan } from './tools/plan.js';
import { runSearch } from './tools/search.js';
import { runGraph } from './tools/graph.js';
import { runDetails } from './tools/details.js';

export const TOOL_DEFINITIONS = [
    {
        name: "plan",
        description: "Step 0 — Declare what kind of question you are answering. Returns the recommended strategy and the default graph move/depth for that question type. Call once, before searching.",
        inputSchema: {
            type: "object",
            properties: {
                question: { type: "string", description: "The user's question, verbatim" },
                intent: { type: "string", enum: ["architecture", "call-chain", "locate", "pattern", "routing", "impact"], description: "Override the classification if you already know the question type" },
            },
            required: ["question"]
        }
    },
    {
        name: "search",
        description: "Step 1 — Find entry-point seeds by name. Exact symbol lookup, file-path fragment match, plus full-text grep for call patterns (e.g. 'sdk.call', 'API.v1.addRoute'). Pass `layer` when the question specifies client/server/packages/ee. Returns locations only — use graph to explore from a seed.",
        inputSchema: {
            type: "object",
            properties: {
                query: { type: "string", description: "Symbol name or call pattern (e.g. 'sendMessage', 'sdk.call', 'Meteor.methods')" },
                layer: { type: "string", enum: ["client", "server", "packages", "ee"], description: "Restrict results to this layer. Pass when the user specifies client/server/UI/backend." }
            },
            required: ["query"]
        }
    },
    {
        name: "graph",
        description: "Step 2 — Traverse the dependency graph from a seed. move='expand' returns the ranked subsystem neighborhood (best for architecture/routing/locate/pattern), move='down' the ordered callee tree (call chains), move='up' the layered dependents / blast radius (impact). Omit move to use the default from plan. Includes string-dispatch edges (events, pubsub, REST, streams) that imports can't see.",
        inputSchema: {
            type: "object",
            properties: {
                query: { type: "string", description: "Symbol name or event name to start from" },
                move: { type: "string", enum: ["expand", "down", "up"], description: "expand=ranked neighborhood map, down=callees in call order, up=callers/dependents layer by layer" },
                depth: { type: "number", description: "Max hops (default from plan; expand 1-3, down/up 4-6; max 6)" },
                layer: { type: "string", enum: ["client", "server", "packages", "ee"], description: "Restrict to this layer." },
                file: { type: "string", description: "Pin the traversal root when the symbol has multiple definitions (collisions like 'Streamer', 'sendMessage'). Pass the exact file path from search results. Omit to auto-pick the most-imported definition." },
                edgeTypes: {
                    type: "array",
                    items: { type: "string", enum: ["call", "jsx", "new", "event_emit", "event_listen", "pubsub_publish", "pubsub_subscribe", "rest_call", "rest_route", "stream_def", "stream_sub", "type"] },
                    description: "Filter to specific edge types. Default: all. Example: ['call','event_listen'] to only traverse direct calls and event listeners."
                },
            },
            required: ["query"]
        }
    },
    {
        name: "details",
        description: "Step 3 — Read source. For functions/variables: returns full source. For classes: returns method signatures (skeleton) — use `symbolName='ClassName.methodName'` to read a specific method's full source. Expensive: call on the 1-2 key symbols only, after search/graph has located them. `filename` is REQUIRED.",
        inputSchema: {
            type: "object",
            properties: {
                symbolName: { type: "string", description: "Symbol name (e.g. 'sendMessage') or class method (e.g. 'RoomService.createRoom')" },
                filename: { type: "string", description: "REQUIRED: exact file path from search/graph results" }
            },
            required: ["symbolName", "filename"]
        }
    }
];

const HANDLERS: Record<string, (args: any) => string> = {
    plan: runPlan,
    search: runSearch,
    graph: runGraph,
    details: runDetails,
};

export async function handleToolCall(name: string, args: any): Promise<any> {
    const handler = HANDLERS[name];
    if (!handler) return err(`Unknown tool: ${name}`);
    const text = handler(args ?? {});
    trackCall(name, text, args?.query ?? args?.symbolName);
    if (text.startsWith('Missing parameter')) return err(text);
    return ok(text);
}

function ok(text: string) { return { content: [{ type: "text", text }] }; }
function err(text: string) { return { content: [{ type: "text", text }], isError: true }; }
