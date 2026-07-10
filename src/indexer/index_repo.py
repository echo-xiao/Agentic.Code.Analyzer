from dataclasses import dataclass
from deepwiki.data_pipeline import DatabaseManager
from src import config


@dataclass
class IndexResult:
    docs: list
    files_indexed: int
    chunks: int
    empty_vectors: int


def _empty_vec_count(docs) -> int:
    n = 0
    for d in docs:
        v = getattr(d, "vector", None)
        if v is None or (hasattr(v, "__len__") and len(v) == 0):
            n += 1
    return n


def index_repo(repo_path: str, included_dirs: list[str], embedder_type: str = "google") -> IndexResult:
    """Full-scan the given dirs of a LOCAL repo and build/persist the LocalDB.

    included_dirs is inclusion-mode: only those dirs are read (M1 subset). Passing
    no included_dirs would scan the whole repo (that is the M3/M4 full-scan path).
    """
    manager = DatabaseManager()
    docs = manager.prepare_database(
        repo_url_or_path=repo_path,
        repo_type=None,
        embedder_type=embedder_type,
        included_dirs=included_dirs,
    )
    files = {d.meta_data.get("file_path") for d in docs if d.meta_data.get("file_path")}
    return IndexResult(
        docs=docs,
        files_indexed=len(files),
        chunks=len(docs),
        empty_vectors=_empty_vec_count(docs),
    )


def load_indexed_docs(repo_path: str, embedder_type: str = "google", included_dirs: list[str] | None = None) -> list:
    """Load previously-persisted transformed docs (prepare_database loads the .pkl if present)."""
    manager = DatabaseManager()
    return manager.prepare_database(
        repo_url_or_path=repo_path,
        repo_type=None,
        embedder_type=embedder_type,
        included_dirs=included_dirs or config.M1_INCLUDED_DIRS,
    )
