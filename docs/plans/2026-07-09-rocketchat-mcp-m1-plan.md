# Rocket.Chat Code-QA MCP — M1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up an end-to-end free-tier pipeline that indexes a subset of the Rocket.Chat monorepo with Gemini embeddings, answers a code question over MCP with file-cited output, and records a simple trace report (query → retrieved files → answer → citations) — no automated scoring yet.

**Architecture:** Vendor deepwiki-open's Python `api/` package as `deepwiki/` and reuse its `DatabaseManager` (index → FAISS-backed `LocalDB`) with `embedder_type="google"`. Build our own thin modules on top: an indexer wrapper (full-scan a package subset), an `ask` core (Gemini-embed the query → cosine top-k over indexed vectors → Gemini-Flash generation with enforced file citations), an MCP server exposing one `ask` tool, and a trace runner that records each run to a JSONL trace plus the simplest markdown report. Automated scoring (fact-point recall, citation verification) is deferred to M2, when the symbol graph provides machine-checkable ground truth.

**Tech Stack:** Python 3.11, `uv`, adalflow + faiss-cpu (from deepwiki-open), `google-generativeai` (Gemini embed + Flash), `mcp` (MCP server), numpy, pytest.

## Global Constraints

- Python floor: **3.11** (deepwiki-open requires `^3.11`).
- Embedding provider: **Gemini `gemini-embedding-001`** via `embedder_type="google"` — never OpenAI. Set `DEEPWIKI_EMBEDDER_TYPE=google` and `GOOGLE_API_KEY` in `.env`.
- Generation model string: **`gemini-2.5-flash`** (exact string, free tier).
- Query-time LLM budget: **≤ 2 Gemini generation calls per question** (Flash free tier ~250–1500 RPD). Retrieval and the trace runner use **zero** LLM calls.
- M1 does **not** score answers — it only **records traces**. Automated file+symbol scoring and GT verification land in M2 (they need the symbol graph for machine-checkable ground truth). GT (`logs/answers-claude`) is for **manual eyeballing** against the trace only.
- Never write hand-authored answers into any measured path; when scoring arrives, GT comes only from `logs/answers-claude` + the RC checkout.
- `.env` is git-ignored and must never be staged (already enforced by `.gitignore`).
- Index scope for M1: RC packages subset only (defined in `M1_INCLUDED_DIRS`), not the full 8.9k-file scan.
- Commit after every green task; do not push.

**Reference material already on disk:**
- RC monorepo (blobless clone): `/tmp/analysis/rocketchat`
- deepwiki-open source: `/tmp/analysis/deepwiki-open`
- Eval targets (in project): `src/eval/utils/testcases.json` (27 Q), `logs/answers-claude/*.md` (GT, manual reference)

---

## File Structure

```
Agentic.Code.Analyzer/
├── deepwiki/                      # vendored deepwiki-open api/ package (Task 1)
│   ├── __init__.py
│   ├── config.py  data_pipeline.py  rag.py  tools/embedder.py  google_embedder_client.py …
│   └── config/{embedder.json,generator.json,repo.json}
├── src/
│   ├── config.py                  # M1 constants: paths, model strings, included dirs (Task 2)
│   ├── indexer/
│   │   └── index_repo.py          # full-scan a package subset → LocalDB (Task 5)
│   ├── qa/
│   │   ├── retriever.py           # load indexed docs + Gemini-embed query + cosine top-k (Task 6)
│   │   └── ask.py                 # retrieve → Gemini-Flash generate w/ citations (Task 7)
│   ├── mcp_server/
│   │   └── server.py              # FastMCP server exposing `ask` (Task 8)
│   └── eval/
│       ├── utils/testcases.json   # EXISTS (do not modify)
│       └── trace_run.py           # run ask() over testcases → trace.jsonl + trace-report.md (Task 9)
├── logs/answers-claude/*.md       # EXISTS (GT, manual reference only in M1)
├── tests/
│   ├── fixtures/mini_repo/        # tiny TS repo for fast index/retrieve tests (Task 3)
│   ├── test_embedder_google.py  test_indexer.py  test_retriever.py
│   ├── test_ask.py  test_mcp_server.py  test_trace_run.py
├── pyproject.toml                 # our deps (Task 1)
├── .env                           # EXISTS (has keys); git-ignored
└── logs/eval/{trace.jsonl,trace-report.md}   # trace outputs (Task 9)
```

---

## Task 1: Vendor deepwiki-open + project env

**Files:**
- Create: `deepwiki/` (copied from `/tmp/analysis/deepwiki-open/api/`)
- Create: `pyproject.toml`
- Create: `tests/test_import.py`

**Interfaces:**
- Produces: importable package `deepwiki` exposing `deepwiki.data_pipeline.DatabaseManager`, `deepwiki.tools.embedder.get_embedder`, `deepwiki.config.configs`.

- [ ] **Step 1: Vendor the upstream package and fix imports**

```bash
cd /Users/echoooooo/Desktop/code/Agentic.Code.Analyzer
cp -R /tmp/analysis/deepwiki-open/api ./deepwiki
# upstream imports itself as `api.*`; rename to `deepwiki.*`
grep -rl "from api\.\|import api\." deepwiki | xargs sed -i '' 's/from api\./from deepwiki./g; s/import api\./import deepwiki./g'
# provide a package marker if missing
touch deepwiki/__init__.py
```

- [ ] **Step 2: Write `pyproject.toml`**

```toml
[project]
name = "rc-code-qa-mcp"
version = "0.1.0"
requires-python = ">=3.11"
dependencies = [
  "adalflow>=0.1.0",
  "faiss-cpu>=1.7.4",
  "google-generativeai>=0.3.0",
  "numpy>=1.24.0",
  "tiktoken>=0.5.0",
  "jinja2>=3.1.2",
  "python-dotenv>=1.0.0",
  "mcp>=1.2.0",
]

[dependency-groups]
dev = ["pytest>=7.0.0"]
```

- [ ] **Step 3: Write the failing import test**

```python
# tests/test_import.py
def test_deepwiki_package_imports():
    from deepwiki.data_pipeline import DatabaseManager
    from deepwiki.tools.embedder import get_embedder
    from deepwiki.config import configs
    assert "embedder_google" in configs
    assert configs["embedder_google"]["model_kwargs"]["model"] == "gemini-embedding-001"
```

- [ ] **Step 4: Install and run**

```bash
uv sync
uv run pytest tests/test_import.py -v
```
Expected: PASS. If an upstream module fails to import due to an unused optional client (e.g. bedrock/azure), that's fine only if the three symbols above import; otherwise fix the specific `from deepwiki.` line the traceback points at.

- [ ] **Step 5: Commit**

```bash
git add deepwiki pyproject.toml uv.lock tests/test_import.py
git commit -m "chore: vendor deepwiki-open api as deepwiki package + project env"
```

---

## Task 2: M1 config constants

**Files:**
- Create: `src/__init__.py`, `src/config.py`
- Test: `tests/test_config.py`

**Interfaces:**
- Produces: `src/config.py` with `RC_REPO_PATH: str`, `GEN_MODEL = "gemini-2.5-flash"`, `EMBEDDER_TYPE = "google"`, `TOP_K = 20`, `M1_INCLUDED_DIRS: list[str]`, `ADALFLOW_DB_NAME: str`.

- [ ] **Step 1: Write the failing test**

```python
# tests/test_config.py
from src import config

def test_config_values():
    assert config.EMBEDDER_TYPE == "google"
    assert config.GEN_MODEL == "gemini-2.5-flash"
    assert config.TOP_K == 20
    # M1 indexes a real, verified RC package subset
    assert "packages/apps-engine" in config.M1_INCLUDED_DIRS
    assert "apps/meteor/app/utils/server" in config.M1_INCLUDED_DIRS
```

- [ ] **Step 2: Run to verify it fails**

Run: `uv run pytest tests/test_config.py -v` — Expected: FAIL (`ModuleNotFoundError: src.config`).

- [ ] **Step 3: Write `src/config.py`**

```python
# src/config.py
import os

# Local RC checkout used for indexing + (later) GT verification.
RC_REPO_PATH = os.environ.get("RC_REPO_PATH", "/tmp/analysis/rocketchat")

EMBEDDER_TYPE = "google"          # -> configs["embedder_google"] -> gemini-embedding-001
GEN_MODEL = "gemini-2.5-flash"    # free-tier generation
TOP_K = 20                        # retrieval depth (matches deepwiki default)

# M1 scope: a verified subset that covers several testcase subsystems
# (slash commands live under apps/meteor/app/utils/server; apps-engine + core-services in packages).
M1_INCLUDED_DIRS = [
    "packages/apps-engine",
    "packages/core-services",
    "packages/models",
    "apps/meteor/app/utils/server",
    "apps/meteor/server/modules/streamer",
]

# LocalDB is keyed by the repo dir basename; RC checkout basename is "rocketchat".
ADALFLOW_DB_NAME = os.path.basename(RC_REPO_PATH.rstrip("/"))
```

Touch `src/__init__.py` (empty).

- [ ] **Step 4: Run to verify it passes**

Run: `uv run pytest tests/test_config.py -v` — Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/__init__.py src/config.py tests/test_config.py
git commit -m "feat: M1 config constants (Gemini models, RC path, index scope)"
```

---

## Task 3: Test fixture — a tiny TS repo

**Files:**
- Create: `tests/fixtures/mini_repo/src/commands.ts`
- Create: `tests/fixtures/mini_repo/README.md`
- Test: `tests/test_fixture.py`

**Interfaces:**
- Produces: `tests/fixtures/mini_repo/` — a 2-file repo used by later index/retrieve tests so they don't depend on the multi-GB RC checkout or the network.

- [ ] **Step 1: Create the fixture files**

```typescript
// tests/fixtures/mini_repo/src/commands.ts
export const slashCommands = {
    commands: {} as Record<string, unknown>,
    add(command: string, callback: () => void): void {
        this.commands[command] = callback;
    },
    run(command: string): void {
        const cb = this.commands[command];
        if (typeof cb === "function") cb();
    },
};
```

```markdown
<!-- tests/fixtures/mini_repo/README.md -->
Mini fixture repo. `slashCommands.add` registers a command; `slashCommands.run` dispatches it.
```

- [ ] **Step 2: Write + run a presence test**

```python
# tests/test_fixture.py
import os
def test_fixture_exists():
    base = os.path.join(os.path.dirname(__file__), "fixtures", "mini_repo")
    assert os.path.isfile(os.path.join(base, "src", "commands.ts"))
```

Run: `uv run pytest tests/test_fixture.py -v` — Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add tests/fixtures/mini_repo tests/test_fixture.py
git commit -m "test: add mini TS fixture repo for index/retrieve tests"
```

---

## Task 4: Gemini embedding smoke test

**Files:**
- Test: `tests/test_embedder_google.py`

**Interfaces:**
- Consumes: `deepwiki.tools.embedder.get_embedder` (verified signature: `get_embedder(embedder_type="google") -> adal.Embedder`).
- Produces: confidence that the free-tier Gemini embedding path returns a non-empty vector — nothing importable.

This task is a live-API smoke test (needs `GOOGLE_API_KEY`). It gate-checks the free-tier key before the heavier indexing task.

- [ ] **Step 1: Write the test**

```python
# tests/test_embedder_google.py
import os
import pytest
from dotenv import load_dotenv

load_dotenv()

@pytest.mark.skipif(not os.environ.get("GOOGLE_API_KEY"), reason="no GOOGLE_API_KEY")
def test_google_embedder_returns_vector():
    from deepwiki.tools.embedder import get_embedder
    embedder = get_embedder(embedder_type="google")
    out = embedder(input="slashCommands.add registers a slash command")
    # adalflow Embedder returns an EmbedderOutput with .data[0].embedding
    vec = out.data[0].embedding
    assert vec is not None and len(vec) > 0
```

- [ ] **Step 2: Run**

Run: `uv run pytest tests/test_embedder_google.py -v`
Expected: PASS (a real Gemini embedding vector). If it errors with a 429, the free-tier RPM was hit — wait and rerun; if 400/permission, the key lacks embedding access — stop and tell the user.

- [ ] **Step 3: Commit**

```bash
git add tests/test_embedder_google.py
git commit -m "test: smoke-test Gemini free-tier embedding path"
```

---

## Task 5: Indexer wrapper (full-scan a package subset)

**Files:**
- Create: `src/indexer/__init__.py`, `src/indexer/index_repo.py`
- Test: `tests/test_indexer.py`

**Interfaces:**
- Consumes: `deepwiki.data_pipeline.DatabaseManager` (verified: `prepare_database(repo_url_or_path, repo_type=None, embedder_type="google", included_dirs=[...]) -> list[Document]`; each Document has `.text`, `.vector`, `.meta_data["file_path"]`).
- Produces: `index_repo(repo_path: str, included_dirs: list[str], embedder_type: str = "google") -> IndexResult` where `IndexResult` is a dataclass `{docs: list, files_indexed: int, chunks: int, empty_vectors: int}`. Also `load_indexed_docs(repo_path: str, embedder_type="google", included_dirs=None) -> list` returning the persisted transformed docs (via a fresh `DatabaseManager.prepare_database`, which loads the existing `.pkl` when present).

- [ ] **Step 1: Write the failing test (uses the mini fixture, real Gemini embed)**

```python
# tests/test_indexer.py
import os, pytest
from dotenv import load_dotenv
load_dotenv()

FIXTURE = os.path.join(os.path.dirname(__file__), "fixtures", "mini_repo")

@pytest.mark.skipif(not os.environ.get("GOOGLE_API_KEY"), reason="no GOOGLE_API_KEY")
def test_index_mini_repo_produces_embedded_docs():
    from src.indexer.index_repo import index_repo
    res = index_repo(FIXTURE, included_dirs=["src"], embedder_type="google")
    assert res.files_indexed >= 1          # commands.ts was read
    assert res.chunks >= 1
    assert res.empty_vectors == 0          # every chunk got a Gemini vector
    # file_path metadata is preserved (needed later for citations)
    assert any("commands.ts" in d.meta_data.get("file_path", "") for d in res.docs)
```

- [ ] **Step 2: Run to verify it fails**

Run: `uv run pytest tests/test_indexer.py -v` — Expected: FAIL (`ModuleNotFoundError`).

- [ ] **Step 3: Implement**

```python
# src/indexer/index_repo.py
from dataclasses import dataclass
from deepwiki.data_pipeline import DatabaseManager


@dataclass
class IndexResult:
    docs: list
    files_indexed: int
    chunks: int
    empty_vectors: int


def _empty_vec_count(docs) -> int:
    n = 0
    for d in docs:
        v = getattr(d, "vector", None)
        if v is None or (hasattr(v, "__len__") and len(v) == 0):
            n += 1
    return n


def index_repo(repo_path: str, included_dirs: list[str], embedder_type: str = "google") -> IndexResult:
    """Full-scan the given dirs of a LOCAL repo and build/persist the LocalDB.

    included_dirs is inclusion-mode: only those dirs are read (M1 subset). Passing
    no included_dirs would scan the whole repo (that is the M3/M4 full-scan path).
    """
    manager = DatabaseManager()
    docs = manager.prepare_database(
        repo_url_or_path=repo_path,
        repo_type=None,
        embedder_type=embedder_type,
        included_dirs=included_dirs,
    )
    files = {d.meta_data.get("file_path") for d in docs if d.meta_data.get("file_path")}
    return IndexResult(
        docs=docs,
        files_indexed=len(files),
        chunks=len(docs),
        empty_vectors=_empty_vec_count(docs),
    )


def load_indexed_docs(repo_path: str, embedder_type: str = "google", included_dirs: list[str] | None = None) -> list:
    """Load previously-persisted transformed docs (prepare_database loads the .pkl if present)."""
    manager = DatabaseManager()
    return manager.prepare_database(
        repo_url_or_path=repo_path,
        repo_type=None,
        embedder_type=embedder_type,
        included_dirs=included_dirs or [],
    )
```

Touch `src/indexer/__init__.py`.

- [ ] **Step 4: Run to verify it passes**

Run: `uv run pytest tests/test_indexer.py -v` — Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/indexer tests/test_indexer.py
git commit -m "feat: indexer wrapper (inclusion-mode full-scan, Gemini embeddings, coverage report)"
```

---

## Task 6: Retriever (Gemini-embed query → cosine top-k)

**Files:**
- Create: `src/qa/__init__.py`, `src/qa/retriever.py`
- Test: `tests/test_retriever.py`

**Interfaces:**
- Consumes: `deepwiki.tools.embedder.get_embedder`; `IndexResult.docs` / `load_indexed_docs` from Task 5 (each doc has `.text`, `.vector`, `.meta_data["file_path"]`).
- Produces: `Retriever(docs: list, embedder_type="google")` with `.retrieve(query: str, top_k: int) -> list[Hit]`; `Hit` is a dataclass `{text: str, file_path: str, score: float}`, sorted by descending cosine score.

- [ ] **Step 1: Write the failing test**

```python
# tests/test_retriever.py
import os, pytest
from dotenv import load_dotenv
load_dotenv()
FIXTURE = os.path.join(os.path.dirname(__file__), "fixtures", "mini_repo")

@pytest.mark.skipif(not os.environ.get("GOOGLE_API_KEY"), reason="no GOOGLE_API_KEY")
def test_retriever_ranks_relevant_chunk_first():
    from src.indexer.index_repo import index_repo
    from src.qa.retriever import Retriever
    docs = index_repo(FIXTURE, included_dirs=["src"], embedder_type="google").docs
    r = Retriever(docs, embedder_type="google")
    hits = r.retrieve("how are slash commands registered", top_k=3)
    assert len(hits) >= 1
    assert "commands.ts" in hits[0].file_path
    assert hits[0].score >= hits[-1].score      # sorted descending
```

- [ ] **Step 2: Run to verify it fails**

Run: `uv run pytest tests/test_retriever.py -v` — Expected: FAIL (`ModuleNotFoundError`).

- [ ] **Step 3: Implement**

```python
# src/qa/retriever.py
from dataclasses import dataclass
import numpy as np
from deepwiki.tools.embedder import get_embedder


@dataclass
class Hit:
    text: str
    file_path: str
    score: float


def _cosine(a: np.ndarray, b: np.ndarray) -> np.ndarray:
    a = a / (np.linalg.norm(a) + 1e-9)
    b = b / (np.linalg.norm(b, axis=1, keepdims=True) + 1e-9)
    return b @ a


class Retriever:
    def __init__(self, docs: list, embedder_type: str = "google"):
        self.docs = [d for d in docs if getattr(d, "vector", None) is not None and len(d.vector) > 0]
        self.matrix = np.array([np.asarray(d.vector, dtype="float32") for d in self.docs])
        self.embedder = get_embedder(embedder_type=embedder_type)

    def retrieve(self, query: str, top_k: int) -> list[Hit]:
        qvec = np.asarray(self.embedder(input=query).data[0].embedding, dtype="float32")
        scores = _cosine(qvec, self.matrix)
        order = np.argsort(scores)[::-1][:top_k]
        return [
            Hit(
                text=self.docs[i].text,
                file_path=self.docs[i].meta_data.get("file_path", "unknown"),
                score=float(scores[i]),
            )
            for i in order
        ]
```

Touch `src/qa/__init__.py`.

- [ ] **Step 4: Run to verify it passes**

Run: `uv run pytest tests/test_retriever.py -v` — Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/qa/__init__.py src/qa/retriever.py tests/test_retriever.py
git commit -m "feat: Gemini-embed query + cosine top-k retriever with file-path hits"
```

---

## Task 7: `ask` core (retrieve → Gemini-Flash generate with enforced citations)

**Files:**
- Create: `src/qa/ask.py`
- Test: `tests/test_ask.py`

**Interfaces:**
- Consumes: `Retriever`/`Hit` (Task 6); `google.generativeai`.
- Produces: `ask(question, docs, top_k=20, model="gemini-2.5-flash") -> Answer` where `Answer` is a dataclass `{text: str, citations: list[str], contexts: list[Hit]}`. `citations` are the distinct `file_path` values of the retrieved contexts (M1: citation = "this file was in the evidence set"; verifier tightening is M3).

- [ ] **Step 1: Write the failing test (mock the LLM to stay deterministic + zero-cost)**

```python
# tests/test_ask.py
from dataclasses import dataclass

@dataclass
class _FakeHit:
    text: str; file_path: str; score: float

def test_ask_composes_prompt_and_returns_citations(monkeypatch):
    from src.qa import ask as ask_mod

    captured = {}
    def fake_generate(prompt, model):
        captured["prompt"] = prompt
        return "Slash commands are registered via `slashCommands.add` in `src/commands.ts`."
    monkeypatch.setattr(ask_mod, "_gemini_generate", fake_generate)

    class FakeRetriever:
        def __init__(self, *a, **k): pass
        def retrieve(self, q, top_k):
            return [_FakeHit("export const slashCommands = { add() {} }", "src/commands.ts", 0.9)]
    monkeypatch.setattr(ask_mod, "Retriever", FakeRetriever)

    ans = ask_mod.ask("how are slash commands registered", docs=[], top_k=3)
    assert "commands.ts" in captured["prompt"]        # file path injected into context
    assert "src/commands.ts" in ans.citations          # citation surfaced
    assert ans.text.startswith("Slash commands")
```

- [ ] **Step 2: Run to verify it fails**

Run: `uv run pytest tests/test_ask.py -v` — Expected: FAIL (`ModuleNotFoundError`).

- [ ] **Step 3: Implement**

```python
# src/qa/ask.py
from dataclasses import dataclass
import google.generativeai as genai
from src.qa.retriever import Retriever, Hit

SYSTEM = (
    "You are a Rocket.Chat code assistant. Answer ONLY from the provided context. "
    "After every factual claim, cite the source as `path`. If the context does not "
    "support an answer, say so. End with a 'Key Files' list of the files you used."
)


@dataclass
class Answer:
    text: str
    citations: list[str]
    contexts: list[Hit]


def _build_prompt(question: str, hits: list[Hit]) -> str:
    ctx = "\n\n".join(
        f"[{i+1}] File: {h.file_path}\n{h.text}" for i, h in enumerate(hits)
    )
    return f"{SYSTEM}\n\n<CONTEXT>\n{ctx}\n</CONTEXT>\n\nQuestion: {question}\nAnswer:"


def _gemini_generate(prompt: str, model: str) -> str:
    resp = genai.GenerativeModel(model).generate_content(prompt)
    return resp.text


def ask(question: str, docs: list, top_k: int = 20, model: str = "gemini-2.5-flash") -> Answer:
    retriever = Retriever(docs)
    hits = retriever.retrieve(question, top_k=top_k)
    prompt = _build_prompt(question, hits)
    text = _gemini_generate(prompt, model)          # 1 LLM call — within the ≤2 budget
    citations = list(dict.fromkeys(h.file_path for h in hits))
    return Answer(text=text, citations=citations, contexts=hits)
```

- [ ] **Step 4: Run to verify it passes**

Run: `uv run pytest tests/test_ask.py -v` — Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/qa/ask.py tests/test_ask.py
git commit -m "feat: ask() core — retrieve + Gemini-Flash generation with file citations"
```

---

## Task 8: MCP server exposing `ask`

**Files:**
- Create: `src/mcp_server/__init__.py`, `src/mcp_server/server.py`
- Test: `tests/test_mcp_server.py`

**Interfaces:**
- Consumes: `src.qa.ask.ask`, `src.indexer.index_repo.load_indexed_docs`, `src.config`.
- Produces: a FastMCP app `mcp` with one tool `ask(question: str) -> dict` returning `{"answer": str, "citations": list[str]}`. Docs are loaded once at process start from the persisted LocalDB.

- [ ] **Step 1: Write the failing test (assert the tool is registered + delegates to ask)**

```python
# tests/test_mcp_server.py
import asyncio

def test_ask_tool_registered_and_delegates(monkeypatch):
    import src.mcp_server.server as srv
    from dataclasses import dataclass

    @dataclass
    class _A: text: str; citations: list; contexts: list
    monkeypatch.setattr(srv, "ask", lambda q, docs, top_k: _A("answer X", ["a.ts"], []))
    monkeypatch.setattr(srv, "_DOCS", [])

    tools = asyncio.get_event_loop().run_until_complete(srv.mcp.list_tools())
    assert any(t.name == "ask" for t in tools)

    out = srv.ask_tool("how does X work")
    assert out == {"answer": "answer X", "citations": ["a.ts"]}
```

- [ ] **Step 2: Run to verify it fails**

Run: `uv run pytest tests/test_mcp_server.py -v` — Expected: FAIL (`ModuleNotFoundError`).

- [ ] **Step 3: Implement**

```python
# src/mcp_server/server.py
from mcp.server.fastmcp import FastMCP
from src.qa.ask import ask
from src.indexer.index_repo import load_indexed_docs
from src import config

mcp = FastMCP("rc-code-qa")

# Load the persisted index once at startup.
_DOCS = load_indexed_docs(config.RC_REPO_PATH, embedder_type=config.EMBEDDER_TYPE,
                          included_dirs=config.M1_INCLUDED_DIRS)


def ask_tool(question: str) -> dict:
    ans = ask(question, docs=_DOCS, top_k=config.TOP_K)
    return {"answer": ans.text, "citations": ans.citations}


# Register with MCP (kept as a thin wrapper so tests can call ask_tool directly).
mcp.tool(name="ask", description="Answer a question about the Rocket.Chat codebase with file citations.")(ask_tool)

if __name__ == "__main__":
    mcp.run()
```

Touch `src/mcp_server/__init__.py`.

> Note: if `mcp.tool(...)(fn)` is not the exact registration form in the installed `mcp` version, use the decorator form (`@mcp.tool()`) on `ask_tool` — confirm against `uv run python -c "from mcp.server.fastmcp import FastMCP; help(FastMCP.tool)"`. The test asserts registration, so it will catch a wrong form.

- [ ] **Step 4: Run to verify it passes**

Run: `uv run pytest tests/test_mcp_server.py -v` — Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/mcp_server tests/test_mcp_server.py
git commit -m "feat: FastMCP server exposing ask tool over the indexed RC subset"
```

---

## Task 9: Trace runner + simple trace report

**Files:**
- Create: `src/eval/__init__.py`, `src/eval/trace_run.py`
- Test: `tests/test_trace_run.py`

**Interfaces:**
- Consumes: `src/eval/utils/testcases.json`, `src.qa.ask.ask`, `src.indexer.index_repo.load_indexed_docs`, `src.config`.
- Produces: `build_trace(question: dict, answer) -> dict` (`{id, questionType, question, retrieved:[{file,score}], answer, citations}`); `write_report(traces, out_dir) -> None` (writes `trace.jsonl` + `trace-report.md`); `run_trace(question_ids=None) -> list[dict]` (indexes-loaded `ask()` per question, then writes the report). **No scoring, no GT parsing** — just records what happened.

- [ ] **Step 1: Write the failing test (pure, no network)**

```python
# tests/test_trace_run.py
import json
from dataclasses import dataclass

@dataclass
class _Hit: text: str; file_path: str; score: float
@dataclass
class _Ans: text: str; citations: list; contexts: list

def test_build_trace_shape():
    from src.eval.trace_run import build_trace
    q = {"id": "x1", "questionType": "locate", "question": "where is X?"}
    ans = _Ans("X is in a.ts", ["a.ts"], [_Hit("code", "a.ts", 0.9123)])
    t = build_trace(q, ans)
    assert t["id"] == "x1" and t["citations"] == ["a.ts"]
    assert t["retrieved"][0]["file"] == "a.ts"

def test_write_report_creates_files(tmp_path):
    from src.eval.trace_run import write_report
    traces = [{"id": "x1", "questionType": "locate", "question": "where is X?",
               "retrieved": [{"file": "a.ts", "score": 0.9}], "answer": "in a.ts",
               "citations": ["a.ts"]}]
    write_report(traces, str(tmp_path))
    md = (tmp_path / "trace-report.md").read_text()
    assert "where is X?" in md and "a.ts" in md
    first = (tmp_path / "trace.jsonl").read_text().splitlines()[0]
    assert json.loads(first)["id"] == "x1"
```

- [ ] **Step 2: Run to verify it fails**

Run: `uv run pytest tests/test_trace_run.py -v` — Expected: FAIL (`ModuleNotFoundError`).

- [ ] **Step 3: Implement**

```python
# src/eval/trace_run.py
import os, json
from src import config

_HERE = os.path.dirname(__file__)
_TESTCASES = os.path.join(_HERE, "utils", "testcases.json")
_OUT_DIR = os.path.join(os.path.dirname(os.path.dirname(_HERE)), "logs", "eval")


def _load_questions(ids):
    with open(_TESTCASES) as fh:
        data = json.load(fh)
    qs = [q for g in data["groups"] for q in g["questions"]]
    return [q for q in qs if ids is None or q["id"] in ids]


def build_trace(question: dict, answer) -> dict:
    return {
        "id": question["id"],
        "questionType": question.get("questionType"),
        "question": question["question"],
        "retrieved": [{"file": h.file_path, "score": round(h.score, 4)} for h in answer.contexts],
        "answer": answer.text,
        "citations": answer.citations,
    }


def write_report(traces: list, out_dir: str = _OUT_DIR) -> None:
    os.makedirs(out_dir, exist_ok=True)
    with open(os.path.join(out_dir, "trace.jsonl"), "w", encoding="utf-8") as fh:
        for t in traces:
            fh.write(json.dumps(t, ensure_ascii=False) + "\n")
    with open(os.path.join(out_dir, "trace-report.md"), "w", encoding="utf-8") as fh:
        fh.write("# Trace report (M1)\n\n")
        for t in traces:
            top = ", ".join(f"{r['file']} ({r['score']})" for r in t["retrieved"][:5])
            fh.write(f"## {t['id']} ({t['questionType']})\n")
            fh.write(f"**Q:** {t['question']}\n\n")
            fh.write(f"**Top retrieved:** {top}\n\n")
            fh.write(f"**Citations:** {', '.join(t['citations'])}\n\n")
            fh.write(f"**Answer:**\n\n{t['answer']}\n\n---\n\n")


def run_trace(question_ids=None) -> list:
    from src.qa.ask import ask
    from src.indexer.index_repo import load_indexed_docs
    docs = load_indexed_docs(config.RC_REPO_PATH, embedder_type=config.EMBEDDER_TYPE,
                             included_dirs=config.M1_INCLUDED_DIRS)
    traces = [build_trace(q, ask(q["question"], docs=docs, top_k=config.TOP_K))
              for q in _load_questions(question_ids)]
    write_report(traces)
    return traces


if __name__ == "__main__":
    run_trace(["new-17-slash-commands", "new-16-impact-streamer", "new-10-apps-engine"])
```

Touch `src/eval/__init__.py`.

- [ ] **Step 4: Run to verify the unit test passes**

Run: `uv run pytest tests/test_trace_run.py -v` — Expected: PASS.

- [ ] **Step 5: Produce the live trace (needs the M1 index + Gemini)**

```bash
# one-time: build the M1 index over the RC subset (Gemini embeddings; may take minutes + backoff)
uv run python -c "from src.indexer.index_repo import index_repo; from src import config; \
r=index_repo(config.RC_REPO_PATH, config.M1_INCLUDED_DIRS); \
print('files', r.files_indexed, 'chunks', r.chunks, 'empty', r.empty_vectors)"
# then trace a small, in-scope slice first (respects Flash RPD)
uv run python -c "from src.eval.trace_run import run_trace; \
run_trace(['new-17-slash-commands','new-16-impact-streamer','new-10-apps-engine'])"
```
Expected: `logs/eval/trace.jsonl` and `logs/eval/trace-report.md` written. Open `trace-report.md` and eyeball each answer/citation against `logs/answers-claude/<id>.md`. That manual read is the M1 "evaluation" — no scores computed.

- [ ] **Step 6: Commit**

```bash
git add src/eval/__init__.py src/eval/trace_run.py tests/test_trace_run.py logs/eval/trace.jsonl logs/eval/trace-report.md
git commit -m "feat: trace runner — record query/retrieval/answer/citations to trace.jsonl + trace-report.md"
```

---

## Self-Review

**Spec coverage (M1-relevant sections):**
- §1 free-tier + eval-driven → Tasks 4,7 (Gemini embed/generate), Task 9 (trace). ✓
- §4 index-time pipeline (subset) → Task 5. Query-time (retrieve→generate→citations) → Tasks 6,7. ✓
- §5.0 reuse public libs → Task 1 vendors deepwiki-open/adalflow/faiss; Task 8 uses `mcp`. ✓
- §5.4 Gemini embedding (subset scope for M1) → Tasks 2,5. ✓
- §7 eval harness → M1 records **traces only** (Task 9: `trace.jsonl` + `trace-report.md`). Automated fact-point/citation scoring and GT verification are **deferred to M2** (they need the symbol graph for machine-checkable GT) — intentional, per the "M1 = 落 trace + 最简单报告" directive. ✓ (scoped down)
- §8 MCP surface = `ask` only → Task 8. ✓
- §9 ≤2 LLM calls/question; retrieval + trace runner add no extra LLM calls → Task 7 (1 call). ✓
- Deferred by design (NOT in M1, per spec milestones): scip-typescript symbol graph + automated scoring (M2), Claude preprocessing + citation verifier (M3), full-scan + incremental follow (M4), wiki UI + Mermaid (M5). Called out so the gap is intentional, not missed.

**Placeholder scan:** no "TBD"/"add error handling"/"similar to Task N" — each code step is complete. The one upstream-uncertainty note (Task 8 `mcp.tool` registration form) ships with a concrete verification command and a test that fails if wrong.

**Type consistency:** `IndexResult.docs` (Task 5) → `Retriever(docs)` (Task 6) → `ask(docs=...)` (Task 7) → `_DOCS` (Task 8) / `run_trace` (Task 9): same `docs` list of adalflow Documents throughout. `Hit` fields (`text/file_path/score`) consistent between Tasks 6 and 7. `Answer` (`text/citations/contexts`) consistent between Tasks 7, 8, and 9 (the trace runner reads `answer.contexts`/`.citations`).
