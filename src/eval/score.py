"""Scorer: dispatch machine_check (locate/call-chain/impact) or judge_open for other types.

Public API:
  score_question(question, answer, gt_md, graph) -> dict
  run_scored_eval(question_ids=None) -> list[dict]
"""
import os
import json

from src import config
from src.eval.ground_truth import extract_gt_facts, machine_check
from src.eval.judge import judge_open

_MACHINE = {"locate", "call-chain", "impact"}

_HERE = os.path.dirname(__file__)
_TESTCASES = os.path.join(_HERE, "utils", "testcases.json")
_GT_DIR = os.path.join(
    os.path.dirname(os.path.dirname(_HERE)), "logs", "answers-claude"
)


def _load_questions(ids):
    """Load all questions from testcases.json, optionally filtered by id set."""
    with open(_TESTCASES, encoding="utf-8") as fh:
        data = json.load(fh)
    qs = [q for g in data["groups"] for q in g["questions"]]
    return [q for q in qs if ids is None or q["id"] in ids]


def score_question(question, answer, gt_md, graph):
    """Score one question.

    Args:
        question:  dict with 'id', 'questionType', 'question'.
        answer:    Answer dataclass (has .text and .citations).
        gt_md:     raw ground-truth markdown string.
        graph:     loaded symbol graph (may be None for judge path).

    Returns:
        dict with keys: id, questionType, verdict, score, detail.
    """
    facts = extract_gt_facts(gt_md)

    if question["questionType"] in _MACHINE and graph is not None:
        mc = machine_check(
            question, answer.text, answer.citations, facts, graph
        )
        verdict = "pass" if mc["score"] >= 0.5 else "fail"
        detail = {
            **mc,
            "citations": answer.citations,
            "question": question["question"],
            "answer": answer.text[:600],
        }
        return {
            "id": question["id"],
            "questionType": question["questionType"],
            "verdict": verdict,
            "score": mc["score"],
            "detail": detail,
        }

    # Open-ended: use LLM judge
    j = judge_open(
        question,
        answer.text,
        answer.citations,
        gt_md,
        facts,
        model=config.JUDGE_MODEL,
    )
    detail = {
        **j,
        "citations": answer.citations,
        "question": question["question"],
        "answer": answer.text[:600],
    }
    return {
        "id": question["id"],
        "questionType": question["questionType"],
        "verdict": j["verdict"],
        "score": 1.0 if j["verdict"] == "pass" else 0.0,
        "detail": detail,
    }


def run_scored_eval(question_ids=None):
    """Orchestrate: load graph+docs → ask each question → score → write reports.

    Args:
        question_ids: optional set/list of question ids to restrict eval;
                      None means run all 34.

    Returns:
        list of score dicts.
    """
    from src.qa.ask import ask
    from src.indexer.index_repo import load_indexed_docs
    from src.graph.build_graph import load_graph
    from src.eval.report import write_reports

    docs = load_indexed_docs(config.RC_REPO_PATH, embedder_type=config.EMBEDDER_TYPE)
    graph = load_graph(config.GRAPH_PATH)
    results = []
    for q in _load_questions(question_ids):
        gt_path = os.path.join(_GT_DIR, f"{q['id']}.md")
        if not os.path.isfile(gt_path):
            continue
        gt_md = open(gt_path, encoding="utf-8").read()
        ans = ask(
            q["question"],
            docs=docs,
            graph=graph,
            repo_path=config.RC_REPO_PATH,
            top_k=config.TOP_K,
        )
        results.append(score_question(q, ans, gt_md, graph))

    out_dir = os.path.join(
        os.path.dirname(os.path.dirname(_HERE)), "logs", "eval"
    )
    write_reports(results, out_dir)
    return results
