import os
def test_fixture_exists():
    base = os.path.join(os.path.dirname(__file__), "fixtures", "mini_repo")
    assert os.path.isfile(os.path.join(base, "src", "commands.ts"))
