from dataclasses import dataclass, field
from tree_sitter import Language, Parser
import tree_sitter_typescript as tsts

# Newer tree-sitter API: Language(PyCapsule) and Parser(language)
_TS = Language(tsts.language_typescript())
_TSX = Language(tsts.language_tsx())


@dataclass
class Def:
    name: str
    kind: str
    line: int


@dataclass
class Imp:
    name: str
    source: str
    line: int


@dataclass
class Ref:
    name: str
    line: int


@dataclass
class ParsedFile:
    path: str
    defs: list = field(default_factory=list)
    imports: list = field(default_factory=list)
    refs: list = field(default_factory=list)


def _lang_for(path: str) -> Language:
    return _TSX if path.endswith(".tsx") or path.endswith(".jsx") else _TS


def _txt(node, src: bytes) -> str:
    return src[node.start_byte:node.end_byte].decode("utf-8", "ignore")


def _descendants(node, typ):
    out = []
    for c in node.children:
        if c.type == typ:
            out.append(c)
        out.extend(_descendants(c, typ))
    return out


def parse_file(path: str, source: str) -> ParsedFile:
    src = source.encode("utf-8")
    lang = _lang_for(path)
    parser = Parser(lang)
    tree = parser.parse(src)
    pf = ParsedFile(path=path)
    root = tree.root_node

    def walk(node):
        t = node.type

        # definitions
        if t in ("function_declaration", "generator_function_declaration"):
            n = node.child_by_field_name("name")
            if n:
                pf.defs.append(Def(_txt(n, src), "function", n.start_point[0] + 1))
        elif t in ("class_declaration", "abstract_class_declaration"):
            n = node.child_by_field_name("name")
            if n:
                pf.defs.append(Def(_txt(n, src), "class", n.start_point[0] + 1))
        elif t in ("interface_declaration", "type_alias_declaration", "enum_declaration"):
            n = node.child_by_field_name("name")
            if n:
                pf.defs.append(Def(_txt(n, src), t.split("_")[0], n.start_point[0] + 1))
        elif t == "variable_declarator":
            n = node.child_by_field_name("name")
            if n and n.type == "identifier":
                pf.defs.append(Def(_txt(n, src), "const", n.start_point[0] + 1))
        elif t == "method_definition":
            n = node.child_by_field_name("name")
            if n:
                pf.defs.append(Def(_txt(n, src), "method", n.start_point[0] + 1))

        # imports
        elif t == "import_statement":
            srcnode = node.child_by_field_name("source")
            # extract the string fragment (module path without quotes)
            mod = ""
            if srcnode:
                frags = _descendants(srcnode, "string_fragment")
                if frags:
                    mod = _txt(frags[0], src)
                else:
                    # fallback: strip surrounding quotes from raw text
                    mod = _txt(srcnode, src).strip("'\"")
            for idn in _descendants(node, "identifier"):
                pf.imports.append(Imp(_txt(idn, src), mod, idn.start_point[0] + 1))
            # don't walk children of import_statement further (avoid double-counting refs)
            return

        # references: identifiers used as the object of member expressions or call expressions
        elif t == "identifier":
            pf.refs.append(Ref(_txt(node, src), node.start_point[0] + 1))

        for c in node.children:
            walk(c)

    walk(root)
    return pf
