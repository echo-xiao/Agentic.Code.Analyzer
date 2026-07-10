import asyncio
def test_structural_tools_registered(monkeypatch):
    import src.mcp_server.server as srv
    class _FakeGraph:
        def find_symbol(self, n): return [{"file": "a.ts", "line": 1, "kind": "const"}]
        def find_references(self, n): return [{"file": "b.ts", "line": 2}]
        def impacted_by(self, n): return [{"file": "b.ts"}]
    monkeypatch.setattr(srv, "_GRAPH", _FakeGraph())
    tools = {t.name for t in asyncio.run(srv.mcp.list_tools())}
    assert {"find_symbol", "find_references", "impacted_by"} <= tools
    assert srv.find_symbol_tool("slashCommands")[0]["file"] == "a.ts"
