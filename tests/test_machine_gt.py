from src.graph.parser import parse_file
from src.graph.symbol_graph import SymbolGraph
from src.eval.ground_truth import GTFacts, machine_check


def test_locate_machine_check():
    g = SymbolGraph.from_parsed([parse_file("apps/meteor/app/utils/server/slashCommand.ts",
                                            "export const slashCommands={}")])
    facts = GTFacts(files=set(), symbols={"slashCommands"})
    q = {"questionType": "locate"}
    res = machine_check(q, "It's in slashCommand.ts", ["apps/meteor/app/utils/server/slashCommand.ts"], facts, g)
    assert res["score"] == 1.0     # authoritative file basename present in answer
