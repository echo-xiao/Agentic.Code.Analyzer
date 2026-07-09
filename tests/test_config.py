from src import config

def test_config_values():
    assert config.EMBEDDER_TYPE == "google"
    assert config.GEN_MODEL == "gemini-2.5-flash"
    assert config.TOP_K == 20
    # M1 indexes a real, verified RC package subset
    assert "packages/apps-engine" in config.M1_INCLUDED_DIRS
    assert "apps/meteor/app/utils/server" in config.M1_INCLUDED_DIRS
