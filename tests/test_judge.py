"""Tests for LLM-judge (Task 11): offline, mocked _gemini_generate."""


def test_judge_parses_verdict(monkeypatch):
    from src.eval import judge as J
    captured = {}

    def fake_gen(prompt, model):
        captured["p"] = prompt
        return '{"verdict":"pass","reason":"names slashCommands + slashCommand.ts","fact_hits":2,"fact_total":2}'

    monkeypatch.setattr(J, "_gemini_generate", fake_gen)
    from src.eval.ground_truth import GTFacts
    out = J.judge_open(
        {"question": "how do slash commands work", "questionType": "architecture"},
        "answer",
        ["a.ts"],
        "gt",
        GTFacts(files={"slashCommand.ts"}, symbols={"slashCommands"}),
    )
    assert out["verdict"] == "pass" and out["fact_total"] == 2
    assert "factual overlap" in captured["p"].lower() or "not" in captured["p"].lower()
