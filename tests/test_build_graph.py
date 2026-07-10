from src.graph.build_graph import build_graph, save_graph, load_graph


def test_build_graph_over_tmp_repo(tmp_path):
    (tmp_path / "pkg").mkdir()
    (tmp_path / "pkg" / "a.ts").write_text('export const Foo = 1;')
    (tmp_path / "pkg" / "b.ts").write_text('import { Foo } from "./a";\nconsole.log(Foo);')
    g = build_graph(str(tmp_path))
    assert any(d["file"] == "pkg/a.ts" for d in g.find_symbol("Foo"))     # relative path
    assert any(r["file"] == "pkg/b.ts" for r in g.find_references("Foo"))
    p = tmp_path / "g.json"; save_graph(g, str(p))
    assert load_graph(str(p)).find_symbol("Foo")
