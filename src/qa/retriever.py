from dataclasses import dataclass
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
