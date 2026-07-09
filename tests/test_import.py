def test_deepwiki_package_imports():
    from deepwiki.data_pipeline import DatabaseManager
    from deepwiki.tools.embedder import get_embedder
    from deepwiki.config import configs
    assert "embedder_google" in configs
    assert configs["embedder_google"]["model_kwargs"]["model"] == "gemini-embedding-001"
