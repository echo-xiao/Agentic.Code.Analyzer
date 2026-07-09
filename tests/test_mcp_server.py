import asyncio


def test_ask_tool_registered_and_delegates(monkeypatch):
    import src.mcp_server.server as srv
    from dataclasses import dataclass

    @dataclass
    class _A:
        text: str
        citations: list
        contexts: list

    monkeypatch.setattr(srv, "ask", lambda q, docs, top_k: _A("answer X", ["a.ts"], []))
    monkeypatch.setattr(srv, "_DOCS", [])

    tools = asyncio.run(srv.mcp.list_tools())
    assert any(t.name == "ask" for t in tools)

    out = srv.ask_tool("how does X work")
    assert out == {"answer": "answer X", "citations": ["a.ts"]}
