import os, pytest
from dotenv import load_dotenv
load_dotenv()

FIXTURE = os.path.join(os.path.dirname(__file__), "fixtures", "mini_repo")


# ---------------------------------------------------------------------------
# Fix 2 — load_indexed_docs: empty included_dirs must fall back to M1_INCLUDED_DIRS
# ---------------------------------------------------------------------------

def test_load_indexed_docs_defaults_to_m1_dirs(monkeypatch):
    """load_indexed_docs() with no included_dirs must pass config.M1_INCLUDED_DIRS, not []."""
    from src import config
    from src.indexer import index_repo as idx_mod

    captured = {}

    def fake_prepare_database(self, repo_url_or_path, repo_type, embedder_type, included_dirs):
        captured["included_dirs"] = included_dirs
        return []

    monkeypatch.setattr(idx_mod.DatabaseManager, "prepare_database", fake_prepare_database)

    idx_mod.load_indexed_docs("/tmp/fake_repo")

    assert captured["included_dirs"] == config.M1_INCLUDED_DIRS, (
        f"Expected M1_INCLUDED_DIRS={config.M1_INCLUDED_DIRS!r}, got {captured['included_dirs']!r}"
    )
    assert captured["included_dirs"] != [], "included_dirs must NOT be [] (footgun guard)"


def test_load_indexed_docs_respects_explicit_dirs(monkeypatch):
    """When caller passes explicit included_dirs, those must be forwarded as-is."""
    from src.indexer import index_repo as idx_mod

    captured = {}

    def fake_prepare_database(self, repo_url_or_path, repo_type, embedder_type, included_dirs):
        captured["included_dirs"] = included_dirs
        return []

    monkeypatch.setattr(idx_mod.DatabaseManager, "prepare_database", fake_prepare_database)

    explicit = ["packages/foo", "packages/bar"]
    idx_mod.load_indexed_docs("/tmp/fake_repo", included_dirs=explicit)

    assert captured["included_dirs"] == explicit


@pytest.mark.skipif(not os.environ.get("GOOGLE_API_KEY"), reason="no GOOGLE_API_KEY")
def test_index_mini_repo_produces_embedded_docs():
    from src.indexer.index_repo import index_repo
    res = index_repo(FIXTURE, included_dirs=["src"], embedder_type="google")
    assert res.files_indexed >= 1          # commands.ts was read
    assert res.chunks >= 1
    assert res.empty_vectors == 0          # every chunk got a Gemini vector
    # file_path metadata is preserved (needed later for citations)
    assert any("commands.ts" in d.meta_data.get("file_path", "") for d in res.docs)
