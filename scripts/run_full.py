"""Full M2-M4 pipeline runner: build symbol graph -> index RC -> scored eval -> metrics/verdicts.
Run it with:
    uv run --directory /Users/echoooooo/Desktop/code/Agentic.Code.Analyzer python scripts/run_full.py
Each stage prints a banner + progress; the indexing stage shows tqdm bars.
"""
import os, sys, time

PROJ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, PROJ)
from dotenv import load_dotenv
load_dotenv(os.path.join(PROJ, ".env"))

# Quiet the noisy indexing logs so the user sees stage banners + progress bars.
# Keep `backoff` at WARNING so 429 back-off waits ("sleeping ~30s") stay visible.
import logging, warnings
warnings.filterwarnings("ignore")
for _n in ("adalflow", "deepwiki.config", "deepwiki.data_pipeline",
           "deepwiki.google_embedder_client", "httpx", "google", "urllib3"):
    logging.getLogger(_n).setLevel(logging.WARNING)


def banner(m):
    print(f"\n{'='*66}\n  {m}\n{'='*66}", flush=True)


if __name__ == "__main__":
    from src import config
    from src.graph.build_graph import build_graph, save_graph
    from src.indexer.index_repo import index_repo, index_scope
    from src.eval.score import run_scored_eval

    banner("STAGE 1/3  Build symbol graph (tree-sitter)")
    t = time.monotonic()
    g = build_graph(config.RC_REPO_PATH, index_scope())
    save_graph(g, config.GRAPH_PATH)
    print(f"  ✓ graph: {sum(len(v) for v in g.defs.values())} defs, {len(g.defs)} symbols ({time.monotonic()-t:.0f}s)", flush=True)

    banner("STAGE 2/3  Index RC (Gemini embeddings) — scope=" + ("FULL" if config.FULL_SCAN else "M1 subset"))
    pkl = os.path.expanduser(f"~/.adalflow/databases/{config.ADALFLOW_DB_NAME}.pkl")
    if os.path.exists(pkl):
        os.remove(pkl)
    r = index_repo(config.RC_REPO_PATH, index_scope())
    print(f"  ✓ files={r.files_indexed} chunks={r.chunks} empty={r.empty_vectors}", flush=True)

    banner("STAGE 3/3  Scored eval -> metrics.md + verdicts.md (34 questions)")
    res = run_scored_eval()
    passed = sum(1 for x in res if x['verdict'] == 'pass')
    print(f"  ✓ {passed}/{len(res)} pass; wrote logs/eval/metrics.md + verdicts.md", flush=True)

    print("\nDONE.", flush=True)
