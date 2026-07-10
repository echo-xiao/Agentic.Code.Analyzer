from mcp.server.fastmcp import FastMCP
from src.qa.ask import ask
from src.indexer.index_repo import load_indexed_docs
from src.graph.build_graph import load_graph
from src import config

mcp = FastMCP("rc-code-qa")

# Lazy-loaded: None at import time; loaded on first call to ask_tool.
_DOCS = None

# Lazy-loaded: None at import time; loaded on first call to _graph().
_GRAPH = None


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


def _graph():
    global _GRAPH
    if _GRAPH is None:
        _GRAPH = load_graph(config.GRAPH_PATH)
    return _GRAPH


def find_symbol_tool(name: str) -> list:
    return _graph().find_symbol(name)


def find_references_tool(name: str) -> list:
    return _graph().find_references(name)


def impacted_by_tool(name: str) -> list:
    return _graph().impacted_by(name)


mcp.tool(name="find_symbol", description="Locate where a symbol is defined in Rocket.Chat.")(find_symbol_tool)
mcp.tool(name="find_references", description="Find call/use sites of a symbol.")(find_references_tool)
mcp.tool(name="impacted_by", description="Files impacted by (referencing/importing) a symbol.")(impacted_by_tool)


if __name__ == "__main__":
    mcp.run()
