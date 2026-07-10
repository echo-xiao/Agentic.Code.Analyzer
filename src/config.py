import os

# Local RC checkout used for indexing + GT verification.
# Pinned to the stable Desktop working copy (commit 4235cd9, 2026-03-27): the
# ground-truth answers in logs/answers-claude were authored against this version
# (75% of GT-cited files exist here vs 62% in a fresh 2026-07-09 clone), and its
# path contains no component that DEFAULT_EXCLUDED_DIRS would match (a /tmp/* path
# self-excludes every file in deepwiki's exclusion mode).
RC_REPO_PATH = os.environ.get("RC_REPO_PATH", "/Users/echoooooo/Desktop/code/Rocket.Chat")

EMBEDDER_TYPE = "google"          # -> configs["embedder_google"] -> gemini-embedding-001
GEN_MODEL = "gemini-2.5-flash"    # free-tier generation
TOP_K = 20                        # retrieval depth (matches deepwiki default)

# M1 scope: a verified subset that covers several testcase subsystems
# (slash commands live under apps/meteor/app/utils/server; apps-engine + core-services in packages).
M1_INCLUDED_DIRS = [
    "packages/apps-engine",
    "packages/core-services",
    "packages/models",
    "apps/meteor/app/utils/server",
    "apps/meteor/server/modules/streamer",
]

# LocalDB is keyed by the repo dir basename; RC checkout basename is "rocketchat".
ADALFLOW_DB_NAME = os.path.basename(RC_REPO_PATH.rstrip("/"))

# M2+ config: graph building, full-scan mode, and judge/Claude models
JUDGE_MODEL = "gemini-2.5-flash"
CLAUDE_MODEL = "claude-opus-4-8"          # Claude for offline preprocessing (has CLAUDE_API_KEY)
FULL_SCAN = os.environ.get("RC_FULL_SCAN", "") == "1"   # off by default; M1 subset unless set
GRAPH_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "graph.json")
