from src import config


def test_m2_config():
    assert config.JUDGE_MODEL == "gemini-2.5-flash"
    assert config.CLAUDE_MODEL.startswith("claude-")
    assert isinstance(config.FULL_SCAN, bool)
    assert config.GRAPH_PATH.endswith("graph.json")
