from dataclasses import dataclass


@dataclass
class _H:
    text: str
    file_path: str
    score: float


def test_ask_uses_hybrid_when_graph_given(monkeypatch):
    from src.qa import ask as ask_mod

    monkeypatch.setattr(ask_mod, "_gemini_generate", lambda p, m: "answer `slashCommand.ts`")

    class _FakeHybrid:
        def __init__(self, *a, **k):
            pass

        def retrieve(self, q, top_k):
            return [_H("code", "apps/meteor/app/utils/server/slashCommand.ts", 0.9)]

    monkeypatch.setattr(ask_mod, "HybridRetriever", _FakeHybrid)

    ans = ask_mod.ask(
        "how do slash commands work",
        docs=[],
        graph=object(),
        repo_path="/tmp",
        top_k=5,
    )
    assert "slashCommand.ts" in ans.citations[0]
