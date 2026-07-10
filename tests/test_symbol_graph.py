from src.graph.parser import parse_file
from src.graph.symbol_graph import SymbolGraph

A = 'export const slashCommands = { add(c){} };'
B = 'import { slashCommands } from "./a";\nslashCommands.add("kick");'

def _g():
    return SymbolGraph.from_parsed([parse_file("a.ts", A), parse_file("b.ts", B)])

def test_find_symbol_returns_definition_site():
    g = _g()
    defs = g.find_symbol("slashCommands")
    assert any(d["file"] == "a.ts" and d["kind"] == "const" for d in defs)

def test_find_references_finds_use_site_not_def():
    g = _g()
    refs = g.find_references("slashCommands")
    files = {r["file"] for r in refs}
    assert "b.ts" in files            # used in b.ts

def test_impacted_by_reverse_deps():
    g = _g()
    impacted = {x["file"] for x in g.impacted_by("slashCommands")}
    assert "b.ts" in impacted          # b imports/uses it
