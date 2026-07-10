from src.graph.parser import parse_file
from src.graph.symbol_graph import SymbolGraph
from src.qa.retriever import StructuralRetriever


def test_structural_retriever_hits_symbol_file():
    g = SymbolGraph.from_parsed([parse_file("apps/meteor/app/utils/server/slashCommand.ts",
                                             'export const slashCommands = { add(c){} };')])
    r = StructuralRetriever(g, docs=[])
    hits = r.retrieve("how do slash commands register via slashCommands.add", top_k=5)
    assert any("slashCommand.ts" in h.file_path for h in hits)
