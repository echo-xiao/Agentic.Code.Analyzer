"""Ground-truth facts for eval.

Parse the cited files/symbols out of a GT markdown answer, verify them against the
pinned RC checkout, and score machine-checkable questions (locate/call-chain/impact)
by file-level recall against the GT's OWN cited files.

Design note: we score against the reference answer's cited files (verified to exist on
disk), NOT a graph-expanded symbol closure. Expanding a GT symbol through the symbol
graph (find_references / impacted_by) balloons the denominator to hundreds of noise
files, which drove every machine question to ~0. The honest target for "did the system
locate the right code" is the files the reference answer itself cites.
"""
import os
import re
from dataclasses import dataclass, field

# Source/doc file extensions. A dotted code-span counts as a file path only if it ends
# in one of these — otherwise dotted symbols like `API.v1`, `IRoom.teamId`, or
# `AppEvents.IPreRoomCreateExtend` get mis-read as file paths and pollute the GT set.
_FILE_EXTS = {
    ".py", ".js", ".mjs", ".cjs", ".ts", ".tsx", ".jsx", ".java", ".cpp", ".c",
    ".h", ".hpp", ".go", ".rs", ".html", ".css", ".scss", ".php", ".swift", ".cs",
    ".md", ".txt", ".rst", ".json", ".yaml", ".yml", ".sh", ".sql",
}
_SPAN_RE = re.compile(r"`([^`\n]+)`")
_IDENT_RE = re.compile(r"^[A-Za-z_][A-Za-z0-9_]*$")   # bare identifier, no '.' / '/'

# Generic basenames whose bare mention is too ambiguous to credit a file match
# (RC has hundreds of index.ts). These require a dir-qualified suffix to match.
_COMMON_BASENAMES = {
    "index.ts", "index.tsx", "index.js", "index.jsx", "index.d.ts", "index.mjs",
    "types.ts", "constants.ts",
}


@dataclass
class GTFacts:
    files: set = field(default_factory=set)
    symbols: set = field(default_factory=set)


def _looks_like_file(span: str) -> bool:
    """A code-span is a file path iff its basename ends in a known extension.

    Matching on the basename extension (not merely "contains '/'") rejects npm package
    names (`@rocket.chat/core-services`), URL routes (`/api/v1/`, `/join`), regexes,
    and MIME types (`application/x-www-form-urlencoded`) — all of which contain '/' but
    are not files — while still accepting real paths like `apps/.../slashCommand.ts`.
    """
    s = span.strip()
    if not s or " " in s:
        return False
    base = s.rsplit("/", 1)[-1]           # basename
    i = base.rfind(".")
    return i > 0 and base[i:].lower() in _FILE_EXTS


def extract_gt_facts(gt_md: str) -> GTFacts:
    """Parse GT markdown code-spans into cited files and bare-identifier symbols.

      files:   spans whose basename ends in a known source/doc extension.
      symbols: bare identifiers (no '.' / '/') that are not a component of any file.
    """
    spans = [m.strip() for m in _SPAN_RE.findall(gt_md)]
    files = {s for s in spans if _looks_like_file(s)}
    symbols = {
        s for s in spans
        if s not in files and _IDENT_RE.match(s) and not any(s in f for f in files)
    }
    return GTFacts(files=files, symbols=symbols)


def verified_gt_files(facts: GTFacts, repo_path: str, graph=None) -> set:
    """Subset of GT-cited files that actually exist on disk under repo_path."""
    return {f for f in facts.files if os.path.isfile(os.path.join(repo_path, f))}


def _answer_mentions(rel_path: str, hay: str) -> bool:
    """True if the answer text/citations reference this GT file.

    The full relative path always counts. A generic basename (index.ts, ...) is too
    ambiguous, so it must appear dir-qualified (e.g. 'models/index.ts'); a distinctive
    basename (slashCommand.ts) may match on its own.
    """
    if rel_path in hay:
        return True
    parts = rel_path.split("/")
    base = parts[-1]
    if base in _COMMON_BASENAMES:
        return len(parts) >= 2 and "/".join(parts[-2:]) in hay
    return base in hay


def machine_check(question, answer_text, answer_citations, gt_facts, repo_path):
    """Score a machine-checkable question by file-level recall against the GT's cited
    files that exist on disk.

    Returns dict {score, matched, missed[, note]}. Files the GT cites but that no
    longer exist in the pinned repo are dropped from the denominator (not counted
    against the system). `question` is accepted for interface symmetry with judge_open
    and future per-type weighting; recall is computed the same way for all machine types.
    """
    target = verified_gt_files(gt_facts, repo_path)
    if not target:
        return {
            "score": 0.0,
            "matched": [],
            "missed": sorted(gt_facts.files),
            "note": "no GT-cited files exist on disk (check repo version / GT paths)",
        }
    hay = answer_text + " " + " ".join(answer_citations)
    matched = sorted(f for f in target if _answer_mentions(f, hay))
    missed = sorted(f for f in target if not _answer_mentions(f, hay))
    return {"score": len(matched) / len(target), "matched": matched, "missed": missed}
