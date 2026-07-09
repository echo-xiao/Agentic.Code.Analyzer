from mcp.server.fastmcp import FastMCP
from src.qa.ask import ask
from src.indexer.index_repo import load_indexed_docs
from src import config

mcp = FastMCP("rc-code-qa")

# Lazy-loaded: None at import time; loaded on first call to ask_tool.
_DOCS = None


@mcp.tool(name="ask", description="Answer a question about the Rocket.Chat codebase with file citations.")
def ask_tool(question: str) -> dict:
    global _DOCS
    if _DOCS is None:
        _DOCS = load_indexed_docs(
            config.RC_REPO_PATH,
            embedder_type=config.EMBEDDER_TYPE,
            included_dirs=config.M1_INCLUDED_DIRS,
        )
    ans = ask(question, docs=_DOCS, top_k=config.TOP_K)
    return {"answer": ans.text, "citations": ans.citations}


if __name__ == "__main__":
    mcp.run()
