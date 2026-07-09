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
