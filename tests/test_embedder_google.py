import os
import pytest
from dotenv import load_dotenv

load_dotenv()


@pytest.mark.skipif(not os.environ.get("GOOGLE_API_KEY"), reason="no GOOGLE_API_KEY")
def test_google_embedder_returns_vector():
    from deepwiki.tools.embedder import get_embedder
    embedder = get_embedder(embedder_type="google")
    out = embedder(input="slashCommands.add registers a slash command")
    # adalflow Embedder returns EmbedderOutput with .data[0].embedding (List[float])
    vec = out.data[0].embedding
    assert vec is not None and len(vec) > 0
