#!/usr/bin/env bash
# Install the analyzer-mcp-only plugin into Antigravity CLI (agy).
#
# The plugin registers two things: the rocket-chat-analyzer MCP server, and a
# PreToolUse hook that denies every built-in tool inside this workspace. Without
# the hook the agent answers by grepping the repository -- or by reading the
# benchmark's own ground-truth answers under logs/answers-claude/ -- and never
# reaches the analyzer at all.
#
# The tracked files carry a __PROJECT_ROOT__ placeholder because agy spawns the
# server from an arbitrary directory and needs absolute paths. This script fills
# it in from the checkout location and installs the result.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
SRC="$ROOT/tools/agy-plugin"
DEST="$ROOT/.agents/plugins/analyzer-mcp-only"

command -v agy >/dev/null || { echo "agy not found on PATH"; exit 1; }
[ -x "$ROOT/node_modules/.bin/tsx" ] || { echo "run npm install first (node_modules/.bin/tsx missing)"; exit 1; }

rm -rf "$DEST"
mkdir -p "$DEST"
for f in plugin.json hooks.json mcp_config.json pretooluse.mjs; do
    sed "s|__PROJECT_ROOT__|$ROOT|g" "$SRC/$f" > "$DEST/$f"
done

agy plugin uninstall analyzer-mcp-only >/dev/null 2>&1 || true
agy plugin install "$DEST"

echo
echo "Installed. Restart agy, then ask a question inside $ROOT."
echo "Expect the first built-in tool call to be denied and ask_codebase to run instead."
