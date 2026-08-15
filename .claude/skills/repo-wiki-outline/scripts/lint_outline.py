#!/usr/bin/env python3
"""Phase 5 checks for an emitted outline.

The outline is one markdown file in three parts: a tree, one contract block per page,
and derivation notes. This reports violations and never edits -- the gate exists so a
human decides what to do about them.

Read-only, stdlib-only, no LLM. Exit code 1 when any HARD check fails.

Design note: nothing here encodes an expected chapter, page or capability name. Every
threshold is either a grammar invariant (4-8 top-level, 2-8 children) or a property of
the repo computed at run time. A check that hard-codes what the outline should contain
would measure the author's expectations, not the outline.
"""
import argparse
import collections
import json
import os
import re
import statistics
import sys

REQUIRED_FIELDS = ("title", "kind", "covers", "answers", "budget_tokens", "source_commit")
VALID_KINDS = ("page", "section-landing")
TEST_MARKERS = (".test.", ".spec.", "/tests/", "/test/", "/__tests__/", ".mocks.")
# The five positions of the reading arc in references/outline-grammar.md. Used only to
# check that Part 3 accounts for each -- never to require a section for any of them.
ARC_POSITIONS = ("orientation", "structure", "domain", "practice", "reference")

PAGE_HEADING = re.compile(r"^##\s+(\d+(?:\.\d+)?)\s+(.*)$", re.M)
TREE_LINE = re.compile(r"^(?:\*\*|&nbsp;)*\s*(\d+(?:\.\d+)?)\s\s+(.+?)(?:\*\*)?$", re.M)
HEADER_SHA = re.compile(r"^Last indexed:\s*(.+?)\s*\(([0-9a-f]+)\)\s*$", re.M)


def is_test(path):
    low = path.lower()
    return any(m in low for m in TEST_MARKERS)


def _yaml_block(body):
    """The contract block is a ```yaml fence holding a flat mapping plus list values.
    A real YAML parser is not in the stdlib and the schema is fixed, so parse the two
    shapes the schema uses and nothing else."""
    m = re.search(r"```ya?ml\n(.*?)\n```", body, re.S)
    if not m:
        return None
    data, key = {}, None
    for raw in m.group(1).split("\n"):
        line = raw.rstrip()
        if not line.strip():
            continue
        item = re.match(r"^\s+-\s+(.*)$", line)
        if item and key:
            data.setdefault(key, [])
            if isinstance(data[key], list):
                data[key].append(item.group(1).strip().strip("\"'"))
            continue
        kv = re.match(r"^([A-Za-z_][\w-]*):\s*(.*)$", line)
        if kv:
            key, value = kv.group(1), kv.group(2).strip()
            if value.startswith("[") and value.endswith("]"):
                data[key] = [v.strip().strip("\"'") for v in value[1:-1].split(",") if v.strip()]
            elif value:
                data[key] = value.strip("\"'")
            else:
                data[key] = []
    return data


def parse_outline(text):
    """Split the file into header, tree, page contracts and derivation notes."""
    header = {}
    h = HEADER_SHA.search(text)
    if h:
        header["date"], header["sha"] = h.group(1), h.group(2)

    heads = list(PAGE_HEADING.finditer(text))
    part2_start = heads[0].start() if heads else len(text)
    tree_text = text[:part2_start]
    tree = [(m.group(1), m.group(2).strip().rstrip("*").strip())
            for m in TREE_LINE.finditer(tree_text)]

    pages = {}
    for i, m in enumerate(heads):
        end = heads[i + 1].start() if i + 1 < len(heads) else len(text)
        body = text[m.end():end]
        fm = _yaml_block(body) or {}
        try:
            budget = int(str(fm.get("budget_tokens", "0")).strip())
        except ValueError:
            budget = 0
        pages[m.group(1)] = {
            "title": fm.get("title", ""),
            "kind": fm.get("kind", ""),
            "covers": [c for c in (fm.get("covers") or []) if c],
            "answers": [a for a in (fm.get("answers") or []) if a],
            "related": [r for r in (fm.get("related") or []) if r],
            "budget_tokens": budget,
            "source_commit": fm.get("source_commit", ""),
            "raw": fm,
            "body": body,
        }

    notes = ""
    tail = re.split(r"^#\s+Part 3.*$", text, flags=re.M)
    if len(tail) > 1:
        notes = tail[-1]
    elif heads:
        notes = text[heads[-1].end():]
    return {"header": header, "tree": tree, "pages": pages, "notes": notes}


def new_checklist():
    """A results list plus the one function that appends to it. Both check_* functions
    need the pair; returning them together keeps the append shape in one place."""
    out = []

    def add(label, ok, detail="", severity="HARD"):
        out.append((label, ok, detail, severity))

    return out, add


def check_structure(p):
    out, add = new_checklist()
    pages, tree = p["pages"], p["tree"]
    nums = set(pages)
    tops = sorted({n for n in nums if "." not in n}, key=int)
    children = collections.Counter(n.split(".")[0] for n in nums if "." in n)

    missing = [n for n, v in pages.items()
               if not all(k in v["raw"] for k in REQUIRED_FIELDS)]
    add("every page carries the required fields", not missing, ", ".join(sorted(missing)[:6]))

    bad_kind = [n for n, v in pages.items() if v["kind"] not in VALID_KINDS]
    add("kind is page or section-landing", not bad_kind, ", ".join(sorted(bad_kind)[:6]))

    wrong_landing = [n for n in tops
                     if children[n] and pages[n]["kind"] != "section-landing"]
    add("a section with children is a section-landing",
        not wrong_landing, ", ".join(wrong_landing))

    tree_nums = {n for n, _ in tree}
    add("tree matches contract blocks", tree_nums == nums,
        f"tree-only {sorted(tree_nums - nums)[:5]} contract-only {sorted(nums - tree_nums)[:5]}")

    orphans = [n for n in nums if "." in n and n.split(".")[0] not in nums]
    add("every N.M has its parent section", not orphans, ", ".join(sorted(orphans)[:6]))

    add("top-level numbering is contiguous",
        tops == [str(i) for i in range(1, len(tops) + 1)], ",".join(tops))
    for t in tops:
        kids = sorted((n for n in nums if n.startswith(t + ".")),
                      key=lambda x: int(x.split(".")[1]))
        expected = [f"{t}.{i}" for i in range(1, len(kids) + 1)]
        if kids and kids != expected:
            add(f"section {t} numbering is contiguous", False, ",".join(kids))

    add("4-8 top-level sections", 4 <= len(tops) <= 8, str(len(tops)))
    off = [f"{t}:{c}" for t, c in children.items() if not 2 <= c <= 8]
    # A section-landing with zero children never gets a `children` entry (the Counter is
    # built only from numbers that contain a "."), so it would otherwise dodge this check
    # entirely. A top-level `page` leaf with no children is legitimate and must stay unflagged.
    off += [f"{t}:0" for t in tops
            if children[t] == 0 and pages[t]["kind"] == "section-landing"]
    add("each section holds 2-8 children", not off, ", ".join(off), "SOFT")

    thin = [n for n, v in pages.items() if len(v["answers"]) < 2]
    add("every page answers >=2 questions", not thin, ", ".join(sorted(thin)[:6]))

    seen = collections.Counter(q for v in pages.values() for q in v["answers"])
    dupes = [q for q, c in seen.items() if c > 1]
    add("no question is claimed twice", not dupes, "; ".join(dupes[:3]))

    dangling = [f"{n}->{r}" for n, v in pages.items() for r in v["related"]
                if r.removesuffix(".md").split("-")[0] not in nums and r not in nums]
    add("related targets resolve", not dangling, "; ".join(dangling[:5]), "SOFT")

    # Upstream's rule is qualitative -- "budgets must visibly vary", "uniform budgets =
    # reject". So the HARD check is literally that: not every page carries the same number.
    # The spread itself is reported, not gated; picking a minimum coefficient of variation
    # would be inventing a pass mark this file has no standing to set.
    budgets = [v["budget_tokens"] for v in pages.values() if v["budget_tokens"]]
    mean = statistics.mean(budgets) if budgets else 0
    cv = statistics.pstdev(budgets) / mean if len(budgets) > 1 and mean else 0
    add("budgets are not uniform", len(set(budgets)) > 1, f"{len(set(budgets))} distinct values")
    add("budget spread", True, f"CV={cv:.2f}", "SOFT")

    shas = {v["source_commit"] for v in pages.values() if v["source_commit"]}
    add("source_commit agrees with the header",
        bool(p["header"].get("sha")) and shas == {p["header"]["sha"]},
        f"header={p['header'].get('sha')} pages={sorted(shas)[:3]}", "SOFT")

    add("page count", True, str(len(pages)), "SOFT")
    return out


def load_index(graph_dir):
    files = set()
    for name in os.listdir(graph_dir):
        if not name.endswith(".json") or name.startswith("_"):
            continue
        with open(os.path.join(graph_dir, name)) as fh:
            shard = json.load(fh)
        for entry in shard.get("files", []):
            path = entry if isinstance(entry, str) else (entry.get("path") or entry.get("file"))
            if path and not is_test(path):
                files.add(path)
        for d in shard.get("defs", []):
            if not is_test(d["file"]):
                files.add(d["file"])
    return files


def expand(glob_pat, files):
    """`a/b/**` means everything under a/b. fnmatch does not let `**` cross separators,
    so the trailing-`/**` form -- the only form the candidate list emits -- is handled
    directly."""
    if glob_pat.endswith("/**"):
        prefix = glob_pat[:-2]
        return {f for f in files if f.startswith(prefix)}
    return {f for f in files if f == glob_pat}


def check_evidence(p, files, allowed, model):
    out, add = new_checklist()
    pages = p["pages"]
    claimed, per_page, bad, empty = set(), {}, [], []
    for num, v in pages.items():
        got = set()
        for g in v["covers"]:
            if g not in allowed:
                bad.append(f"{num}: {g}")
            hits = expand(g, files)
            if not hits:
                empty.append(f"{num}: {g}")
            got |= hits
        per_page[num] = got
        claimed |= got

    add("every glob comes from the candidate list", not bad, "; ".join(bad[:6]))
    # E13: the evidence-free rule, stated mechanically. No subject is banned by name.
    add("every glob matches >=1 indexed file", not empty, "; ".join(empty[:6]))

    pct = len(claimed) / len(files) * 100 if files else 0
    add("coverage", True, f"{len(claimed)}/{len(files)} = {pct:.1f}%", "SOFT")

    # Capability placement: derived wholly from the model, never from a hand-written list
    # of expected features. Reported, not gated -- picking a pass mark would be picking an
    # answer.
    index = (model.get("dispatch") or {}).get("cross_module_index") or []
    placed = [g for g in index if g.get("reg") and g["reg"] in claimed]
    missed = [g for g in index if not (g.get("reg") and g["reg"] in claimed)]
    rate = f"{len(placed)}/{len(index)}"
    if index:
        rate += f" = {len(placed) / len(index) * 100:.1f}%"
    add("capability placement rate", True, rate, "SOFT")
    if missed:
        add("unplaced capabilities", True,
            "; ".join(f"{g['id']}({g.get('reg') or 'no register file'})" for g in missed[:10]),
            "SOFT")

    # E14: the arc is a reporting duty. This checks that Part 3 mentions every position,
    # not that any position produced a section.
    notes = p["notes"].lower()
    unaccounted = [a for a in ARC_POSITIONS if a not in notes]
    add("derivation notes account for every arc position",
        not unaccounted, "missing: " + ", ".join(unaccounted))

    # Directory echo applies to pages that own exactly one recursive glob. Landing pages
    # legitimately do, so they are exempt.
    leaves = [n for n, v in pages.items() if v["kind"] == "page"]
    echo = [n for n in leaves
            if len(pages[n]["covers"]) == 1 and pages[n]["covers"][0].endswith("/**")]
    ratio = len(echo) / len(leaves) * 100 if leaves else 0
    add("<=40% of pages are a single-directory echo", ratio <= 40, f"{ratio:.0f}%")

    tops = [n for n in pages if "." not in n]
    first = min(tops, key=int) if tops else None
    if first:
        add("the first section stays under 800 tokens",
            pages[first]["budget_tokens"] < 800,
            str(pages[first]["budget_tokens"]), "SOFT")
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--wiki", default="output.nosync/wiki-spine.md")
    ap.add_argument("--graph", default="output.nosync/graph")
    ap.add_argument("--candidates", default="/tmp/glob_candidates.json")
    ap.add_argument("--model", default="/tmp/repo_model.json")
    ap.add_argument("--budget", type=int, default=80000)
    args = ap.parse_args()

    with open(args.wiki) as fh:
        parsed = parse_outline(fh.read())
    with open(args.candidates) as fh:
        allowed = {c["glob"] for c in json.load(fh)["candidates"]}
    model = {}
    if os.path.exists(args.model):
        with open(args.model) as fh:
            model = json.load(fh)
    files = load_index(args.graph)

    checks = check_structure(parsed) + check_evidence(parsed, files, allowed, model)

    total = sum(v["budget_tokens"] for v in parsed["pages"].values())
    checks.append(("budget total within +-15%",
                   abs(total - args.budget) <= args.budget * 0.15,
                   f"{total} vs {args.budget}", "SOFT"))

    failed = False
    for severity in ("HARD", "SOFT"):
        print(f"\n== {severity} ==")
        for label, ok, detail, sev in checks:
            if sev != severity:
                continue
            mark = "ok " if ok else ("FAIL" if severity == "HARD" else "warn")
            print(f"  [{mark}] {label}" + (f"  -- {detail}" if detail else ""))
            if severity == "HARD" and not ok:
                failed = True

    claimed = set()
    for v in parsed["pages"].values():
        for g in v["covers"]:
            claimed |= expand(g, files)
    unclaimed = files - claimed
    if unclaimed:
        top = collections.Counter("/".join(f.split("/")[:3]) for f in unclaimed)
        print(f"\n== unclaimed ({len(unclaimed)} files) -- each needs a reason in Part 3 ==")
        for k, v in top.most_common(12):
            print(f"  {v:5d}  {k}")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
