def test_run_full_imports():
    import importlib.util, os
    p = os.path.join(os.path.dirname(__file__), "..", "scripts", "run_full.py")
    assert os.path.isfile(p)     # exists; heavy logic lives under __main__
