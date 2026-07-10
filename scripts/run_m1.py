"""One-shot M1 runner: probe tier -> index RC subset -> answer trace questions -> write report.
Run it with:
    uv run --directory /Users/echoooooo/Desktop/code/Agentic.Code.Analyzer python scripts/run_m1.py
Each stage prints a banner + progress; the indexing stage shows tqdm bars.
"""
import os, sys, time, re

PROJ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, PROJ)
from dotenv import load_dotenv
load_dotenv(os.path.join(PROJ, ".env"))


def banner(msg):
    print(f"\n{'=' * 66}\n  {msg}\n{'=' * 66}", flush=True)


# ---------- Stage 0: tier probe ----------
banner("STAGE 0/3  Checking API tier (paid vs free) — 1 tiny Flash call")
import google.generativeai as genai
genai.configure(api_key=os.environ["GOOGLE_API_KEY"])
try:
    genai.GenerativeModel("gemini-2.5-flash").generate_content("ping")
    print("  ✓ Flash call OK — quota available, proceeding.", flush=True)
except Exception as e:
    s = str(e)
    if "FreeTier" in s or "free_tier" in s:
        print(f"  ⓘ FREE-TIER token (project {os.environ.get('PROJECT_NUMBER')}, key {os.environ['GOOGLE_API_KEY'][:6]}…).", flush=True)
        print("    Running WITH patient backoff: embedding + generation honor the server retry_delay (~30s waits).", flush=True)
        print("    => This is SLOW but free. To go fast, use a standard AIza… key from a billed project.", flush=True)
    else:
        print(f"  ! 429 (not free-tier-labeled) — continuing with backoff. [{type(e).__name__}]", flush=True)

# ---------- Stage 1: index ----------
banner("STAGE 1/3  Indexing Rocket.Chat subset with Gemini embeddings")
from src import config
print(f"  subset = {config.M1_INCLUDED_DIRS}", flush=True)
pkl = os.path.expanduser(f"~/.adalflow/databases/{config.ADALFLOW_DB_NAME}.pkl")
if os.path.exists(pkl):
    os.remove(pkl)
    print(f"  cleared stale index: {pkl}", flush=True)
from src.indexer.index_repo import index_repo
t0 = time.monotonic()
r = index_repo(config.RC_REPO_PATH, config.M1_INCLUDED_DIRS)
print(f"  ✓ indexed: files={r.files_indexed} chunks={r.chunks} empty_vectors={r.empty_vectors}  ({time.monotonic() - t0:.0f}s)", flush=True)
if r.empty_vectors:
    print(f"  ⚠ {r.empty_vectors}/{r.chunks} chunks have EMPTY vectors (rate-limited) — retrieval will be degraded.", flush=True)

# ---------- Stage 2: answer trace questions ----------
banner("STAGE 2/3  Answering trace questions (Gemini Flash)")
from src.qa.ask import ask
from src.eval.trace_run import build_trace, write_report
QIDS = ["new-17-slash-commands", "new-16-impact-streamer", "new-10-apps-engine"]
import json
tc = json.load(open(os.path.join(PROJ, "src/eval/utils/testcases.json")))
qmap = {q["id"]: q for g in tc["groups"] for q in g["questions"]}
traces = []
for i, qid in enumerate(QIDS, 1):
    q = qmap[qid]
    print(f"  [{i}/{len(QIDS)}] {qid}: {q['question']}", flush=True)
    t = time.monotonic()
    ans = ask(q["question"], docs=r.docs, top_k=config.TOP_K)
    traces.append(build_trace(q, ans))
    print(f"       → {len(ans.contexts)} hits, cites={ans.citations[:4]}  ({time.monotonic() - t:.0f}s)", flush=True)

# ---------- Stage 3: report ----------
banner("STAGE 3/3  Writing logs/eval/trace.jsonl + trace-report.md")
write_report(traces)
print(f"  ✓ wrote {PROJ}/logs/eval/trace.jsonl and trace-report.md", flush=True)
print("\nDONE.", flush=True)
