def test_index_scope_flag(monkeypatch):
    from src.indexer import index_repo as idx
    from src import config
    monkeypatch.setattr(config, "FULL_SCAN", True)
    assert idx.index_scope() is None            # full scan
    monkeypatch.setattr(config, "FULL_SCAN", False)
    assert idx.index_scope() == config.M1_INCLUDED_DIRS

def test_changed_files(monkeypatch):
    from src.indexer import index_repo as idx
    monkeypatch.setattr(idx.subprocess, "run",
        lambda *a, **k: type("R", (), {"stdout": "packages/x/a.ts\napps/meteor/b.ts\n"})())
    assert idx.changed_files_since("/repo", "HEAD~1") == ["packages/x/a.ts", "apps/meteor/b.ts"]
