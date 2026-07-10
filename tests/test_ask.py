from dataclasses import dataclass
import pytest


@dataclass
class _FakeHit:
    text: str; file_path: str; score: float


# ---------------------------------------------------------------------------
# Fix 1 — _gemini_generate: guard resp.text against blocked/empty responses
# ---------------------------------------------------------------------------

class _RespTextRaises:
    """Fake Gemini response whose .text property raises ValueError (safety block / empty)."""
    @property
    def text(self):
        raise ValueError("The `response.text` quick accessor only works when the response contains a valid Part.")


class _RespTextOk:
    """Fake Gemini response whose .text property returns normally."""
    @property
    def text(self):
        return "normal answer text"


class _FakeModelBlocked:
    def __init__(self, model): pass
    def generate_content(self, prompt):
        return _RespTextRaises()


class _FakeModelOk:
    def __init__(self, model): pass
    def generate_content(self, prompt):
        return _RespTextOk()


def test_gemini_generate_blocked_response_returns_stub(monkeypatch):
    """When resp.text raises ValueError (blocked/empty), _gemini_generate must return the stub."""
    from src.qa import ask as ask_mod
    monkeypatch.setattr(ask_mod.genai, "GenerativeModel", _FakeModelBlocked)

    result = ask_mod._gemini_generate("some prompt", "gemini-2.5-flash")
    assert result == ask_mod._NO_CONTENT_STUB
    assert "[no answerable content" in result


def test_gemini_generate_normal_response_returns_text(monkeypatch):
    """When resp.text returns normally, _gemini_generate must return that text unchanged."""
    from src.qa import ask as ask_mod
    monkeypatch.setattr(ask_mod.genai, "GenerativeModel", _FakeModelOk)

    result = ask_mod._gemini_generate("some prompt", "gemini-2.5-flash")
    assert result == "normal answer text"


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
