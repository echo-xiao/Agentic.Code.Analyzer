import os
import json

from src.graph.parser import parse_file
from src.graph.symbol_graph import SymbolGraph

_EXTS = (".ts", ".tsx", ".js", ".jsx")
_SKIP = frozenset(("node_modules", "dist", "build", ".git", "__tests__"))
_SKIP_SUFFIXES = (".spec.ts", ".test.ts", ".spec.tsx", ".test.tsx",
                  ".spec.js", ".test.js", ".d.ts")


def _included(rel: str, included_dirs: list[str]) -> bool:
    """Return True if rel's path components contain any included_dir's components
    as a contiguous subsequence (same semantics as the M1 deepwiki indexer fix).

    e.g. included_dirs=["packages/apps-engine"] matches
         "packages/apps-engine/src/x.ts" but NOT "packages/other/x.ts".
    """
    rel_parts = rel.replace("\\", "/").split("/")
    for inc in included_dirs:
        inc_parts = inc.strip("/").split("/")
        n = len(inc_parts)
        # slide a window of length n over rel_parts
        for i in range(len(rel_parts) - n + 1):
            if rel_parts[i : i + n] == inc_parts:
                return True
    return False


def _iter_files(repo_path: str, included_dirs):
    for root, dirs, files in os.walk(repo_path):
        # prune skip dirs in-place so os.walk won't descend into them
        dirs[:] = [d for d in dirs if d not in _SKIP]
        for fn in files:
            if not fn.endswith(_EXTS):
                continue
            if any(fn.endswith(s) for s in _SKIP_SUFFIXES):
                continue
            full = os.path.join(root, fn)
            rel = os.path.relpath(full, repo_path)
            # normalise to forward slashes (Windows safety)
            rel = rel.replace("\\", "/")
            if included_dirs and not _included(rel, included_dirs):
                continue
            yield full, rel


def build_graph(repo_path: str, included_dirs=None) -> SymbolGraph:
    """Walk repo_path, parse every eligible TS/JS file, and return a SymbolGraph.

    Paths stored in the graph are relative to repo_path (forward-slash).
    A single unparseable file is skipped without killing the build.
    """
    parsed = []
    for full, rel in _iter_files(repo_path, included_dirs or []):
        try:
            source = open(full, encoding="utf-8", errors="ignore").read()
            parsed.append(parse_file(rel, source))
        except Exception:
            continue
    return SymbolGraph.from_parsed(parsed)


def save_graph(g: SymbolGraph, path: str) -> None:
    """Persist g to a JSON file at path."""
    parent = os.path.dirname(path)
    if parent:
        os.makedirs(parent, exist_ok=True)
    with open(path, "w", encoding="utf-8") as fh:
        json.dump(g.to_dict(), fh)


def load_graph(path: str) -> SymbolGraph:
    """Load and return a SymbolGraph from a JSON file."""
    with open(path, encoding="utf-8") as fh:
        return SymbolGraph.from_dict(json.load(fh))
