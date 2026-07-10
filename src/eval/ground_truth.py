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
