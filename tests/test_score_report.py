import json
from src.eval.report import write_reports


def test_write_reports(tmp_path):
    results = [
        {
            "id": "new-17",
            "questionType": "locate",
            "verdict": "pass",
            "score": 1.0,
            "detail": {
                "matched": ["slashCommand.ts"],
                "missed": [],
                "citations": ["slashCommand.ts"],
                "question": "q1",
                "answer": "a1",
            },
        },
        {
            "id": "new-19",
            "questionType": "architecture",
            "verdict": "fail",
            "score": 0.0,
            "detail": {
                "reason": "wrong files",
                "fact_hits": 0,
                "fact_total": 3,
                "citations": ["x.ts"],
                "question": "q2",
                "answer": "a2",
            },
        },
    ]
    write_reports(results, str(tmp_path))
    metrics = (tmp_path / "metrics.md").read_text()
    verdicts = (tmp_path / "verdicts.md").read_text()
    assert "locate" in metrics and "pass" in metrics.lower()
    assert "overall pass rate" in metrics.lower()
    assert "q1" in verdicts and "wrong files" in verdicts
