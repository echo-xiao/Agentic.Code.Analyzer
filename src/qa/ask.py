from dataclasses import dataclass
import google.generativeai as genai
from src.qa.retriever import Retriever, Hit

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


def _gemini_generate(prompt: str, model: str) -> str:
    resp = genai.GenerativeModel(model).generate_content(prompt)
    return resp.text


def ask(question: str, docs: list, top_k: int = 20, model: str = "gemini-2.5-flash") -> Answer:
    retriever = Retriever(docs)
    hits = retriever.retrieve(question, top_k=top_k)
    prompt = _build_prompt(question, hits)
    text = _gemini_generate(prompt, model)          # 1 LLM call — within the ≤2 budget
    citations = list(dict.fromkeys(h.file_path for h in hits))
    return Answer(text=text, citations=citations, contexts=hits)
