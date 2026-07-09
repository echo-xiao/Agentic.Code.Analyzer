import os, types
import numpy as np
import pytest
from dotenv import load_dotenv
load_dotenv()
FIXTURE = os.path.join(os.path.dirname(__file__), "fixtures", "mini_repo")


# ---------------------------------------------------------------------------
# Helpers for deterministic unit tests (no network)
# ---------------------------------------------------------------------------

def _make_doc(text: str, vector, file_path: str):
    """Build a minimal duck-typed doc object matching what Retriever expects."""
    d = types.SimpleNamespace()
    d.text = text
    d.vector = list(vector)  # Retriever calls len() then np.asarray
    d.meta_data = {"file_path": file_path}
    return d


def _make_fake_embedder(query_vector):
    """Return a callable whose return value matches retriever.embedder(input=q).data[0].embedding."""
    embedding_obj = types.SimpleNamespace(embedding=list(query_vector))
    data_obj = types.SimpleNamespace(data=[embedding_obj])

    def fake_embedder(input):  # noqa: A002  (shadow built-in intentionally)
        return data_obj

    return fake_embedder


# ---------------------------------------------------------------------------
# Unit test: deterministic sort (no live API)
# ---------------------------------------------------------------------------

def test_retriever_sort_descending_deterministic():
    """Sort contract is exercised with ≥2 docs and no network call.

    doc_a is nearly parallel to the query vector → high cosine similarity.
    doc_b is orthogonal to the query vector   → cosine ≈ 0.
    doc_c points away from the query vector   → negative cosine.

    Expected order: doc_a > doc_b > doc_c (strictly descending).
    """
    from src.qa.retriever import Retriever

    query_vec = np.array([1.0, 0.0, 0.0], dtype="float32")

    doc_a = _make_doc("alpha", [1.0, 0.0, 0.0], "alpha.py")   # cos = 1.0
    doc_b = _make_doc("beta",  [0.0, 1.0, 0.0], "beta.py")    # cos = 0.0
    doc_c = _make_doc("gamma", [-1.0, 0.0, 0.0], "gamma.py")  # cos = -1.0

    r = Retriever([doc_a, doc_b, doc_c], embedder_type="google")
    # Monkeypatch the embedder so no network call happens
    r.embedder = _make_fake_embedder(query_vec)

    hits = r.retrieve("anything", top_k=3)

    assert len(hits) == 3

    # (a) sorted strictly descending pairwise
    for i in range(len(hits) - 1):
        assert hits[i].score >= hits[i + 1].score, (
            f"Score not descending at position {i}: {hits[i].score} < {hits[i+1].score}"
        )

    # (b) most-similar doc is first
    assert hits[0].file_path == "alpha.py", (
        f"Expected alpha.py first (highest cosine), got {hits[0].file_path}"
    )
    # (c) least-similar doc is last
    assert hits[-1].file_path == "gamma.py", (
        f"Expected gamma.py last (lowest cosine), got {hits[-1].file_path}"
    )


# ---------------------------------------------------------------------------
# Unit test: empty-docs guard
# ---------------------------------------------------------------------------

def test_retriever_raises_on_empty_docs():
    """Retriever with all-empty-vector docs must raise ValueError immediately."""
    from src.qa.retriever import Retriever

    empty_doc = _make_doc("no vector here", [], "nowhere.py")

    with pytest.raises(ValueError, match="no embeddable docs"):
        Retriever([empty_doc], embedder_type="google")

    # Also works with an empty list
    with pytest.raises(ValueError, match="no embeddable docs"):
        Retriever([], embedder_type="google")


# ---------------------------------------------------------------------------
# Original live integration test (unchanged)
# ---------------------------------------------------------------------------

@pytest.mark.skipif(not os.environ.get("GOOGLE_API_KEY"), reason="no GOOGLE_API_KEY")
def test_retriever_ranks_relevant_chunk_first():
    from src.indexer.index_repo import index_repo
    from src.qa.retriever import Retriever
    docs = index_repo(FIXTURE, included_dirs=["src"], embedder_type="google").docs
    r = Retriever(docs, embedder_type="google")
    hits = r.retrieve("how are slash commands registered", top_k=3)
    assert len(hits) >= 1
    assert "commands.ts" in hits[0].file_path
    assert hits[0].score >= hits[-1].score      # sorted descending
