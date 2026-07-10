from collections import defaultdict


class SymbolGraph:
    def __init__(self):
        self.defs = defaultdict(list)          # name -> [{file,line,kind}]
        self.refs = defaultdict(list)          # name -> [{file,line}]
        self.imports_by_file = defaultdict(list)  # file -> [{name,source}]

    @classmethod
    def from_parsed(cls, parsed):
        g = cls()
        for pf in parsed:
            def_lines = set()
            for d in pf.defs:
                g.defs[d.name].append({"file": pf.path, "line": d.line, "kind": d.kind})
                def_lines.add(d.line)
            for r in pf.refs:
                if r.line not in def_lines:      # exclude the definition itself
                    g.refs[r.name].append({"file": pf.path, "line": r.line})
            for i in pf.imports:
                g.imports_by_file[pf.path].append({"name": i.name, "source": i.source})
        return g

    def find_symbol(self, name):
        return list(self.defs.get(name, []))

    def find_references(self, name):
        return list(self.refs.get(name, []))

    def impacted_by(self, name):
        # files that reference the symbol OR import a symbol with this name
        files = {r["file"] for r in self.refs.get(name, [])}
        for f, imps in self.imports_by_file.items():
            if any(i["name"] == name for i in imps):
                files.add(f)
        return [{"file": f} for f in sorted(files)]

    def to_dict(self):
        return {"defs": dict(self.defs), "refs": dict(self.refs),
                "imports_by_file": dict(self.imports_by_file)}

    @classmethod
    def from_dict(cls, d):
        g = cls()
        g.defs = defaultdict(list, d["defs"]); g.refs = defaultdict(list, d["refs"])
        g.imports_by_file = defaultdict(list, d["imports_by_file"])
        return g
