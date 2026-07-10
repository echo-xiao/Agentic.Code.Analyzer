def test_extract_wiring(monkeypatch):
    from src.preprocess import dynamic_wiring as W
    captured = {}
    monkeypatch.setattr(W, "claude_complete", lambda prompt, system="", **k: (captured.__setitem__("p", prompt), "WIRING DOC")[1])
    doc = W.extract_wiring("slashCommands", [("apps/meteor/app/utils/server/slashCommand.ts", "slashCommands.add(...)")])
    assert doc == "WIRING DOC"
    assert "slashCommand.ts" in captured["p"] and "slashCommands.add" in captured["p"]
