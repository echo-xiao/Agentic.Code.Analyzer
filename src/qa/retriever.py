from dataclasses import dataclass
import re
import numpy as np
from deepwiki.tools.embedder import get_embedder


@dataclass
class Hit:
    text: str
    file_path: str
    score: float


def _cosine(a: np.ndarray, b: np.ndarray) -> np.ndarray:
    a = a / (np.linalg.norm(a) + 1e-9)
    b = b / (np.linalg.norm(b, axis=1, keepdims=True) + 1e-9)
    return b @ a


_IDENT_RE = re.compile(r"[A-Za-z_][A-Za-z0-9_]*")

_STOP = {
    "how", "do", "does", "the", "a", "an", "is", "are", "in", "of", "to",
    "and", "via", "from", "work", "works",
}


def _candidate_identifiers(query: str) -> list[str]:
    toks = _IDENT_RE.findall(query)
    # keep camelCase/PascalCase tokens or lowercase identifiers; drop common english words
    return [
        t for t in toks
        if (t.lower() not in _STOP)
        and (len(t) > 3)
        and (any(c.isupper() for c in t[1:]) or (t.islower() and t.lower() not in _STOP))
    ]


class StructuralRetriever:
    def __init__(self, graph, docs):
        self.graph = graph
        self.by_file: dict[str, str] = {}
        for d in docs:
            self.by_file.setdefault(d.meta_data.get("file_path", ""), d.text)

    def retrieve(self, query: str, top_k: int) -> list[Hit]:
        seen: set[str] = set()
        hits: list[Hit] = []
        for ident in _candidate_identifiers(query):
            for d in self.graph.find_symbol(ident) + self.graph.find_references(ident):
                f = d["file"]
                if f in seen:
                    continue
                seen.add(f)
                text = self.by_file.get(f) or f"symbol `{ident}` at {f}:{d.get('line', '?')}"
                hits.append(Hit(text=text, file_path=f, score=1.0 / (len(hits) + 1)))
                if len(hits) >= top_k:
                    return hits
        return hits


class Retriever:
    def __init__(self, docs: list, embedder_type: str = "google"):
        self.docs = [d for d in docs if getattr(d, "vector", None) is not None and len(d.vector) > 0]
        if not self.docs:
            raise ValueError("Retriever: no embeddable docs (all vectors empty/None)")
        self.matrix = np.array([np.asarray(d.vector, dtype="float32") for d in self.docs])
        self.embedder = get_embedder(embedder_type=embedder_type)

    def retrieve(self, query: str, top_k: int) -> list[Hit]:
        qvec = np.asarray(self.embedder(input=query).data[0].embedding, dtype="float32")
        scores = _cosine(qvec, self.matrix)
        order = np.argsort(scores)[::-1][:top_k]
        return [
            Hit(
                text=self.docs[i].text,
                file_path=self.docs[i].meta_data.get("file_path", "unknown"),
                score=float(scores[i]),
            )
            for i in order
        ]
