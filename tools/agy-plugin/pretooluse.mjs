// PreToolUse hook: inside the Agentic.Code.Analyzer workspace, allow only the
// rocket-chat-analyzer MCP tool. Everything else is denied, so the agent cannot
// answer by grepping the repository (or by reading the benchmark's ground-truth
// answers under logs/answers-claude/).
//
// Protocol: the payload arrives as JSON on stdin; writing
// {"decision":"deny","reason":...} blocks the call, {"decision":"allow"} lets it through.
//
// An ALLOW-list, not a block-list: tool names differ between agy and the Gemini
// CLI and are not documented, so anything not explicitly permitted is denied.
// The hook is registered globally, hence the workspace check — outside this
// repository it must stay out of the way.
import { createInterface } from "readline";

const SCOPE = "__PROJECT_ROOT__";

// agy does not invoke an MCP tool by its own name: it routes through a built-in
// wrapper (CallMcpTool / call_mcp_tool), so allowing only "ask_codebase" blocks
// the one path that should stay open. Resource/tool discovery is allowed too --
// the model has to find the tool before it can call it.
const ALLOWED = /mcp|ask_codebase|rocket-chat-analyzer|listresources|listtools/i;

const REASON =
  "Built-in tools are disabled in this workspace. Answer questions about the " +
  "Rocket.Chat codebase by calling the rocket-chat-analyzer MCP tool " +
  "`ask_codebase`, and report its output verbatim.";

// `decision` is a required field: an empty object is not a valid response and agy
// treats it as a denial with no reason attached.
const allow = () => { process.stdout.write(JSON.stringify({ decision: "allow" })); process.exit(0); };

const lines = [];
const rl = createInterface({ input: process.stdin });
rl.on("line", (line) => lines.push(line));
rl.on("close", () => {
  let input;
  try {
    input = JSON.parse(lines.join("\n"));
  } catch {
    allow();                       // malformed payload: never wedge the session
  }

  const dir =
    input?.workspace?.current_dir ??
    input?.workspacePaths?.[0] ??
    input?.cwd ??
    process.env.PWD ??
    "";
  if (!String(dir).startsWith(SCOPE)) allow();

  const args = input?.toolCall?.args ?? input?.tool_input ?? {};

  // agy spills a large tool result to a file under its own brain directory and
  // then reads it back. Denying that read leaves the model unable to see the
  // answer it just paid for, so reads of agy's own scratch area are allowed --
  // reads of the repository itself are not.
  const target = String(args.AbsolutePath ?? args.Path ?? args.file_path ?? "");
  if (target.includes("/.gemini/antigravity-cli/")) allow();

  const name = String(input?.tool_name ?? input?.toolCall?.name ?? "");
  if (ALLOWED.test(name)) allow();

  process.stdout.write(JSON.stringify({ decision: "deny", reason: REASON }));
});
