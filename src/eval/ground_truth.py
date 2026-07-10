"""GT refresh: extract cited files/symbols from GT markdown and verify against RC."""
import os
import re
from dataclasses import dataclass, field

# Matches code-spans that look like file paths: contain '/' or have a file extension
_PATH_RE = re.compile(r"`([\w./-]+\.\w+)`")
# Matches any code-span that looks like an identifier
_SYM_RE = re.compile(r"`([A-Za-z_][A-Za-z0-9_.]*)`")


@dataclass
class GTFacts:
    files: set = field(default_factory=set)
    symbols: set = field(default_factory=set)


def extract_gt_facts(gt_md: str) -> GTFacts:
    """Parse GT markdown and return files (path code-spans) and symbols (bare identifier code-spans).

    Classification logic:
      - files:   code-spans that contain '/' OR have a file extension (contain '.')
                 matched by _PATH_RE (pattern requires at least one '.' in the span)
      - symbols: code-spans matching an identifier pattern that are NOT already
                 classified as a file path, i.e. no '/' and no '.' in the span
    """
    files = set(_PATH_RE.findall(gt_md))
    # bare identifiers: no '/' and no '.' — unambiguously not a file path
    symbols = {s for s in _SYM_RE.findall(gt_md) if "." not in s and "/" not in s}
    # remove any symbol token that is a substring component of a known file path
    symbols = {s for s in symbols if not any(s in f for f in files)}
    return GTFacts(files=files, symbols=symbols)


def verified_gt_files(facts: GTFacts, repo_path: str, graph) -> set:
    """Return the subset of GT files that actually exist on disk under repo_path."""
    return {f for f in facts.files if os.path.isfile(os.path.join(repo_path, f))}


import os as _os


def _authoritative_files(qtype, symbols, graph):
    files = set()
    for s in symbols:
        if qtype == "locate":
            files |= {d["file"] for d in graph.find_symbol(s)}
        elif qtype == "call-chain":
            files |= {d["file"] for d in graph.find_symbol(s)} | {r["file"] for r in graph.find_references(s)}
        elif qtype == "impact":
            files |= {x["file"] for x in graph.impacted_by(s)}
    return files


def machine_check(question, answer_text, answer_citations, gt_facts, graph):
    files = _authoritative_files(question["questionType"], gt_facts.symbols, graph)
    if not files:
        return {"score": 0.0, "matched": [], "missed": [], "note": "no authoritative files from graph"}
    hay = answer_text + " " + " ".join(answer_citations)
    bases = {(_os.path.basename(f), f) for f in files}
    matched = sorted(f for b, f in bases if b in hay)
    missed = sorted(f for b, f in bases if b not in hay)
    return {"score": len(matched) / len(files), "matched": matched, "missed": missed}
