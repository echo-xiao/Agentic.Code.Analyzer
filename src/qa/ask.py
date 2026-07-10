import re
import time
import logging
from dataclasses import dataclass
import google.generativeai as genai
from src.qa.retriever import Retriever, Hit, HybridRetriever

try:
    from google.api_core.exceptions import ResourceExhausted
except ImportError:
    ResourceExhausted = Exception  # type: ignore

log = logging.getLogger(__name__)

_MAX_GENERATION_RETRIES = 5


def _parse_retry_seconds(exc: Exception) -> int:
    """Extract server-advertised retry delay in seconds from a ResourceExhausted exception."""
    m = re.search(r"seconds:\s*(\d+)", str(exc))
    return int(m.group(1)) if m else 30

SYSTEM = (
    "You are a Rocket.Chat code assistant. Answer ONLY from the provided context. "
    "After every factual claim, cite the source as `path`. If the context does not "
    "support an answer, say so. End with a 'Key Files' list of the files you used."
)


@dataclass
class Answer:
    text: str
    citations: list[str]
    contexts: list[Hit]


def _build_prompt(question: str, hits: list[Hit]) -> str:
    ctx = "\n\n".join(
        f"[{i+1}] File: {h.file_path}\n{h.text}" for i, h in enumerate(hits)
    )
    return f"{SYSTEM}\n\n<CONTEXT>\n{ctx}\n</CONTEXT>\n\nQuestion: {question}\nAnswer:"


_NO_CONTENT_STUB = "[no answerable content returned by the model]"


def _gemini_generate(prompt: str, model: str) -> str:
    """Call Gemini generation with retry logic honoring 429 retry_delay."""
    last_exc: Exception | None = None
    for attempt in range(1, _MAX_GENERATION_RETRIES + 1):
        try:
            resp = genai.GenerativeModel(model).generate_content(prompt)
        except ResourceExhausted as exc:
            last_exc = exc
            delay = max(_parse_retry_seconds(exc), 30)
            log.warning(
                "Generation 429 on attempt %s/%s; sleeping %ss before retry",
                attempt, _MAX_GENERATION_RETRIES, delay,
            )
            if attempt < _MAX_GENERATION_RETRIES:
                time.sleep(delay)
            continue
        except Exception:
            raise
        # Access .text separately: raises ValueError when response is blocked/empty.
        # That is not a retriable condition — return a clear stub instead of aborting.
        try:
            return resp.text
        except ValueError:
            log.warning("Gemini response has no answerable content (blocked/empty); returning stub.")
            return _NO_CONTENT_STUB
    raise last_exc  # type: ignore[misc]


def ask(
    question: str,
    docs: list,
    graph=None,
    repo_path: str | None = None,
    top_k: int = 20,
    model: str = "gemini-2.5-flash",
) -> Answer:
    if graph is not None and repo_path is not None:
        retriever = HybridRetriever(docs, graph, repo_path)
    else:
        retriever = Retriever(docs)
    hits = retriever.retrieve(question, top_k=top_k)
    prompt = _build_prompt(question, hits)
    text = _gemini_generate(prompt, model)          # 1 LLM call — within the ≤2 budget
    citations = list(dict.fromkeys(h.file_path for h in hits))
    return Answer(text=text, citations=citations, contexts=hits)
