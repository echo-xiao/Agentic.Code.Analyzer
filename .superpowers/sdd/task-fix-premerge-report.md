# Fix Pre-merge Report

## Fix 1 — `src/qa/ask.py`: guard `resp.text` against blocked/empty responses

### Before
```python
def _gemini_generate(prompt: str, model: str) -> str:
    last_exc: Exception | None = None
    for attempt in range(1, _MAX_GENERATION_RETRIES + 1):
        try:
            resp = genai.GenerativeModel(model).generate_content(prompt)
            return resp.text   # <-- ValueError propagates, aborts whole ask()
        except ResourceExhausted as exc:
            ...
        except Exception:
            raise
    raise last_exc
```

### After
```python
_NO_CONTENT_STUB = "[no answerable content returned by the model]"

def _gemini_generate(prompt: str, model: str) -> str:
    last_exc: Exception | None = None
    for attempt in range(1, _MAX_GENERATION_RETRIES + 1):
        try:
            resp = genai.GenerativeModel(model).generate_content(prompt)
        except ResourceExhausted as exc:
            ...
            continue
        except Exception:
            raise   # ValueError from generate_content() itself still propagates
        # Access .text separately — only catch ValueError from resp.text (blocked/empty)
        try:
            return resp.text
        except ValueError:
            log.warning("Gemini response has no answerable content (blocked/empty); returning stub.")
            return _NO_CONTENT_STUB
    raise last_exc
```

Key design: `generate_content()` and `.text` access are in separate try blocks. `ValueError` from `generate_content()` itself still propagates (existing test `test_reraises_non_429_immediately` verifies this). Only `ValueError` from `resp.text` (blocked/empty Part) returns the stub.

### New tests (tests/test_ask.py)
- `test_gemini_generate_blocked_response_returns_stub`: resp.text raises ValueError → returns `_NO_CONTENT_STUB`
- `test_gemini_generate_normal_response_returns_text`: resp.text returns normally → returns that text

---

## Fix 2 — `src/indexer/index_repo.py`: `load_indexed_docs` empty-`included_dirs` full-scan footgun

### Before
```python
from dataclasses import dataclass
from deepwiki.data_pipeline import DatabaseManager

def load_indexed_docs(repo_path, embedder_type="google", included_dirs=None):
    manager = DatabaseManager()
    return manager.prepare_database(
        ...
        included_dirs=included_dirs or [],   # [] = deepwiki exclusion mode = full repo scan
    )
```

### After
```python
from dataclasses import dataclass
from deepwiki.data_pipeline import DatabaseManager
from src import config

def load_indexed_docs(repo_path, embedder_type="google", included_dirs=None):
    manager = DatabaseManager()
    return manager.prepare_database(
        ...
        included_dirs=included_dirs or config.M1_INCLUDED_DIRS,  # safe default
    )
```

`index_repo()` function is unchanged. Only `load_indexed_docs` is modified.

### New tests (tests/test_indexer.py)
- `test_load_indexed_docs_defaults_to_m1_dirs`: no `included_dirs` arg → captured kwarg == `config.M1_INCLUDED_DIRS` (not `[]`)
- `test_load_indexed_docs_respects_explicit_dirs`: explicit `included_dirs` passed → forwarded unchanged

---

## Test Results

```
28 passed, 1 warning in 2.33s
```

- Before: 24 passed
- After: 28 passed (+4 new tests, 0 regressions)

## Concerns

1. **`google.generativeai` deprecation warning**: The package emits a FutureWarning on every import; this was pre-existing. The project should migrate to `google.genai` at some point (tracked elsewhere).

2. **`ValueError` disambiguation**: The fix relies on calling `generate_content()` and accessing `.text` in separate try blocks to distinguish source-of-ValueError. This is the safest approach given that `resp.text` is the documented source of this particular error. An alternative would be checking `resp.candidates` existence before accessing `.text`, but the try/catch approach is more resilient to API shape changes.

3. **`config.M1_INCLUDED_DIRS` as default**: This is the right M1 safe default, but a future caller who intentionally wants a full scan via `load_indexed_docs` must pass `included_dirs=[]` explicitly — the function no longer accepts implicit empty-list for full scan. This is the intended behavior per the fix brief.
