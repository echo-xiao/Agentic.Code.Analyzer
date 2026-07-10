def test_summarize_caches(tmp_path, monkeypatch):
    from src.preprocess import summarize as S
    calls = {"n": 0}
    monkeypatch.setattr(S, "claude_complete", lambda *a, **k: (calls.__setitem__("n", calls["n"]+1), "SUMMARY")[1])
    s1 = S.summarize_file("a.ts", "export const X=1", str(tmp_path))
    s2 = S.summarize_file("a.ts", "export const X=1", str(tmp_path))   # same content -> cache hit
    assert s1 == "SUMMARY" == s2
    assert calls["n"] == 1     # claude called once, second was cached
