import os, pytest
from dotenv import load_dotenv
load_dotenv()

FIXTURE = os.path.join(os.path.dirname(__file__), "fixtures", "mini_repo")

@pytest.mark.skipif(not os.environ.get("GOOGLE_API_KEY"), reason="no GOOGLE_API_KEY")
def test_index_mini_repo_produces_embedded_docs():
    from src.indexer.index_repo import index_repo
    res = index_repo(FIXTURE, included_dirs=["src"], embedder_type="google")
    assert res.files_indexed >= 1          # commands.ts was read
    assert res.chunks >= 1
    assert res.empty_vectors == 0          # every chunk got a Gemini vector
    # file_path metadata is preserved (needed later for citations)
    assert any("commands.ts" in d.meta_data.get("file_path", "") for d in res.docs)
