# Task 6 Report: Retriever (Gemini-embed query → cosine top-k)

## TDD Evidence

### RED Phase
Wrote `tests/test_retriever.py` verbatim from the brief spec.
Ran `uv run pytest tests/test_retriever.py -v` — result: **1 FAILED** (`ModuleNotFoundError: No module named 'src.qa'`).
This confirmed the test file exists and the test was collected but correctly failed before implementation.

### GREEN Phase
Implemented:
- `src/qa/__init__.py` (empty touch)
- `src/qa/retriever.py` (exact spec code — `Hit` dataclass, `_cosine`, `Retriever` class)

Ran `uv run pytest tests/test_retriever.py -v` — result: **1 PASSED** (live API call to Gemini, no skip).

## Files Changed

| File | Action |
|---|---|
| `src/qa/__init__.py` | Created (empty) |
| `src/qa/retriever.py` | Created (Retriever + Hit implementation) |
| `tests/test_retriever.py` | Created (live integration test) |

## Live Test Result

- Query: `"how are slash commands registered"`
- Corpus: mini_repo fixture (1 chunk from `src/commands.ts`, 3072-dim Gemini vectors from cached `.pkl`)
- **Top hit**: `src/commands.ts`, score = **0.8272**
- All 3 hits returned (only 1 chunk in corpus, so len(hits)==1), descending order assertion passed.

Note: The mini fixture has only 1 chunk (commands.ts), so top_k=3 returned 1 hit. Both assertions (`hits[0].file_path` contains `commands.ts` and descending order) passed correctly.

## Deviations

None. Implementation is verbatim from the brief spec.

## Concerns

1. `google.generativeai` FutureWarning — the upstream client (`deepwiki/google_embedder_client.py`) still imports the deprecated package. This is a pre-existing issue, not introduced by Task 6.
2. The mini fixture has only 1 document chunk; the `hits[0].score >= hits[-1].score` assertion is trivially true (same element). The test still validates the core contract — it would be more meaningful with multiple chunks. This is acceptable per the brief.
3. The cached `.pkl` index was loaded (not re-embedded), which is correct behavior — the retriever only re-embeds the query, not the corpus.

## Commit

SHA: `0d34688`
Subject: `feat: Gemini-embed query + cosine top-k retriever with file-path hits`
Branch: `m1-pipeline`

---

## Review Fix Report (2026-07-09)

### Finding 1 — Vacuously-tested descending-sort contract

**Fix:** Added `test_retriever_sort_descending_deterministic` in `tests/test_retriever.py`.

- 3 docs with orthogonal/antipodal 3-dim vectors (cos similarities: +1.0, 0.0, −1.0 relative to query).
- Monkeypatches `r.embedder` with a `fake_embedder` callable — zero network calls.
- Asserts pairwise descending order AND that `alpha.py` (cos=1.0) is `hits[0]`.

**RED-when-reversed evidence:** Temporarily changed `np.argsort(scores)[::-1][:top_k]` → `np.argsort(scores)[:top_k]` (ascending). Test FAILED:

```
AssertionError: Score not descending at position 0: -1.0 < 0.0
assert -1.0 >= 0.0
```

Descending reversal restored; test GREEN.

### Finding 2 — Empty-docs edge case

**Fix:** Added guard in `Retriever.__init__` (`src/qa/retriever.py`):

```python
if not self.docs:
    raise ValueError("Retriever: no embeddable docs (all vectors empty/None)")
```

Added `test_retriever_raises_on_empty_docs` — asserts `ValueError` with `match="no embeddable docs"` for both an empty-vector doc and an empty list.

### Test run (all 3 tests)

Command: `uv run pytest tests/test_retriever.py -v`

```
tests/test_retriever.py::test_retriever_sort_descending_deterministic PASSED [ 33%]
tests/test_retriever.py::test_retriever_raises_on_empty_docs PASSED      [ 66%]
tests/test_retriever.py::test_retriever_ranks_relevant_chunk_first PASSED [100%]

========================= 3 passed, 1 warning in 1.63s =========================
```

### Files Changed

| File | Change |
|---|---|
| `src/qa/retriever.py` | Added `if not self.docs: raise ValueError(...)` guard |
| `tests/test_retriever.py` | Added 2 new deterministic unit tests + helpers |

### Commit

SHA: (see below — committed after report append)
Branch: `m1-pipeline`
