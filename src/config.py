import os

# Local RC checkout used for indexing + (later) GT verification.
RC_REPO_PATH = os.environ.get("RC_REPO_PATH", "/tmp/analysis/rocketchat")

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
