import os, pytest
from dotenv import load_dotenv
load_dotenv()
FIXTURE = os.path.join(os.path.dirname(__file__), "fixtures", "mini_repo")

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
