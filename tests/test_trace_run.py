import json
from dataclasses import dataclass


@dataclass
class _Hit:
    text: str
    file_path: str
    score: float


@dataclass
class _Ans:
    text: str
    citations: list
    contexts: list


def test_build_trace_shape():
    from src.eval.trace_run import build_trace
    q = {"id": "x1", "questionType": "locate", "question": "where is X?"}
    ans = _Ans("X is in a.ts", ["a.ts"], [_Hit("code", "a.ts", 0.9123)])
    t = build_trace(q, ans)
    assert t["id"] == "x1" and t["citations"] == ["a.ts"]
    assert t["retrieved"][0]["file"] == "a.ts"


def test_write_report_creates_files(tmp_path):
    from src.eval.trace_run import write_report
    traces = [{"id": "x1", "questionType": "locate", "question": "where is X?",
               "retrieved": [{"file": "a.ts", "score": 0.9}], "answer": "in a.ts",
               "citations": ["a.ts"]}]
    write_report(traces, str(tmp_path))
    md = (tmp_path / "trace-report.md").read_text()
    assert "where is X?" in md and "a.ts" in md
    first = (tmp_path / "trace.jsonl").read_text().splitlines()[0]
    assert json.loads(first)["id"] == "x1"
