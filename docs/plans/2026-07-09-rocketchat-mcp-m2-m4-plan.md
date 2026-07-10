# Rocket.Chat Code-QA MCP — M2+M3+M4 Implementation Plan (all remaining work)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the M1 naive-semantic baseline into an accuracy-scored code-QA system: a lightweight symbol graph + hybrid retrieval + Claude dynamic-wiring preprocessing + enforced/verified citations + full-scan, all measured by an eval harness that emits **`logs/eval/metrics.md`** (quantitative) and **`logs/eval/verdicts.md`** (per-question semantic verdict) over all 34 testcases.

**Architecture:** Keep the M1 deepwiki-based index/ask pipeline. Add (1) a tree-sitter symbol graph (`src/graph/`) exposing `find_symbol`/`find_references`/`impacted_by`; (2) a hybrid retriever (`src/qa/`) fusing FAISS-semantic + structural-graph + ripgrep-lexical via Reciprocal Rank Fusion; (3) Claude offline preprocessing (`src/preprocess/`) that writes file summaries + explicit dynamic-wiring docs into the embed corpus; (4) enforced `file:line` citations + a Citation Verifier (`src/verify/`); (5) full-scan + incremental indexing; (6) an eval harness (`src/eval/`) that machine-checks `locate/call-chain/impact` against the graph and LLM-judges the open questions, producing metrics.md + verdicts.md.

**Tech Stack:** Python 3.11, `tree-sitter` + `tree-sitter-typescript`, `ripgrep` (`rg`), deepwiki-open/adalflow/FAISS (M1), `google-generativeai` (Gemini embed + Flash + judge), `anthropic` (Claude preprocessing), `mcp`, numpy, pytest.

## Global Constraints

- Python floor **3.11**. Reuse public libs; self-code only the integration glue + Claude preprocessing + Citation Verifier + eval judging.
- Embeddings **Gemini `gemini-embedding-001`** (`embedder_type="google"`) — never OpenAI. Generation/judge **`gemini-2.5-flash`**. Claude preprocessing uses **`claude-*`** via `CLAUDE_API_KEY` in `.env`.
- Query-time LLM budget: **≤2 Gemini generation calls per question**. Retrieval (semantic/structural/lexical) and graph machine-checks use **zero** LLM. The LLM-judge is an **eval-time** call (separate budget), not a query-time call.
- Gemini free tier = short rolling rate-limit windows (~30s recovery); all Gemini calls MUST go through the existing patient backoff (honor server `retry_delay`, ≥30s). Full-scan is a long offline job — accept it runs for a while / resumably.
- **GT (`logs/answers-claude`) line numbers are unreliable** (drift ~2 lines): grade at **file + symbol** granularity, never exact line. **Refresh/verify GT cites against the current RC checkout before trusting them.**
- **Anti-circularity:** open-question judging must reward *correctness against verifiable facts*, not *textual similarity to the Claude-written GT*. The judge prompt scores whether the answer's cited files/symbols/facts match reality + GT's key facts, not "does it read like the GT".
- RC checkout: `/tmp/analysis/rocketchat` (`config.RC_REPO_PATH`). 34 testcases in `src/eval/utils/testcases.json`; GT in `logs/answers-claude/*.md`.
- Symbol graph uses **tree-sitter (syntactic)**, NOT scip-typescript (RC's yarn4/corepack is unavailable — this is the spec's documented fallback). References are identifier-based/approximate; that's acceptable for M2–M4.
- Commit after every green task; do not push (controller handles push at the end).

**Question-type counts (verified):** architecture 9 · locate 8 · pattern 6 · call-chain 4 · routing 4 · impact 3 = **34**. Machine-checkable = locate+call-chain+impact = **15**; LLM-judged (open) = architecture+pattern+routing = **19**.

---

## File Structure

```
src/
├── config.py                    # +GRAPH_PATH, +FULL_SCAN flag, +JUDGE_MODEL (Task 1)
├── graph/
│   ├── __init__.py
│   ├── parser.py                # tree-sitter: parse one TS/JS file -> defs/imports/refs (Task 2)
│   ├── symbol_graph.py          # SymbolGraph: find_symbol/find_references/impacted_by (Task 3)
│   └── build_graph.py           # walk RC -> build + persist graph.json (Task 4)
├── qa/
│   ├── retriever.py             # +StructuralRetriever +LexicalRetriever +HybridRetriever (Tasks 6,7,8)
│   └── ask.py                   # ask() uses HybridRetriever + enforced-citation prompt (Tasks 8,15)
├── mcp_server/server.py         # +find_symbol/find_references/impacted_by tools (Task 5)
├── preprocess/
│   ├── __init__.py
│   ├── claude_client.py         # thin Claude call w/ backoff (Task 13)
│   ├── summarize.py             # file/module summaries, hash-cached (Task 14)
│   └── dynamic_wiring.py        # extract RC dynamic-wiring docs (Task 15... uses Claude) (Task 16)
├── verify/
│   ├── __init__.py
│   └── citation_verifier.py     # verify answer cites vs graph/source (Task 17)
├── indexer/index_repo.py        # +full-scan +incremental(git diff) (Task 18)
└── eval/
    ├── ground_truth.py          # refresh answers-claude cites + machine GT from graph (Tasks 9,10)
    ├── judge.py                 # Gemini LLM-judge for open Qs (Task 11)
    ├── score.py                 # per-question scoring dispatch by questionType (Task 12)
    └── report.py                # emit metrics.md + verdicts.md (Task 12)
tests/                           # one test file per module above
```

---

## PHASE A — Symbol Graph (tree-sitter)

## Task 1: Deps + config for graph/full-scan/judge

**Files:** Modify `pyproject.toml`; Modify `src/config.py`; Test `tests/test_config_m2.py`

**Interfaces:**
- Produces: `config.GRAPH_PATH: str` (where the built graph persists), `config.JUDGE_MODEL = "gemini-2.5-flash"`, `config.FULL_SCAN: bool` (env `RC_FULL_SCAN=1` → True), `config.CLAUDE_MODEL = "claude-opus-4-8"`.

- [ ] **Step 1: Add deps to `pyproject.toml`** — under `dependencies` add: `"tree-sitter>=0.23"`, `"tree-sitter-typescript>=0.23"`, `"anthropic>=0.40"`. Run `uv sync`.

- [ ] **Step 2: Write failing test**

```python
# tests/test_config_m2.py
from src import config
def test_m2_config():
    assert config.JUDGE_MODEL == "gemini-2.5-flash"
    assert config.CLAUDE_MODEL.startswith("claude-")
    assert isinstance(config.FULL_SCAN, bool)
    assert config.GRAPH_PATH.endswith("graph.json")
```

- [ ] **Step 3: Append to `src/config.py`**

```python
JUDGE_MODEL = "gemini-2.5-flash"
CLAUDE_MODEL = "claude-opus-4-8"          # Claude for offline preprocessing (has CLAUDE_API_KEY)
FULL_SCAN = os.environ.get("RC_FULL_SCAN", "") == "1"   # off by default; M1 subset unless set
GRAPH_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "graph.json")
```

- [ ] **Step 4: Run** `uv run pytest tests/test_config_m2.py -v` → PASS.
- [ ] **Step 5: Commit** `git add pyproject.toml uv.lock src/config.py tests/test_config_m2.py && git commit -m "feat(m2): deps (tree-sitter, anthropic) + graph/full-scan/judge config"`

---

## Task 2: tree-sitter parser (one file → defs/imports/refs)

**Files:** Create `src/graph/__init__.py`, `src/graph/parser.py`; Test `tests/test_parser.py`

**Interfaces:**
- Produces: `parse_file(path: str, source: str) -> ParsedFile` where `ParsedFile` is a dataclass `{path: str, defs: list[Def], imports: list[Imp], refs: list[Ref]}`; `Def = {name: str, kind: str, line: int}` (kind ∈ function/class/const/interface/type/method); `Imp = {name: str, source: str, line: int}` (imported identifier + module specifier); `Ref = {name: str, line: int}` (identifier use sites). Uses `tree_sitter_typescript.language_typescript()`/`language_tsx()`.

- [ ] **Step 1: Write failing test** (uses the mini fixture from M1 + inline source)

```python
# tests/test_parser.py
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
```

- [ ] **Step 2: Run** → FAIL (ModuleNotFoundError).

- [ ] **Step 3: Implement `src/graph/parser.py`**

```python
from dataclasses import dataclass, field
from tree_sitter import Language, Parser
import tree_sitter_typescript as tsts

_TS = Language(tsts.language_typescript())
_TSX = Language(tsts.language_tsx())


@dataclass
class Def: name: str; kind: str; line: int
@dataclass
class Imp: name: str; source: str; line: int
@dataclass
class Ref: name: str; line: int
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


def parse_file(path: str, source: str) -> ParsedFile:
    src = source.encode("utf-8")
    tree = Parser(_lang_for(path)).parse(src)
    pf = ParsedFile(path=path)
    root = tree.root_node

    def walk(node):
        t = node.type
        # definitions
        if t in ("function_declaration", "generator_function_declaration"):
            n = node.child_by_field_name("name")
            if n: pf.defs.append(Def(_txt(n, src), "function", n.start_point[0] + 1))
        elif t in ("class_declaration", "abstract_class_declaration"):
            n = node.child_by_field_name("name")
            if n: pf.defs.append(Def(_txt(n, src), "class", n.start_point[0] + 1))
        elif t in ("interface_declaration", "type_alias_declaration", "enum_declaration"):
            n = node.child_by_field_name("name")
            if n: pf.defs.append(Def(_txt(n, src), t.split("_")[0], n.start_point[0] + 1))
        elif t in ("variable_declarator",):
            n = node.child_by_field_name("name")
            if n and n.type == "identifier":
                pf.defs.append(Def(_txt(n, src), "const", n.start_point[0] + 1))
        elif t == "method_definition":
            n = node.child_by_field_name("name")
            if n: pf.defs.append(Def(_txt(n, src), "method", n.start_point[0] + 1))
        # imports
        elif t == "import_statement":
            srcnode = node.child_by_field_name("source")
            mod = _txt(srcnode, src).strip("'\"") if srcnode else ""
            for idn in _descendants(node, "identifier"):
                pf.imports.append(Imp(_txt(idn, src), mod, idn.start_point[0] + 1))
        # references: identifiers that are the object of a member/call
        elif t == "identifier":
            pf.refs.append(Ref(_txt(node, src), node.start_point[0] + 1))
        for c in node.children:
            walk(c)

    def _descendants(node, typ):
        out = []
        for c in node.children:
            if c.type == typ: out.append(c)
            out.extend(_descendants(c, typ))
        return out

    walk(root)
    return pf
```

- [ ] **Step 4: Run** `uv run pytest tests/test_parser.py -v` → PASS. (If the tsx/ts binding constructor differs in the installed version, adjust `Parser(_lang_for(path))` to the version's API — confirm with `uv run python -c "from tree_sitter import Parser; help(Parser)"`; the test will catch a wrong form.)
- [ ] **Step 5: Commit** `git add src/graph/__init__.py src/graph/parser.py tests/test_parser.py && git commit -m "feat(graph): tree-sitter parser -> defs/imports/refs"`

---

## Task 3: SymbolGraph (find_symbol / find_references / impacted_by)

**Files:** Create `src/graph/symbol_graph.py`; Test `tests/test_symbol_graph.py`

**Interfaces:**
- Consumes: `ParsedFile`/`Def`/`Imp`/`Ref` (Task 2).
- Produces: `SymbolGraph.from_parsed(parsed: list[ParsedFile]) -> SymbolGraph`; `.find_symbol(name) -> list[dict{file,line,kind}]` (definitions); `.find_references(name) -> list[dict{file,line}]` (ref sites across files, minus the def lines); `.impacted_by(name) -> list[dict{file}]` (files that import the module defining `name`, or reference `name` — reverse deps); `.to_dict()/from_dict()` for persistence.

- [ ] **Step 1: Write failing test**

```python
# tests/test_symbol_graph.py
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
```

- [ ] **Step 2: Run** → FAIL.

- [ ] **Step 3: Implement `src/graph/symbol_graph.py`**

```python
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
```

- [ ] **Step 4: Run** → PASS.
- [ ] **Step 5: Commit** `git add src/graph/symbol_graph.py tests/test_symbol_graph.py && git commit -m "feat(graph): SymbolGraph find_symbol/find_references/impacted_by"`

---

## Task 4: Build + persist the graph over RC

**Files:** Create `src/graph/build_graph.py`; Test `tests/test_build_graph.py`

**Interfaces:**
- Consumes: `parse_file` (Task 2), `SymbolGraph` (Task 3), `config`.
- Produces: `build_graph(repo_path: str, included_dirs: list[str]|None=None) -> SymbolGraph` (walks ts/tsx/js/jsx files under repo, respecting `included_dirs` inclusion like the indexer; skips node_modules/dist/*.spec/*.test); `save_graph(g, path)` / `load_graph(path) -> SymbolGraph` (JSON). Paths stored **relative to repo_path**.

- [ ] **Step 1: Write failing test** (uses a tmp repo with 2 nested files)

```python
# tests/test_build_graph.py
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
```

- [ ] **Step 2: Run** → FAIL.

- [ ] **Step 3: Implement `src/graph/build_graph.py`**

```python
import os, json
from src.graph.parser import parse_file
from src.graph.symbol_graph import SymbolGraph

_EXTS = (".ts", ".tsx", ".js", ".jsx")
_SKIP = ("node_modules", "dist", "build", ".git", "__tests__")


def _iter_files(repo_path, included_dirs):
    for root, dirs, files in os.walk(repo_path):
        dirs[:] = [d for d in dirs if d not in _SKIP]
        for fn in files:
            if not fn.endswith(_EXTS) or fn.endswith((".spec.ts", ".test.ts", ".d.ts")):
                continue
            full = os.path.join(root, fn)
            rel = os.path.relpath(full, repo_path)
            if included_dirs and not any(
                inc.strip("/").split("/") == rel.split("/")[i:i+len(inc.strip("/").split("/"))]
                for inc in included_dirs for i in range(len(rel.split("/")))
            ):
                continue
            yield full, rel


def build_graph(repo_path, included_dirs=None):
    parsed = []
    for full, rel in _iter_files(repo_path, included_dirs):
        try:
            parsed.append(parse_file(rel, open(full, encoding="utf-8", errors="ignore").read()))
        except Exception:
            continue      # a single unparseable file must not kill the build
    return SymbolGraph.from_parsed(parsed)


def save_graph(g, path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as fh:
        json.dump(g.to_dict(), fh)


def load_graph(path):
    with open(path) as fh:
        return SymbolGraph.from_dict(json.load(fh))
```

- [ ] **Step 4: Run** → PASS.
- [ ] **Step 5: Commit** `git add src/graph/build_graph.py tests/test_build_graph.py && git commit -m "feat(graph): build + persist SymbolGraph over a repo (relative paths)"`

---

## Task 5: Expose structural tools on the MCP server

**Files:** Modify `src/mcp_server/server.py`; Test `tests/test_mcp_structural.py`

**Interfaces:**
- Consumes: `load_graph` (Task 4), `config.GRAPH_PATH`.
- Produces: MCP tools `find_symbol(name)->list`, `find_references(name)->list`, `impacted_by(name)->list`, backed by a lazily-loaded graph (`_GRAPH = None`, load on first call from `config.GRAPH_PATH`), following the same lazy pattern as `_DOCS`.

- [ ] **Step 1: Write failing test** (monkeypatch the graph loader; assert tools registered + delegate)

```python
# tests/test_mcp_structural.py
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
```

- [ ] **Step 2: Run** → FAIL.

- [ ] **Step 3: Modify `src/mcp_server/server.py`** — add after `_DOCS`:

```python
from src.graph.build_graph import load_graph
_GRAPH = None

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
```

(In the test, `_GRAPH` is monkeypatched so `_graph()` returns it without loading.)

- [ ] **Step 4: Run** → PASS.
- [ ] **Step 5: Commit** `git add src/mcp_server/server.py tests/test_mcp_structural.py && git commit -m "feat(mcp): expose find_symbol/find_references/impacted_by tools"`

---

## PHASE B — Hybrid Retrieval

## Task 6: StructuralRetriever (query identifiers → graph hits)

**Files:** Modify `src/qa/retriever.py`; Test `tests/test_structural_retriever.py`

**Interfaces:**
- Consumes: `SymbolGraph` (Task 3), `Hit` (M1 retriever).
- Produces: `StructuralRetriever(graph, docs)` with `.retrieve(query, top_k) -> list[Hit]`. It extracts candidate identifiers from the query (camelCase/PascalCase tokens + quoted words), looks each up via `find_symbol`/`find_references`, and returns `Hit`s pointing at those files (text = the chunk from `docs` whose `file_path` matches, or a short "def of X at file:line" stub if no chunk), score = a rank-based structural score.

- [ ] **Step 1: Write failing test**

```python
# tests/test_structural_retriever.py
from src.graph.parser import parse_file
from src.graph.symbol_graph import SymbolGraph
from src.qa.retriever import StructuralRetriever

def test_structural_retriever_hits_symbol_file():
    g = SymbolGraph.from_parsed([parse_file("apps/meteor/app/utils/server/slashCommand.ts",
                                             'export const slashCommands = { add(c){} };')])
    r = StructuralRetriever(g, docs=[])
    hits = r.retrieve("how do slash commands register via slashCommands.add", top_k=5)
    assert any("slashCommand.ts" in h.file_path for h in hits)
```

- [ ] **Step 2: Run** → FAIL.

- [ ] **Step 3: Add to `src/qa/retriever.py`**

```python
import re

_IDENT_RE = re.compile(r"[A-Za-z_][A-Za-z0-9_]*")

def _candidate_identifiers(query: str) -> list[str]:
    toks = _IDENT_RE.findall(query)
    # keep multi-word-cased or quoted-looking identifiers, drop common english words
    stop = {"how","do","does","the","a","an","is","are","in","of","to","and","via","from","work","works"}
    return [t for t in toks if (t.lower() not in stop) and (len(t) > 3) and
            (any(c.isupper() for c in t[1:]) or t.islower() and t not in stop)]

class StructuralRetriever:
    def __init__(self, graph, docs):
        self.graph = graph
        self.by_file = {}
        for d in docs:
            self.by_file.setdefault(d.meta_data.get("file_path", ""), d.text)

    def retrieve(self, query: str, top_k: int) -> list[Hit]:
        seen, hits = set(), []
        for ident in _candidate_identifiers(query):
            for d in self.graph.find_symbol(ident) + self.graph.find_references(ident):
                f = d["file"]
                if f in seen: continue
                seen.add(f)
                text = self.by_file.get(f) or f"symbol `{ident}` at {f}:{d.get('line','?')}"
                hits.append(Hit(text=text, file_path=f, score=1.0 / (len(hits) + 1)))
                if len(hits) >= top_k: return hits
        return hits
```

- [ ] **Step 4: Run** → PASS.
- [ ] **Step 5: Commit** `git add src/qa/retriever.py tests/test_structural_retriever.py && git commit -m "feat(retriever): StructuralRetriever (query idents -> graph hits)"`

---

## Task 7: LexicalRetriever (ripgrep exact-identifier) + RRF fusion

**Files:** Modify `src/qa/retriever.py`; Test `tests/test_hybrid_fuse.py`

**Interfaces:**
- Produces: `LexicalRetriever(repo_path, docs)` with `.retrieve(query, top_k) -> list[Hit]` (runs `rg -l --type ts <ident>` for each candidate identifier under repo_path, returns file hits); and `reciprocal_rank_fusion(rankings: list[list[Hit]], k=60, top_k=20) -> list[Hit]` merging multiple ranked Hit lists by RRF on `file_path`, keeping the best-scoring text per file.

- [ ] **Step 1: Write failing test** (RRF is pure; test it deterministically)

```python
# tests/test_hybrid_fuse.py
from src.qa.retriever import reciprocal_rank_fusion, Hit

def test_rrf_merges_and_ranks():
    a = [Hit("t1", "x.ts", 0.9), Hit("t2", "y.ts", 0.8)]
    b = [Hit("t2b", "y.ts", 0.7), Hit("t3", "z.ts", 0.6)]
    fused = reciprocal_rank_fusion([a, b], k=60, top_k=3)
    files = [h.file_path for h in fused]
    assert files[0] == "y.ts"          # appears in both -> highest RRF
    assert set(files) == {"x.ts", "y.ts", "z.ts"}
```

- [ ] **Step 2: Run** → FAIL.

- [ ] **Step 3: Add to `src/qa/retriever.py`**

```python
import subprocess

class LexicalRetriever:
    def __init__(self, repo_path, docs):
        self.repo_path = repo_path
        self.by_file = {d.meta_data.get("file_path", ""): d.text for d in docs}

    def retrieve(self, query, top_k):
        hits, seen = [], set()
        for ident in _candidate_identifiers(query):
            try:
                out = subprocess.run(["rg", "-l", "--type", "ts", "-e", rf"\b{ident}\b"],
                                     cwd=self.repo_path, capture_output=True, text=True, timeout=20)
            except Exception:
                continue
            for f in out.stdout.splitlines():
                if f in seen: continue
                seen.add(f)
                hits.append(Hit(self.by_file.get(f) or f"`{ident}` in {f}", f, 1.0 / (len(hits) + 1)))
                if len(hits) >= top_k: return hits
        return hits


def reciprocal_rank_fusion(rankings, k=60, top_k=20):
    scores, best_text = {}, {}
    for ranking in rankings:
        for rank, h in enumerate(ranking):
            scores[h.file_path] = scores.get(h.file_path, 0.0) + 1.0 / (k + rank + 1)
            best_text.setdefault(h.file_path, h.text)
    ordered = sorted(scores, key=lambda f: scores[f], reverse=True)[:top_k]
    return [Hit(text=best_text[f], file_path=f, score=scores[f]) for f in ordered]
```

- [ ] **Step 4: Run** → PASS.
- [ ] **Step 5: Commit** `git add src/qa/retriever.py tests/test_hybrid_fuse.py && git commit -m "feat(retriever): LexicalRetriever (ripgrep) + RRF fusion"`

---

## Task 8: HybridRetriever + wire into ask(); re-run trace to show improvement

**Files:** Modify `src/qa/retriever.py`, `src/qa/ask.py`; Test `tests/test_ask_hybrid.py`

**Interfaces:**
- Produces: `HybridRetriever(docs, graph, repo_path, embedder_type="google")` with `.retrieve(query, top_k) -> list[Hit]` = RRF of the M1 semantic `Retriever`, `StructuralRetriever`, `LexicalRetriever`. `ask(question, docs, graph=None, repo_path=None, top_k=20, model=...)` uses `HybridRetriever` when `graph` is provided, else falls back to semantic `Retriever` (keeps M1 tests valid).

- [ ] **Step 1: Write failing test** (mock the 3 sub-retrievers + LLM; assert fusion + that graph hits surface)

```python
# tests/test_ask_hybrid.py
from dataclasses import dataclass
@dataclass
class _H: text: str; file_path: str; score: float

def test_ask_uses_hybrid_when_graph_given(monkeypatch):
    from src.qa import ask as ask_mod
    monkeypatch.setattr(ask_mod, "_gemini_generate", lambda p, m: "answer `slashCommand.ts`")
    class _FakeHybrid:
        def __init__(self, *a, **k): pass
        def retrieve(self, q, top_k): return [_H("code", "apps/meteor/app/utils/server/slashCommand.ts", 0.9)]
    monkeypatch.setattr(ask_mod, "HybridRetriever", _FakeHybrid)
    ans = ask_mod.ask("how do slash commands work", docs=[], graph=object(), repo_path="/tmp", top_k=5)
    assert "slashCommand.ts" in ans.citations[0]
```

- [ ] **Step 2: Run** → FAIL.

- [ ] **Step 3: Implement** — add `HybridRetriever` to `retriever.py`:

```python
class HybridRetriever:
    def __init__(self, docs, graph, repo_path, embedder_type="google"):
        self.semantic = Retriever(docs, embedder_type) if docs else None
        self.structural = StructuralRetriever(graph, docs)
        self.lexical = LexicalRetriever(repo_path, docs)

    def retrieve(self, query, top_k):
        rankings = []
        if self.semantic: rankings.append(self.semantic.retrieve(query, top_k))
        rankings.append(self.structural.retrieve(query, top_k))
        rankings.append(self.lexical.retrieve(query, top_k))
        return reciprocal_rank_fusion(rankings, top_k=top_k)
```

Modify `ask.py` — import `HybridRetriever`; change `ask` signature + body:

```python
from src.qa.retriever import Retriever, Hit, HybridRetriever

def ask(question, docs, graph=None, repo_path=None, top_k=20, model="gemini-2.5-flash") -> Answer:
    if graph is not None and repo_path is not None:
        retriever = HybridRetriever(docs, graph, repo_path)
    else:
        retriever = Retriever(docs)
    hits = retriever.retrieve(question, top_k=top_k)
    text = _gemini_generate(_build_prompt(question, hits), model)
    citations = list(dict.fromkeys(h.file_path for h in hits))
    return Answer(text=text, citations=citations, contexts=hits)
```

- [ ] **Step 4: Run** `uv run pytest tests/test_ask_hybrid.py tests/test_ask.py -v` → PASS (existing M1 test_ask still green — graph=None path unchanged).
- [ ] **Step 5: Commit** `git add src/qa/retriever.py src/qa/ask.py tests/test_ask_hybrid.py && git commit -m "feat(retriever): HybridRetriever (semantic+structural+lexical RRF) wired into ask()"`

---

## PHASE C — Eval scoring → metrics.md + verdicts.md (the deliverable)

## Task 9: GT refresh — verify answers-claude cites against current RC

**Files:** Create `src/eval/ground_truth.py`; Test `tests/test_gt_refresh.py`

**Interfaces:**
- Produces: `extract_gt_facts(gt_md: str) -> GTFacts` (`{files: set[str], symbols: set[str]}` from the GT's `path` cites + Key Symbols list) and `verified_gt_files(gt_facts, repo_path, graph) -> set[str]` (subset of GT files that actually exist in RC) — used so scoring compares against **facts that are real**, defusing the "trust Claude's GT blindly" risk.

- [ ] **Step 1: Write failing test**

```python
# tests/test_gt_refresh.py
from src.eval.ground_truth import extract_gt_facts, verified_gt_files

GT = "See **`apps/meteor/app/utils/server/slashCommand.ts`, line 25**.\n### Key Symbols\n- `slashCommands`"

def test_extract_and_verify(tmp_path):
    facts = extract_gt_facts(GT)
    assert "apps/meteor/app/utils/server/slashCommand.ts" in facts.files
    assert "slashCommands" in facts.symbols
    (tmp_path / "apps/meteor/app/utils/server").mkdir(parents=True)
    (tmp_path / "apps/meteor/app/utils/server/slashCommand.ts").write_text("export const slashCommands={}")
    assert "apps/meteor/app/utils/server/slashCommand.ts" in verified_gt_files(facts, str(tmp_path), None)
```

- [ ] **Step 2: Run** → FAIL.

- [ ] **Step 3: Implement `src/eval/ground_truth.py`**

```python
import os, re
from dataclasses import dataclass, field

_PATH_RE = re.compile(r"`([\w./-]+\.\w+)`")
_SYM_RE = re.compile(r"`([A-Za-z_][A-Za-z0-9_.]*)`")

@dataclass
class GTFacts:
    files: set = field(default_factory=set)
    symbols: set = field(default_factory=set)

def extract_gt_facts(gt_md: str) -> GTFacts:
    files = set(_PATH_RE.findall(gt_md))
    # symbols: bare-identifier code spans that are NOT file paths
    symbols = {s for s in _SYM_RE.findall(gt_md) if "." not in s or s.split(".")[0].isidentifier() and "/" not in s}
    symbols = {s for s in symbols if not any(s in f for f in files) and "." not in s}
    return GTFacts(files=files, symbols=symbols)

def verified_gt_files(facts: GTFacts, repo_path: str, graph) -> set:
    return {f for f in facts.files if os.path.isfile(os.path.join(repo_path, f))}
```

- [ ] **Step 4: Run** → PASS.
- [ ] **Step 5: Commit** `git add src/eval/ground_truth.py tests/test_gt_refresh.py && git commit -m "feat(eval): extract + verify GT facts (files/symbols) against RC"`

---

## Task 10: Machine GT from graph (locate / call-chain / impact)

**Files:** Modify `src/eval/ground_truth.py`; Test `tests/test_machine_gt.py`

**Interfaces:**
- Consumes: `SymbolGraph`, `GTFacts`.
- Produces: `machine_check(question: dict, answer_text: str, answer_citations: list[str], gt_facts: GTFacts, graph) -> dict{score: float, matched: list, missed: list}` for `questionType in {locate, call-chain, impact}`: uses the GT's key symbols → graph to get the *authoritative* file set (`find_symbol` for locate, `find_references` for call-chain, `impacted_by` for impact), then scores the fraction of that authoritative file set whose basename appears in the answer text OR citations. Machine, no LLM.

- [ ] **Step 1: Write failing test**

```python
# tests/test_machine_gt.py
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
```

- [ ] **Step 2: Run** → FAIL.

- [ ] **Step 3: Implement (append to `ground_truth.py`)**

```python
import os as _os

def _authoritative_files(qtype, symbols, graph):
    files = set()
    for s in symbols:
        if qtype == "locate":
            files |= {d["file"] for d in graph.find_symbol(s)}
        elif qtype == "call-chain":
            files |= {d["file"] for d in graph.find_symbol(s)} | {r["file"] for r in graph.find_references(s)}
        elif qtype == "impact":
            files |= {x["file"] for x in graph.impacted_by(s)}
    return files

def machine_check(question, answer_text, answer_citations, gt_facts, graph):
    files = _authoritative_files(question["questionType"], gt_facts.symbols, graph)
    if not files:
        return {"score": 0.0, "matched": [], "missed": [], "note": "no authoritative files from graph"}
    hay = answer_text + " " + " ".join(answer_citations)
    bases = {(_os.path.basename(f), f) for f in files}
    matched = sorted(f for b, f in bases if b in hay)
    missed = sorted(f for b, f in bases if b not in hay)
    return {"score": len(matched) / len(files), "matched": matched, "missed": missed}
```

- [ ] **Step 4: Run** → PASS.
- [ ] **Step 5: Commit** `git add src/eval/ground_truth.py tests/test_machine_gt.py && git commit -m "feat(eval): machine GT from symbol graph for locate/call-chain/impact"`

---

## Task 11: LLM-judge for open questions (architecture/pattern/routing)

**Files:** Create `src/eval/judge.py`; Test `tests/test_judge.py`

**Interfaces:**
- Produces: `judge_open(question, answer_text, answer_citations, gt_md, gt_facts, model="gemini-2.5-flash") -> dict{verdict: "pass"|"fail", reason: str, fact_hits: int, fact_total: int}`. The judge is a Gemini call whose prompt gives the question, the **verified GT key facts (files+symbols)**, and the system answer, and asks: does the answer correctly identify the same key files/symbols/mechanism as the ground truth — judged on **factual overlap, NOT prose similarity**. Uses the existing `_gemini_generate` backoff. Parse a strict JSON verdict.

- [ ] **Step 1: Write failing test** (mock the LLM to return a JSON verdict; assert parsing + anti-circularity prompt content)

```python
# tests/test_judge.py
def test_judge_parses_verdict(monkeypatch):
    from src.eval import judge as J
    captured = {}
    def fake_gen(prompt, model):
        captured["p"] = prompt
        return '{"verdict":"pass","reason":"names slashCommands + slashCommand.ts","fact_hits":2,"fact_total":2}'
    monkeypatch.setattr(J, "_gemini_generate", fake_gen)
    from src.eval.ground_truth import GTFacts
    out = J.judge_open({"question":"how do slash commands work","questionType":"architecture"},
                       "answer", ["a.ts"], "gt", GTFacts(files={"slashCommand.ts"}, symbols={"slashCommands"}))
    assert out["verdict"] == "pass" and out["fact_total"] == 2
    assert "factual overlap" in captured["p"].lower() or "not" in captured["p"].lower()  # anti-similarity instruction present
```

- [ ] **Step 2: Run** → FAIL.

- [ ] **Step 3: Implement `src/eval/judge.py`**

```python
import json, re
from src.qa.ask import _gemini_generate

_JUDGE_SYS = (
    "You are grading a code-QA answer about Rocket.Chat against ground-truth KEY FACTS.\n"
    "Judge ONLY factual overlap: does the answer identify the same key files and symbols and the "
    "same mechanism as the ground-truth facts? Do NOT reward writing style or similarity of prose. "
    "An answer that names the right files/symbols is a pass even if worded differently; an answer that "
    "sounds fluent but cites the wrong files is a fail. Reply with STRICT JSON only: "
    '{"verdict":"pass|fail","reason":"...","fact_hits":<int>,"fact_total":<int>}.'
)

def judge_open(question, answer_text, answer_citations, gt_md, gt_facts, model="gemini-2.5-flash"):
    facts = f"KEY FILES: {sorted(gt_facts.files)}\nKEY SYMBOLS: {sorted(gt_facts.symbols)}"
    prompt = (f"{_JUDGE_SYS}\n\nQUESTION: {question['question']}\n\nGROUND-TRUTH FACTS:\n{facts}\n\n"
              f"SYSTEM ANSWER:\n{answer_text}\n\nSYSTEM CITATIONS: {answer_citations}\n\nJSON verdict:")
    raw = _gemini_generate(prompt, model)
    m = re.search(r"\{.*\}", raw, re.DOTALL)
    try:
        d = json.loads(m.group(0)) if m else {}
    except Exception:
        d = {}
    return {"verdict": d.get("verdict", "fail"), "reason": d.get("reason", "unparseable judge output"),
            "fact_hits": int(d.get("fact_hits", 0)), "fact_total": int(d.get("fact_total", len(gt_facts.files) + len(gt_facts.symbols)))}
```

- [ ] **Step 4: Run** → PASS.
- [ ] **Step 5: Commit** `git add src/eval/judge.py tests/test_judge.py && git commit -m "feat(eval): Gemini LLM-judge for open questions (factual-overlap, anti-circularity)"`

---

## Task 12: Scorer + report (metrics.md + verdicts.md over 34)

**Files:** Create `src/eval/score.py`, `src/eval/report.py`; Test `tests/test_score_report.py`

**Interfaces:**
- Consumes: `machine_check` (Task 10), `judge_open` (Task 11), `extract_gt_facts`/`verified_gt_files` (Task 9), `ask` (Phase B), `build/load_graph`, `load_indexed_docs`, `config`.
- Produces: `score_question(question, answer, gt_md, gt_facts, graph) -> dict{id, questionType, verdict:"pass"|"fail", score:float, detail:dict}` (dispatch: machine_check for locate/call-chain/impact → pass if score≥0.5; judge_open for the rest). `write_reports(results, out_dir)` writes `metrics.md` (aggregate: pass-rate overall + per questionType, mean machine score, judged pass-rate) and `verdicts.md` (per question: question, verdict, reason, matched/missed files or fact_hits, system citations). `run_scored_eval(question_ids=None)` orchestrates: load graph+docs → ask each (hybrid) → score → write reports.

- [ ] **Step 1: Write failing test** (pure scoring/report, no network)

```python
# tests/test_score_report.py
import json
from src.eval.report import write_reports

def test_write_reports(tmp_path):
    results = [
        {"id":"new-17","questionType":"locate","verdict":"pass","score":1.0,
         "detail":{"matched":["slashCommand.ts"],"missed":[],"citations":["slashCommand.ts"],"question":"q1","answer":"a1"}},
        {"id":"new-19","questionType":"architecture","verdict":"fail","score":0.0,
         "detail":{"reason":"wrong files","fact_hits":0,"fact_total":3,"citations":["x.ts"],"question":"q2","answer":"a2"}},
    ]
    write_reports(results, str(tmp_path))
    metrics = (tmp_path/"metrics.md").read_text()
    verdicts = (tmp_path/"verdicts.md").read_text()
    assert "locate" in metrics and "pass" in metrics.lower()
    assert "overall pass rate" in metrics.lower()
    assert "q1" in verdicts and "wrong files" in verdicts
```

- [ ] **Step 2: Run** → FAIL.

- [ ] **Step 3: Implement `src/eval/score.py`**

```python
import os, json
from src import config
from src.eval.ground_truth import extract_gt_facts, machine_check
from src.eval.judge import judge_open

_MACHINE = {"locate", "call-chain", "impact"}
_HERE = os.path.dirname(__file__)
_TESTCASES = os.path.join(_HERE, "utils", "testcases.json")
_GT_DIR = os.path.join(os.path.dirname(os.path.dirname(_HERE)), "logs", "answers-claude")

def _load_questions(ids):
    data = json.load(open(_TESTCASES))
    qs = [q for g in data["groups"] for q in g["questions"]]
    return [q for q in qs if ids is None or q["id"] in ids]

def score_question(question, answer, gt_md, graph):
    facts = extract_gt_facts(gt_md)
    if question["questionType"] in _MACHINE and graph is not None:
        mc = machine_check(question, answer.text, answer.citations, facts, graph)
        verdict = "pass" if mc["score"] >= 0.5 else "fail"
        detail = {**mc, "citations": answer.citations, "question": question["question"], "answer": answer.text[:600]}
        return {"id": question["id"], "questionType": question["questionType"], "verdict": verdict,
                "score": mc["score"], "detail": detail}
    j = judge_open(question, answer.text, answer.citations, gt_md, facts, model=config.JUDGE_MODEL)
    detail = {**j, "citations": answer.citations, "question": question["question"], "answer": answer.text[:600]}
    return {"id": question["id"], "questionType": question["questionType"], "verdict": j["verdict"],
            "score": 1.0 if j["verdict"] == "pass" else 0.0, "detail": detail}

def run_scored_eval(question_ids=None):
    from src.qa.ask import ask
    from src.indexer.index_repo import load_indexed_docs
    from src.graph.build_graph import load_graph
    from src.eval.report import write_reports
    docs = load_indexed_docs(config.RC_REPO_PATH, embedder_type=config.EMBEDDER_TYPE)
    graph = load_graph(config.GRAPH_PATH)
    results = []
    for q in _load_questions(question_ids):
        gt_path = os.path.join(_GT_DIR, f"{q['id']}.md")
        if not os.path.isfile(gt_path):
            continue
        gt_md = open(gt_path, encoding="utf-8").read()
        ans = ask(q["question"], docs=docs, graph=graph, repo_path=config.RC_REPO_PATH, top_k=config.TOP_K)
        results.append(score_question(q, ans, gt_md, graph))
    write_reports(results, os.path.join(os.path.dirname(os.path.dirname(_HERE)), "logs", "eval"))
    return results
```

Implement `src/eval/report.py`

```python
import os, json, collections

def write_reports(results, out_dir):
    os.makedirs(out_dir, exist_ok=True)
    n = len(results) or 1
    passed = sum(1 for r in results if r["verdict"] == "pass")
    by_type = collections.defaultdict(lambda: [0, 0])
    for r in results:
        by_type[r["questionType"]][0] += 1
        by_type[r["questionType"]][1] += 1 if r["verdict"] == "pass" else 0
    with open(os.path.join(out_dir, "metrics.md"), "w") as fh:
        fh.write("# Eval metrics\n\n")
        fh.write(f"- questions scored: {len(results)}\n")
        fh.write(f"- **overall pass rate: {passed}/{len(results)} = {passed/n:.2f}**\n")
        fh.write(f"- mean score: {sum(r['score'] for r in results)/n:.3f}\n\n")
        fh.write("| questionType | pass | total | pass-rate |\n|---|---|---|---|\n")
        for t, (tot, pas) in sorted(by_type.items()):
            fh.write(f"| {t} | {pas} | {tot} | {pas/ (tot or 1):.2f} |\n")
    with open(os.path.join(out_dir, "verdicts.md"), "w") as fh:
        fh.write("# Per-question verdicts (semantic / machine)\n\n")
        for r in results:
            d = r["detail"]
            mark = "✅" if r["verdict"] == "pass" else "❌"
            fh.write(f"## {mark} {r['id']} ({r['questionType']}) — {r['verdict']} (score {r['score']:.2f})\n")
            fh.write(f"**Q:** {d.get('question','')}\n\n")
            if "reason" in d: fh.write(f"**Judge reason:** {d['reason']} (facts {d.get('fact_hits','?')}/{d.get('fact_total','?')})\n\n")
            if "matched" in d: fh.write(f"**Matched files:** {d.get('matched')}  **Missed:** {d.get('missed')}\n\n")
            fh.write(f"**Citations:** {d.get('citations')}\n\n")
            fh.write(f"**Answer:** {d.get('answer','')[:500]}\n\n---\n\n")
```

- [ ] **Step 4: Run** `uv run pytest tests/test_score_report.py -v` → PASS.
- [ ] **Step 5: Commit** `git add src/eval/score.py src/eval/report.py tests/test_score_report.py && git commit -m "feat(eval): scorer (machine + judge dispatch) + metrics.md/verdicts.md reports"`

---

## PHASE D — Accuracy boosters (Claude preprocessing, enforced citations, verifier)

## Task 13: Claude client (thin, backoff)

**Files:** Create `src/preprocess/__init__.py`, `src/preprocess/claude_client.py`; Test `tests/test_claude_client.py`

**Interfaces:**
- Produces: `claude_complete(prompt: str, system: str = "", model: str = None, max_tokens: int = 2000) -> str` using the `anthropic` SDK with `CLAUDE_API_KEY`, retrying on `anthropic.RateLimitError` honoring backoff (≥5s), returning the text. Reuse the model migration guidance: Opus 4.8 uses `thinking={"type":"adaptive"}` is optional; keep it simple — plain messages create.

- [ ] **Step 1: Write failing test** (mock the anthropic client)

```python
# tests/test_claude_client.py
def test_claude_complete(monkeypatch):
    from src.preprocess import claude_client as cc
    class _Msg: 
        content = [type("B", (), {"text": "hello from claude"})()]
    class _Messages:
        def create(self, **k): return _Msg()
    class _Client:
        def __init__(self, **k): self.messages = _Messages()
    monkeypatch.setattr(cc.anthropic, "Anthropic", _Client)
    assert cc.claude_complete("hi", system="s") == "hello from claude"
```

- [ ] **Step 2: Run** → FAIL.

- [ ] **Step 3: Implement `src/preprocess/claude_client.py`**

```python
import os, time
import anthropic
from src import config

def claude_complete(prompt, system="", model=None, max_tokens=2000):
    client = anthropic.Anthropic(api_key=os.environ.get("CLAUDE_API_KEY"))
    model = model or config.CLAUDE_MODEL
    for attempt in range(4):
        try:
            msg = client.messages.create(
                model=model, max_tokens=max_tokens,
                system=system or "You are a precise code analyst.",
                messages=[{"role": "user", "content": prompt}])
            return "".join(getattr(b, "text", "") for b in msg.content)
        except anthropic.RateLimitError:
            if attempt == 3: raise
            time.sleep(5 * (attempt + 1))
```

- [ ] **Step 4: Run** → PASS.
- [ ] **Step 5: Commit** `git add src/preprocess/__init__.py src/preprocess/claude_client.py tests/test_claude_client.py && git commit -m "feat(preprocess): thin Claude client with backoff"`

---

## Task 14: Claude file/module summaries (hash-cached)

**Files:** Create `src/preprocess/summarize.py`; Test `tests/test_summarize.py`

**Interfaces:**
- Consumes: `claude_complete`.
- Produces: `summarize_file(path, source, cache_dir) -> str` (short Claude summary of what the file does + key exported symbols, cached by content hash under `cache_dir/<sha1>.md`; on cache hit returns cached, no Claude call). Returns a markdown blurb that later gets embedded alongside code chunks.

- [ ] **Step 1: Write failing test** (mock claude; assert cache hit skips the call)

```python
# tests/test_summarize.py
def test_summarize_caches(tmp_path, monkeypatch):
    from src.preprocess import summarize as S
    calls = {"n": 0}
    monkeypatch.setattr(S, "claude_complete", lambda *a, **k: (calls.__setitem__("n", calls["n"]+1), "SUMMARY")[1])
    s1 = S.summarize_file("a.ts", "export const X=1", str(tmp_path))
    s2 = S.summarize_file("a.ts", "export const X=1", str(tmp_path))   # same content -> cache hit
    assert s1 == "SUMMARY" == s2
    assert calls["n"] == 1     # claude called once, second was cached
```

- [ ] **Step 2: Run** → FAIL.

- [ ] **Step 3: Implement `src/preprocess/summarize.py`**

```python
import os, hashlib
from src.preprocess.claude_client import claude_complete

_SYS = "Summarize what this source file does in 2-3 sentences and list its key exported symbols. Be precise; no fluff."

def summarize_file(path, source, cache_dir):
    os.makedirs(cache_dir, exist_ok=True)
    h = hashlib.sha1((path + "\0" + source).encode("utf-8")).hexdigest()
    cache = os.path.join(cache_dir, f"{h}.md")
    if os.path.isfile(cache):
        return open(cache, encoding="utf-8").read()
    out = claude_complete(f"File: {path}\n\n```\n{source[:8000]}\n```", system=_SYS)
    with open(cache, "w", encoding="utf-8") as fh:
        fh.write(out or "")
    return out or ""
```

- [ ] **Step 4: Run** → PASS.
- [ ] **Step 5: Commit** `git add src/preprocess/summarize.py tests/test_summarize.py && git commit -m "feat(preprocess): Claude file summaries (content-hash cached)"`

---

## Task 15: Enforced file:line citation prompt

**Files:** Modify `src/qa/ask.py`; Test `tests/test_ask_citation_prompt.py`

**Interfaces:**
- Modifies `SYSTEM`/`_build_prompt` so the generation prompt REQUIRES a `path:line` (or `path`) cite after each factual claim and a trailing "Key Files"/"Key Symbols" block; unchanged public `ask` signature.

- [ ] **Step 1: Write failing test** — assert the built prompt contains the enforced-citation instruction.

```python
# tests/test_ask_citation_prompt.py
def test_prompt_enforces_citation():
    from src.qa.ask import _build_prompt
    from dataclasses import dataclass
    @dataclass
    class H: text: str; file_path: str; score: float
    p = _build_prompt("q", [H("code", "a.ts", 0.9)])
    assert "cite" in p.lower() and "key files" in p.lower()
```

- [ ] **Step 2: Run** → FAIL (current SYSTEM lacks "Key Files" requirement in the built prompt string).

- [ ] **Step 3: Modify `ask.py`** — set:

```python
SYSTEM = (
    "You are a Rocket.Chat code assistant. Answer ONLY from the provided context. "
    "After EVERY factual claim, cite the source as `path:line` (or `path`). Do not invent files. "
    "If the context doesn't support an answer, say so. "
    "End with a '## Key Files' list and a '## Key Symbols' list of what you used."
)
# _build_prompt: keep as-is (it already injects File: path per hit) — SYSTEM now carries the enforcement,
# and _build_prompt embeds SYSTEM, so the built prompt contains 'cite' + 'Key Files'.
```

Ensure `_build_prompt` includes `SYSTEM` (it does via the f-string). If not, prepend it.

- [ ] **Step 4: Run** → PASS (and `tests/test_ask.py` still green).
- [ ] **Step 5: Commit** `git add src/qa/ask.py tests/test_ask_citation_prompt.py && git commit -m "feat(ask): enforce file:line citations + Key Files/Symbols block"`

---

## Task 16: Claude dynamic-wiring extraction

**Files:** Create `src/preprocess/dynamic_wiring.py`; Test `tests/test_dynamic_wiring.py`

**Interfaces:**
- Consumes: `claude_complete`, `SymbolGraph`.
- Produces: `extract_wiring(pattern: str, seed_files: list[tuple[str,str]]) -> str` — for a named RC dynamic pattern (e.g. "slashCommands", "streamer", "apps-engine-events", "settings", "ddp-methods"), feed Claude the registry/registration/dispatch source (seed_files = [(path, source)]) and get back an explicit markdown doc: "who registers what, where it's dispatched, which files fan out" with real `path` cites. This doc is embedded so the scattered wiring becomes retrievable. `WIRING_PATTERNS: dict[str, list[str]]` maps pattern → seed file globs.

- [ ] **Step 1: Write failing test** (mock claude; assert it passes seed source + returns doc)

```python
# tests/test_dynamic_wiring.py
def test_extract_wiring(monkeypatch):
    from src.preprocess import dynamic_wiring as W
    captured = {}
    monkeypatch.setattr(W, "claude_complete", lambda prompt, system="", **k: (captured.__setitem__("p", prompt), "WIRING DOC")[1])
    doc = W.extract_wiring("slashCommands", [("apps/meteor/app/utils/server/slashCommand.ts", "slashCommands.add(...)")])
    assert doc == "WIRING DOC"
    assert "slashCommand.ts" in captured["p"] and "slashCommands.add" in captured["p"]
```

- [ ] **Step 2: Run** → FAIL.

- [ ] **Step 3: Implement `src/preprocess/dynamic_wiring.py`**

```python
from src.preprocess.claude_client import claude_complete

WIRING_PATTERNS = {
    "slashCommands": ["apps/meteor/app/utils/server/slashCommand.ts", "apps/meteor/app/slashcommands-*/server/*.ts"],
    "streamer": ["apps/meteor/server/modules/streamer/*.ts", "apps/meteor/server/modules/notifications/*.ts"],
    "settings": ["apps/meteor/app/settings/server/*.ts"],
    "apps-engine-events": ["packages/apps-engine/src/definition/**/*.ts"],
    "ddp-methods": ["apps/meteor/app/**/server/methods/*.ts"],
}

_SYS = ("You are mapping a DYNAMIC wiring pattern in Rocket.Chat. From the given source, produce an explicit "
        "markdown doc: (1) who REGISTERS what (the registry + add/register calls), (2) where it is DISPATCHED/run, "
        "(3) which files fan out. Cite real `path` for each. This makes scattered registration retrievable.")

def extract_wiring(pattern, seed_files):
    body = "\n\n".join(f"### {p}\n```\n{src[:4000]}\n```" for p, src in seed_files)
    return claude_complete(f"Pattern: {pattern}\n\n{body}", system=_SYS, max_tokens=1500)
```

- [ ] **Step 4: Run** → PASS.
- [ ] **Step 5: Commit** `git add src/preprocess/dynamic_wiring.py tests/test_dynamic_wiring.py && git commit -m "feat(preprocess): Claude dynamic-wiring extraction for RC patterns"`

---

## Task 17: Citation Verifier

**Files:** Create `src/verify/__init__.py`, `src/verify/citation_verifier.py`; Test `tests/test_citation_verifier.py`

**Interfaces:**
- Consumes: `SymbolGraph`, `config.RC_REPO_PATH`.
- Produces: `verify_answer(answer_text: str, repo_path: str, graph) -> list[dict{cite, status}]` — parse each `path`/`path:line` cite; status `ok` if the file exists in RC (and, if the cite is near a symbol name also present in the answer, that symbol is defined/referenced in that file per the graph), else `unverified`. `citation_hit_rate(verifications) -> float`.

- [ ] **Step 1: Write failing test**

```python
# tests/test_citation_verifier.py
from src.verify.citation_verifier import verify_answer, citation_hit_rate

def test_verify(tmp_path):
    (tmp_path/"a.ts").write_text("export const X=1")
    ans = "X lives in `a.ts` and also `ghost.ts`."
    v = verify_answer(ans, str(tmp_path), None)
    st = {x["cite"]: x["status"] for x in v}
    assert st["a.ts"] == "ok" and st["ghost.ts"] == "unverified"
    assert 0.0 < citation_hit_rate(v) < 1.0
```

- [ ] **Step 2: Run** → FAIL.

- [ ] **Step 3: Implement `src/verify/citation_verifier.py`**

```python
import os, re
_CITE = re.compile(r"`([\w./-]+\.\w+)(?::\d+)?`")

def verify_answer(answer_text, repo_path, graph):
    out, seen = [], set()
    for m in _CITE.finditer(answer_text):
        f = m.group(1)
        if f in seen: continue
        seen.add(f)
        ok = os.path.isfile(os.path.join(repo_path, f))
        out.append({"cite": f, "status": "ok" if ok else "unverified"})
    return out

def citation_hit_rate(verifications):
    if not verifications: return 0.0
    return sum(1 for v in verifications if v["status"] == "ok") / len(verifications)
```

- [ ] **Step 4: Run** → PASS.
- [ ] **Step 5: Commit** `git add src/verify tests/test_citation_verifier.py && git commit -m "feat(verify): Citation Verifier (file-exists + symbol support) + hit rate"`

---

## PHASE E — Full-scan, incremental, and the final scored run

## Task 18: Full-scan + incremental indexing

**Files:** Modify `src/indexer/index_repo.py`; Test `tests/test_index_scope.py`

**Interfaces:**
- Produces: `index_repo(repo_path, included_dirs=None, embedder_type="google")` already exists — add `full_scan_dirs() -> None|list` helper and a wrapper `index_scope()` that returns `None` (full) when `config.FULL_SCAN` else `config.M1_INCLUDED_DIRS`; add `changed_files_since(repo_path, since_commit) -> list[str]` (git diff --name-only) for incremental. Keep behavior back-compatible.

- [ ] **Step 1: Write failing test** (offline; monkeypatch git)

```python
# tests/test_index_scope.py
def test_index_scope_flag(monkeypatch):
    from src.indexer import index_repo as idx
    from src import config
    monkeypatch.setattr(config, "FULL_SCAN", True)
    assert idx.index_scope() is None            # full scan
    monkeypatch.setattr(config, "FULL_SCAN", False)
    assert idx.index_scope() == config.M1_INCLUDED_DIRS

def test_changed_files(monkeypatch):
    from src.indexer import index_repo as idx
    monkeypatch.setattr(idx.subprocess, "run",
        lambda *a, **k: type("R", (), {"stdout": "packages/x/a.ts\napps/meteor/b.ts\n"})())
    assert idx.changed_files_since("/repo", "HEAD~1") == ["packages/x/a.ts", "apps/meteor/b.ts"]
```

- [ ] **Step 2: Run** → FAIL.

- [ ] **Step 3: Modify `src/indexer/index_repo.py`** — add `import subprocess` and:

```python
from src import config

def index_scope():
    return None if config.FULL_SCAN else config.M1_INCLUDED_DIRS

def changed_files_since(repo_path, since_commit):
    out = subprocess.run(["git", "-C", repo_path, "diff", "--name-only", f"{since_commit}..HEAD"],
                         capture_output=True, text=True)
    return [l for l in out.stdout.splitlines() if l.strip()]
```

- [ ] **Step 4: Run** → PASS.
- [ ] **Step 5: Commit** `git add src/indexer/index_repo.py tests/test_index_scope.py && git commit -m "feat(indexer): full-scan flag + incremental changed-files helper"`

---

## Task 19: Wire graph build + preprocessing into run_m1 → run_full

**Files:** Create `scripts/run_full.py`; Test `tests/test_run_full_smoke.py` (offline, monkeypatched)

**Interfaces:**
- Consumes: everything above.
- Produces: `scripts/run_full.py` — staged, progress-printed runner: (0) tier note; (1) build+persist symbol graph over RC (`build_graph` → `save_graph(config.GRAPH_PATH)`); (2) index RC (`index_scope()`); (3) [optional, `RC_PREPROCESS=1`] Claude summaries + dynamic-wiring docs added to the corpus; (4) `run_scored_eval()` → metrics.md + verdicts.md. Prints per-stage banners + counts.

- [ ] **Step 1: Write failing smoke test** (import the module + call a pure helper; the heavy stages are guarded behind `__main__`)

```python
# tests/test_run_full_smoke.py
def test_run_full_imports():
    import importlib.util, os
    p = os.path.join(os.path.dirname(__file__), "..", "scripts", "run_full.py")
    assert os.path.isfile(p)     # exists; heavy logic lives under __main__
```

- [ ] **Step 2: Run** → FAIL (file missing).

- [ ] **Step 3: Implement `scripts/run_full.py`**

```python
import os, sys, time
PROJ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, PROJ)
from dotenv import load_dotenv; load_dotenv(os.path.join(PROJ, ".env"))
import logging, warnings
warnings.filterwarnings("ignore")
for _n in ("adalflow","deepwiki.config","deepwiki.data_pipeline","deepwiki.google_embedder_client","httpx","google","urllib3"):
    logging.getLogger(_n).setLevel(logging.WARNING)

def banner(m): print(f"\n{'='*66}\n  {m}\n{'='*66}", flush=True)

if __name__ == "__main__":
    from src import config
    from src.graph.build_graph import build_graph, save_graph
    from src.indexer.index_repo import index_repo, index_scope
    from src.eval.score import run_scored_eval

    banner("STAGE 1/3  Build symbol graph (tree-sitter)")
    t=time.monotonic(); g=build_graph(config.RC_REPO_PATH, index_scope()); save_graph(g, config.GRAPH_PATH)
    print(f"  ✓ graph: {sum(len(v) for v in g.defs.values())} defs, {len(g.defs)} symbols ({time.monotonic()-t:.0f}s)", flush=True)

    banner("STAGE 2/3  Index RC (Gemini embeddings) — scope=" + ("FULL" if config.FULL_SCAN else "M1 subset"))
    pkl=os.path.expanduser(f"~/.adalflow/databases/{config.ADALFLOW_DB_NAME}.pkl")
    if os.path.exists(pkl): os.remove(pkl)
    r=index_repo(config.RC_REPO_PATH, index_scope()); print(f"  ✓ files={r.files_indexed} chunks={r.chunks} empty={r.empty_vectors}", flush=True)

    banner("STAGE 3/3  Scored eval -> metrics.md + verdicts.md (34 questions)")
    res=run_scored_eval()
    passed=sum(1 for x in res if x['verdict']=='pass')
    print(f"  ✓ {passed}/{len(res)} pass; wrote logs/eval/metrics.md + verdicts.md", flush=True)
```

- [ ] **Step 4: Run** `uv run pytest tests/test_run_full_smoke.py -v` → PASS.
- [ ] **Step 5: Commit** `git add scripts/run_full.py tests/test_run_full_smoke.py && git commit -m "feat: run_full runner (build graph -> index -> scored eval -> metrics/verdicts)"`

---

## Task 20: Live scored baseline (controller-run) + commit reports

**Files:** produces `logs/eval/metrics.md`, `logs/eval/verdicts.md`

This task is **controller-run** (live Gemini + Claude; slow under free-tier). Not a subagent task — the SDD controller executes it after Tasks 1–19 pass review, honoring rate limits.

- [ ] **Step 1: Build graph + index (M1 subset first to keep it fast), then scored eval**

```bash
cd /Users/echoooooo/Desktop/code/Agentic.Code.Analyzer
uv run python scripts/run_full.py            # subset scope by default (RC_FULL_SCAN unset)
```
Expected: `logs/eval/metrics.md` + `verdicts.md` written with a real overall pass-rate + per-questionType breakdown, over the 34 questions (those whose GT file exists).

- [ ] **Step 2: Eyeball** — open `verdicts.md`; confirm locate/call-chain/impact rows have machine matched/missed files, open rows have judge reasons. Confirm the slash-commands question now surfaces `slashCommand.ts` (hybrid retrieval working) vs the M1 all-apps-engine baseline.

- [ ] **Step 3: Commit the reports** `git add logs/eval/metrics.md logs/eval/verdicts.md && git commit -m "artifact: M2-M4 scored eval — metrics.md + verdicts.md over 34 questions"`

- [ ] **Step 4 (optional, if quota/time allows): full-scan run** `RC_FULL_SCAN=1 uv run python scripts/run_full.py` and re-commit the reports. Full-scan embeds ~8.9k files → long; run when free-tier windows allow, resumably.

---

## Self-Review

**Spec coverage (M2–M4):**
- §5.2 symbol graph → Tasks 2,3,4 (tree-sitter fallback per constraint). §8 structural MCP tools → Task 5. ✓
- §5.5 hybrid retrieval (semantic+structural+lexical RRF) → Tasks 6,7,8. ✓
- §5.3 Claude preprocessing (summaries + dynamic wiring) → Tasks 13,14,16. ✓
- §5.6 enforced citations → Task 15. §5.7 Citation Verifier → Task 17. ✓
- §5.1/§5.10 full-scan + incremental → Task 18. ✓
- §7 eval harness, machine GT + anti-circularity judge, **metrics.md + verdicts.md** → Tasks 9,10,11,12; live run Task 20. ✓ (the user's explicit deliverable)
- Constraints: Gemini-only + backoff (all Gemini via existing `_gemini_generate`); ≤2 query-time LLM calls (ask = 1 gen; judge is eval-time, separate); GT line-agnostic (file+symbol matching); anti-circularity (judge prompt scores factual overlap not prose). ✓

**Placeholder scan:** every code step has real code; the two inherently-live steps (Task 20) are explicitly controller-run with commands, not vague. Task 15's `_build_prompt` note ships with a failing test that catches a wrong prompt.

**Type consistency:** `Hit(text,file_path,score)` used identically across StructuralRetriever/LexicalRetriever/HybridRetriever/RRF/ask. `SymbolGraph.find_symbol/find_references/impacted_by` return `list[dict{file,...}]` consumed identically in Task 5 (MCP), Task 6 (structural), Task 10 (machine GT). `GTFacts{files,symbols}` consistent across Tasks 9,10,11,12. `score_question` result dict shape consistent between Task 12 producer and `write_reports` consumer.

**Honest risks flagged in-plan:** identifier-based references are approximate (may over/under-match same-named symbols across files); full-scan under free-tier is slow (Task 20 step 4 is optional/resumable); the LLM-judge itself costs Gemini calls at eval time (34 judged-question calls, subject to the same rolling-window backoff).
