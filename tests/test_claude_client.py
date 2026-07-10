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
