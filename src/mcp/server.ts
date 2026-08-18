#!/usr/bin/env npx tsx
// stdio MCP entry. One tool, one question per call, three Gemini requests inside -- the same
// pipeline the benchmark runs, reached from a second door.
//
// stdout belongs to the JSON-RPC framing: every diagnostic here goes to stderr. A single stray
// console.log would corrupt the protocol stream.
import '../eval/utils/load-env.js';   // side effect: .env -> process.env, before GeminiClient reads the key
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { loadIndex } from '../indexer/load.js';
import { loadAllSections } from '../deepwiki/sections.js';
import { runQuestion } from '../pipeline/run.js';
import { GeminiClient } from '../pipeline/llm.js';
import { createSerialQueue } from './queue.js';
import { preflightMessage } from './preflight.js';
import { formatToolResult } from './format.js';

// Same throttle constant as the benchmark loop: one question's three requests, then a pause.
const SPACING_MS = 6000;

const shardCount = loadIndex();
const blocked = preflightMessage(shardCount, process.env.GEMINI_API_KEY);
// The index and the wiki sections are read once and stay resident (~50M, the same as one
// benchmark run). Loading them per call would re-read every shard for every question.
const sections = blocked ? [] : loadAllSections();
console.error(blocked ? `mcp: not ready -- ${blocked}` : `mcp: ready, ${shardCount} shards, ${sections.length} sections`);

const enqueue = createSerialQueue(SPACING_MS);
let seq = 0;

const server = new McpServer({ name: 'rocket-chat-code-analyzer', version: '2.0.0' });

server.registerTool(
    'ask_codebase',
    {
        title: 'Ask the Rocket.Chat codebase',
        description:
            'Answer a question about the Rocket.Chat codebase -- where something lives, how a '
            + 'mechanism works, what crosses subsystems. Returns prose with file:line citations. '
            + 'One call costs three LLM requests and takes tens of seconds; calls are queued and '
            + 'run one at a time.',
        inputSchema: { question: z.string().min(1).describe('A natural-language question about the Rocket.Chat codebase.') },
    },
    async ({ question }) => {
        if (blocked) return { content: [{ type: 'text' as const, text: blocked }], isError: true };
        return enqueue(async () => {
            const qid = `mcp-${++seq}`;
            console.error(`[${qid}] ${question}`);
            try {
                // No deepwikiFn: the baseline is the benchmark report's comparison column.
                const row = await runQuestion(qid, question, { llm: new GeminiClient(), sections });
                const text = formatToolResult(row.answer, row.trace.reading.materials);
                return { content: [{ type: 'text' as const, text }] };
            } catch (e) {
                const text = `Failed to answer: ${e instanceof Error ? e.message : String(e)}`;
                console.error(`[${qid}] ${text}`);
                return { content: [{ type: 'text' as const, text }], isError: true };
            }
        });
    },
);

await server.connect(new StdioServerTransport());
