from src.graph.parser import parse_file

SRC = '''
import { helper } from "./util";
export const slashCommands = { add(command){}, run(command){} };
export function register() { slashCommands.add("x"); }
'''

def test_parse_defs_imports_refs():
    pf = parse_file("a.ts", SRC)
    names = {d.name for d in pf.defs}
    assert "slashCommands" in names and "register" in names
    assert any(i.name == "helper" and i.source == "./util" for i in pf.imports)
    assert any(r.name == "slashCommands" for r in pf.refs)  # used inside register()
