import os, re
_CITE = re.compile(r"`([\w./-]+\.\w+)(?::\d+)?`")

def verify_answer(answer_text, repo_path, graph):
    out, seen = [], set()
    for m in _CITE.finditer(answer_text):
        f = m.group(1)
        if f in seen: continue
        seen.add(f)
        ok = os.path.isfile(os.path.join(repo_path, f))
        out.append({"cite": f, "status": "ok" if ok else "unverified"})
    return out

def citation_hit_rate(verifications):
    if not verifications: return 0.0
    return sum(1 for v in verifications if v["status"] == "ok") / len(verifications)
