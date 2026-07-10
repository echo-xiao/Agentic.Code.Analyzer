from dataclasses import dataclass


@dataclass
class H:
    text: str
    file_path: str
    score: float


def test_prompt_enforces_citation():
    """The built prompt must contain citation enforcement and Key Files requirement."""
    from src.qa.ask import _build_prompt

    p = _build_prompt("q", [H("code", "a.ts", 0.9)])
    assert "cite" in p.lower() and "key files" in p.lower()
