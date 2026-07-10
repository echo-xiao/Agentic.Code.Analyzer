import os
import hashlib
from src.preprocess.claude_client import claude_complete

_SYS = "Summarize what this source file does in 2-3 sentences and list its key exported symbols. Be precise; no fluff."


def summarize_file(path, source, cache_dir):
    os.makedirs(cache_dir, exist_ok=True)
    h = hashlib.sha1((path + "\0" + source).encode("utf-8")).hexdigest()
    cache = os.path.join(cache_dir, f"{h}.md")
    if os.path.isfile(cache):
        return open(cache, encoding="utf-8").read()
    out = claude_complete(f"File: {path}\n\n```\n{source[:8000]}\n```", system=_SYS)
    with open(cache, "w", encoding="utf-8") as fh:
        fh.write(out or "")
    return out or ""
