"""LLM-judge for open-ended questions (architecture/pattern/routing).

Judges factual overlap between a system answer and ground-truth key facts,
NOT prose similarity (anti-circularity design).
"""
import json
import re

from src.qa.ask import _gemini_generate  # noqa: F401 — imported for monkeypatching

_JUDGE_SYS = (
    "You are grading a code-QA answer about Rocket.Chat against ground-truth KEY FACTS.\n"
    "Judge ONLY factual overlap: does the answer identify the same key files and symbols and the "
    "same mechanism as the ground-truth facts? Do NOT reward writing style or similarity of prose. "
    "An answer that names the right files/symbols is a pass even if worded differently; an answer that "
    "sounds fluent but cites the wrong files is a fail. Reply with STRICT JSON only: "
    '{"verdict":"pass|fail","reason":"...","fact_hits":<int>,"fact_total":<int>}.'
)


def judge_open(question, answer_text, answer_citations, gt_md, gt_facts, model="gemini-2.5-flash"):
    """Judge an open-ended answer against ground-truth key facts.

    Args:
        question: dict with at least 'question' and 'questionType' keys.
        answer_text: str, the system's answer text.
        answer_citations: list[str], files cited by the system answer.
        gt_md: str, raw ground-truth markdown (unused in prompt but available for context).
        gt_facts: GTFacts, verified ground-truth files and symbols.
        model: Gemini model to use.

    Returns:
        dict with keys: verdict ("pass"|"fail"), reason (str), fact_hits (int), fact_total (int).
    """
    facts = f"KEY FILES: {sorted(gt_facts.files)}\nKEY SYMBOLS: {sorted(gt_facts.symbols)}"
    prompt = (
        f"{_JUDGE_SYS}\n\n"
        f"QUESTION: {question['question']}\n\n"
        f"GROUND-TRUTH FACTS:\n{facts}\n\n"
        f"SYSTEM ANSWER:\n{answer_text}\n\n"
        f"SYSTEM CITATIONS: {answer_citations}\n\n"
        f"JSON verdict:"
    )
    raw = _gemini_generate(prompt, model)
    m = re.search(r"\{.*\}", raw, re.DOTALL)
    try:
        d = json.loads(m.group(0)) if m else {}
    except Exception:
        d = {}
    return {
        "verdict": d.get("verdict", "fail"),
        "reason": d.get("reason", "unparseable judge output"),
        "fact_hits": int(d.get("fact_hits", 0)),
        "fact_total": int(d.get("fact_total", len(gt_facts.files) + len(gt_facts.symbols))),
    }
