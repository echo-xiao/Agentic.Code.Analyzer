"""Tests for 429 / ResourceExhausted rate-limit retry logic (offline, fast).

All calls to time.sleep are monkeypatched to a no-op so the tests run in
milliseconds.  The tests verify:

1. Fix B (_gemini_generate) — retries on 429, eventually returns, calls sleep.
2. Fix B — non-429 exceptions are re-raised immediately without any retry.
3. Fix A (GoogleEmbedderClient.call) — retries on 429, eventually returns, calls sleep.
4. Fix A — non-429 exceptions are re-raised immediately via giveup.
5. _parse_retry_seconds helpers (both modules) correctly parse server delay.
"""

import pytest


# ---------------------------------------------------------------------------
# Helper: build a fake ResourceExhausted that looks like the Gemini API
# ---------------------------------------------------------------------------

def _make_resource_exhausted(seconds: int = 20):
    from google.api_core.exceptions import ResourceExhausted
    return ResourceExhausted(f"429 ResourceExhausted: Resource has been exhausted. seconds: {seconds} please retry.")


# ===========================================================================
# Fix B — _gemini_generate retry (src/qa/ask.py)
# ===========================================================================

class TestGeminiGenerateRetry:
    def test_retries_on_429_and_returns(self, monkeypatch):
        """Succeeds on 3rd attempt after 2 ResourceExhausted errors."""
        from src.qa import ask as ask_mod

        sleep_calls: list[float] = []
        monkeypatch.setattr(ask_mod.time, "sleep", lambda s: sleep_calls.append(s))

        call_count = 0

        def fake_generate_content(prompt):
            nonlocal call_count
            call_count += 1
            if call_count < 3:
                raise _make_resource_exhausted(20)

            class _Resp:
                text = "mocked answer"

            return _Resp()

        class _FakeModel:
            def __init__(self, model): pass
            def generate_content(self, prompt):
                return fake_generate_content(prompt)

        monkeypatch.setattr(ask_mod.genai, "GenerativeModel", _FakeModel)

        result = ask_mod._gemini_generate("test prompt", "gemini-2.5-flash")
        assert result == "mocked answer"
        assert call_count == 3, f"expected 3 calls, got {call_count}"
        # sleep must have been called between retries (at least once)
        assert len(sleep_calls) >= 1, "expected at least one sleep call"

    def test_respects_server_delay_minimum(self, monkeypatch):
        """Sleep duration is at least 30 s regardless of server hint."""
        from src.qa import ask as ask_mod

        sleep_calls: list[float] = []
        monkeypatch.setattr(ask_mod.time, "sleep", lambda s: sleep_calls.append(s))

        call_count = 0

        class _FakeModel:
            def __init__(self, model): pass
            def generate_content(self, prompt):
                nonlocal call_count
                call_count += 1
                if call_count == 1:
                    # Server says 5 s — we should still sleep ≥ 30
                    from google.api_core.exceptions import ResourceExhausted
                    raise ResourceExhausted("429 seconds: 5 retry")

                class _R:
                    text = "ok"

                return _R()

        monkeypatch.setattr(ask_mod.genai, "GenerativeModel", _FakeModel)
        ask_mod._gemini_generate("prompt", "model")
        assert sleep_calls, "expected sleep"
        assert sleep_calls[0] >= 30, f"sleep should be >= 30, got {sleep_calls[0]}"

    def test_reraises_non_429_immediately(self, monkeypatch):
        """ValueError must propagate immediately without retrying or sleeping."""
        from src.qa import ask as ask_mod

        sleep_calls: list[float] = []
        monkeypatch.setattr(ask_mod.time, "sleep", lambda s: sleep_calls.append(s))

        call_count = 0

        class _FakeModel:
            def __init__(self, model): pass
            def generate_content(self, prompt):
                nonlocal call_count
                call_count += 1
                raise ValueError("not a rate-limit error")

        monkeypatch.setattr(ask_mod.genai, "GenerativeModel", _FakeModel)

        with pytest.raises(ValueError, match="not a rate-limit error"):
            ask_mod._gemini_generate("prompt", "model")

        assert call_count == 1, f"should not retry; called {call_count} times"
        assert len(sleep_calls) == 0, "should not sleep on non-429"

    def test_gives_up_after_max_retries(self, monkeypatch):
        """After _MAX_GENERATION_RETRIES exhausted, re-raises the last 429."""
        from src.qa import ask as ask_mod

        monkeypatch.setattr(ask_mod.time, "sleep", lambda s: None)

        call_count = 0

        class _FakeModel:
            def __init__(self, model): pass
            def generate_content(self, prompt):
                nonlocal call_count
                call_count += 1
                raise _make_resource_exhausted(20)

        monkeypatch.setattr(ask_mod.genai, "GenerativeModel", _FakeModel)

        from google.api_core.exceptions import ResourceExhausted
        with pytest.raises(ResourceExhausted):
            ask_mod._gemini_generate("prompt", "model")

        assert call_count == ask_mod._MAX_GENERATION_RETRIES


# ===========================================================================
# Fix A — GoogleEmbedderClient.call retry (deepwiki/google_embedder_client.py)
# ===========================================================================

class TestEmbedderClientRetry:
    """Tests for the backoff-decorated call() method on GoogleEmbedderClient."""

    def _make_client(self, monkeypatch):
        """Return a GoogleEmbedderClient with API init monkeypatched."""
        import deepwiki.google_embedder_client as emb_mod
        monkeypatch.setattr(emb_mod.genai, "configure", lambda api_key: None)
        monkeypatch.setenv("GOOGLE_API_KEY", "fake-key")
        from deepwiki.google_embedder_client import GoogleEmbedderClient
        return GoogleEmbedderClient()

    def test_retries_on_429_and_returns(self, monkeypatch):
        """call() retries twice on ResourceExhausted and returns on 3rd attempt."""
        import deepwiki.google_embedder_client as emb_mod

        sleep_calls: list[float] = []
        monkeypatch.setattr(emb_mod.time, "sleep", lambda s: sleep_calls.append(s))

        call_count = 0
        _sentinel = object()

        def fake_embed_content(**kwargs):
            nonlocal call_count
            call_count += 1
            if call_count < 3:
                raise emb_mod.ResourceExhausted("429 seconds: 20 retry")
            return _sentinel

        monkeypatch.setattr(emb_mod.genai, "embed_content", fake_embed_content)

        client = self._make_client(monkeypatch)
        from adalflow.core.types import ModelType
        result = client.call({"content": "hello"}, ModelType.EMBEDDER)

        assert result is _sentinel
        assert call_count == 3
        # backoff must have slept between retries
        assert len(sleep_calls) >= 1

    def test_reraises_non_429_immediately(self, monkeypatch):
        """call() gives up immediately on non-ResourceExhausted errors (giveup=True)."""
        import deepwiki.google_embedder_client as emb_mod

        sleep_calls: list[float] = []
        monkeypatch.setattr(emb_mod.time, "sleep", lambda s: sleep_calls.append(s))

        call_count = 0

        def fake_embed_content(**kwargs):
            nonlocal call_count
            call_count += 1
            raise TypeError("unexpected input")

        monkeypatch.setattr(emb_mod.genai, "embed_content", fake_embed_content)

        client = self._make_client(monkeypatch)
        from adalflow.core.types import ModelType
        with pytest.raises(TypeError, match="unexpected input"):
            client.call({"content": "hello"}, ModelType.EMBEDDER)

        assert call_count == 1, f"should not retry; called {call_count} times"
        assert len(sleep_calls) == 0


# ===========================================================================
# _parse_retry_seconds helpers
# ===========================================================================

class TestParseRetrySeconds:
    def test_ask_module_parses_seconds(self):
        from src.qa.ask import _parse_retry_seconds
        exc = _make_resource_exhausted(25)
        assert _parse_retry_seconds(exc) == 25

    def test_ask_module_fallback(self):
        from src.qa.ask import _parse_retry_seconds
        from google.api_core.exceptions import ResourceExhausted
        exc = ResourceExhausted("no delay info here")
        assert _parse_retry_seconds(exc) == 30

    def test_embedder_module_parses_seconds(self):
        from deepwiki.google_embedder_client import _parse_retry_seconds
        exc = _make_resource_exhausted(18)
        assert _parse_retry_seconds(exc) == 18

    def test_embedder_module_fallback(self):
        from deepwiki.google_embedder_client import _parse_retry_seconds
        from google.api_core.exceptions import ResourceExhausted
        exc = ResourceExhausted("no hint")
        assert _parse_retry_seconds(exc) == 30
