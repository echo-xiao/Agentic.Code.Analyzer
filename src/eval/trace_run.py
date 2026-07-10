import os, json, time
from src import config

_HERE = os.path.dirname(__file__)
_TESTCASES = os.path.join(_HERE, "utils", "testcases.json")
_OUT_DIR = os.path.join(os.path.dirname(os.path.dirname(_HERE)), "logs", "eval")


def _load_questions(ids):
    with open(_TESTCASES) as fh:
        data = json.load(fh)
    qs = [q for g in data["groups"] for q in g["questions"]]
    return [q for q in qs if ids is None or q["id"] in ids]


def build_trace(question: dict, answer) -> dict:
    return {
        "id": question["id"],
        "questionType": question.get("questionType"),
        "question": question["question"],
        "retrieved": [{"file": h.file_path, "score": round(h.score, 4)} for h in answer.contexts],
        "answer": answer.text,
        "citations": answer.citations,
    }


def write_report(traces: list, out_dir: str = _OUT_DIR) -> None:
    os.makedirs(out_dir, exist_ok=True)
    with open(os.path.join(out_dir, "trace.jsonl"), "w", encoding="utf-8") as fh:
        for t in traces:
            fh.write(json.dumps(t, ensure_ascii=False) + "\n")
    with open(os.path.join(out_dir, "trace-report.md"), "w", encoding="utf-8") as fh:
        fh.write("# Trace report (M1)\n\n")
        for t in traces:
            top = ", ".join(f"{r['file']} ({r['score']})" for r in t["retrieved"][:5])
            fh.write(f"## {t['id']} ({t['questionType']})\n")
            fh.write(f"**Q:** {t['question']}\n\n")
            fh.write(f"**Top retrieved:** {top}\n\n")
            fh.write(f"**Citations:** {', '.join(t['citations'])}\n\n")
            fh.write(f"**Answer:**\n\n{t['answer']}\n\n---\n\n")


def run_trace(question_ids=None) -> list:
    from src.qa.ask import ask
    from src.indexer.index_repo import load_indexed_docs
    docs = load_indexed_docs(config.RC_REPO_PATH, embedder_type=config.EMBEDDER_TYPE,
                             included_dirs=config.M1_INCLUDED_DIRS)
    questions = _load_questions(question_ids)
    traces = []
    for i, q in enumerate(questions):
        traces.append(build_trace(q, ask(q["question"], docs=docs, top_k=config.TOP_K)))
        if i < len(questions) - 1:
            time.sleep(2)  # light pacing between questions to avoid bursting the generation window
    write_report(traces)
    return traces


if __name__ == "__main__":
    run_trace(["new-17-slash-commands", "new-16-impact-streamer", "new-10-apps-engine"])
