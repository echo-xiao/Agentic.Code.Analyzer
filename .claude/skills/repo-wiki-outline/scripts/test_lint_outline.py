"""Stdlib-only tests for lint_outline. Run: python3 -m unittest discover -s .claude/skills/repo-wiki-outline/scripts -p 'test_*.py'"""
import re
import unittest
import lint_outline as L

GOOD = """# Repo Wiki

Last indexed: 15 August 2026 (abc1234)
4 个章节 · 6 个页面 · 预算 7,300 tokens

---

**1  Overview**

**2  Structure**
&nbsp;&nbsp;&nbsp;2.1  Data layer
&nbsp;&nbsp;&nbsp;2.2  API layer

**3  Domain**

**4  Practice**

---

# Part 2

## 1 Overview

```yaml
title: "Overview"
kind: page
status: stub
covers:
  - "packages/a/**"
  - "packages/b/**"
answers:
  - "What is this?"
  - "Where do I start?"
related: []
budget_tokens: 700
source_commit: "abc1234"
```

**Brief:** x

## 2 Structure

```yaml
title: "Structure"
kind: section-landing
status: stub
covers:
  - "packages/a/**"
answers:
  - "How is it built?"
  - "What are the layers?"
related: ["2.1"]
budget_tokens: 800
source_commit: "abc1234"
```

**Brief:** x

## 2.1 Data layer

```yaml
title: "Data layer"
kind: page
status: stub
covers:
  - "packages/b/**"
  - "packages/c/**"
answers:
  - "Where is data read?"
  - "How are models registered?"
related: ["2"]
budget_tokens: 1500
source_commit: "abc1234"
```

**Brief:** x

## 2.2 API layer

```yaml
title: "API layer"
kind: page
status: stub
covers:
  - "packages/c/**"
answers:
  - "How is a route registered?"
  - "Where does auth happen?"
related: []
budget_tokens: 2200
source_commit: "abc1234"
```

**Brief:** x

## 3 Domain

```yaml
title: "Domain"
kind: page
status: stub
covers:
  - "packages/a/**"
  - "packages/c/**"
answers:
  - "What does the product actually do?"
  - "Which capability owns which endpoint?"
related: ["2"]
budget_tokens: 1200
source_commit: "abc1234"
```

**Brief:** x

## 4 Practice

```yaml
title: "Practice"
kind: page
status: stub
covers:
  - "packages/a/**"
  - "packages/b/**"
answers:
  - "How do I build and test this?"
  - "How is a release cut?"
related: []
budget_tokens: 900
source_commit: "abc1234"
```

**Brief:** x

---

# Part 3

Arc: orientation yes; structure yes; domain yes; practice yes; reference none
(evidence absent).
"""


class ParseTest(unittest.TestCase):
    def test_header_and_counts(self):
        p = L.parse_outline(GOOD)
        self.assertEqual(p["header"]["sha"], "abc1234")
        self.assertEqual(len(p["pages"]), 6)
        self.assertEqual(len(p["tree"]), 6)

    def test_fields_parsed(self):
        p = L.parse_outline(GOOD)
        page = p["pages"]["2.1"]
        self.assertEqual(page["title"], "Data layer")
        self.assertEqual(page["kind"], "page")
        self.assertEqual(page["covers"], ["packages/b/**", "packages/c/**"])
        self.assertEqual(len(page["answers"]), 2)
        self.assertEqual(page["budget_tokens"], 1500)

    def test_notes_captured(self):
        p = L.parse_outline(GOOD)
        self.assertIn("orientation", p["notes"])


def results(text):
    return {label: (ok, detail) for label, ok, detail, _ in
            L.check_structure(L.parse_outline(text))}


class StructureTest(unittest.TestCase):
    def test_good_outline_passes_every_hard_check(self):
        checks = L.check_structure(L.parse_outline(GOOD))
        hard = [c for c in checks if c[3] == "HARD"]
        # Floor is the count check_structure actually emits for GOOD (10, as of this
        # writing) so an empty or truncated result list can't make this test pass vacuously.
        self.assertGreaterEqual(len(hard), 10)
        for label, ok, detail, sev in hard:
            self.assertTrue(ok, f"{label}: {detail}")

    def test_tree_and_contracts_must_match(self):
        broken = GOOD.replace("&nbsp;&nbsp;&nbsp;2.2  API layer\n", "")
        self.assertFalse(results(broken)["tree matches contract blocks"][0])

    def test_orphan_second_level_is_caught(self):
        broken = GOOD.replace("## 2.1 Data layer", "## 9.1 Data layer") \
                     .replace("2.1  Data layer", "9.1  Data layer")
        self.assertFalse(results(broken)["every N.M has its parent section"][0])

    def test_section_with_children_must_be_landing(self):
        broken = GOOD.replace('title: "Structure"\nkind: section-landing',
                              'title: "Structure"\nkind: page')
        self.assertFalse(results(broken)["a section with children is a section-landing"][0])

    def test_duplicate_question_is_caught(self):
        broken = GOOD.replace('"Where is data read?"', '"What is this?"')
        self.assertFalse(results(broken)["no question is claimed twice"][0])

    def test_thin_answers_caught(self):
        broken = GOOD.replace('  - "Where do I start?"\n', "")
        self.assertFalse(results(broken)["every page answers >=2 questions"][0])

    def test_uniform_budget_is_caught(self):
        flat = GOOD
        for old in ("700", "800", "1500", "2200", "1200", "900"):
            flat = flat.replace(f"budget_tokens: {old}", "budget_tokens: 1000")
        self.assertFalse(results(flat)["budgets are not uniform"][0])

    def test_budget_spread_is_reported_not_gated(self):
        checks = {label: (detail, s) for label, _, detail, s in
                   L.check_structure(L.parse_outline(GOOD))}
        detail, sev = checks["budget spread"]
        self.assertEqual(sev, "SOFT")
        # GOOD's six budget_tokens values (700, 800, 1500, 2200, 1200, 900) have population
        # stdev 514.5116 and mean 1216.6667, so CV = 514.5116 / 1216.6667 = 0.4229, which the
        # implementation formats to two decimal places.
        self.assertEqual(detail, "CV=0.42")

    def test_numbering_gap_is_caught(self):
        broken = GOOD.replace("## 4 Practice", "## 5 Practice") \
                     .replace("**4  Practice**", "**5  Practice**")
        self.assertFalse(results(broken)["top-level numbering is contiguous"][0])

    def test_related_target_resolves_with_filename_style_ref(self):
        # "related targets resolve" used rstrip(".md") -- a character-set strip, not a
        # suffix strip -- to pull the page number out of a filename-style related value.
        # The existing suite only ever put bare numbers in `related`, so this parsing path
        # had zero coverage. Exercise it both ways: one target that resolves to a real page
        # and one that is genuinely dangling, now via removesuffix(".md").
        resolvable = GOOD.replace('related: []\nbudget_tokens: 700',
                                   'related: ["2.1-data-layer.md"]\nbudget_tokens: 700')
        self.assertTrue(results(resolvable)["related targets resolve"][0])

        dangling = GOOD.replace('related: []\nbudget_tokens: 700',
                                 'related: ["9.9-missing-page.md"]\nbudget_tokens: 700')
        self.assertFalse(results(dangling)["related targets resolve"][0])

    def test_empty_section_landing_is_caught(self):
        # `children` is only built from numbers containing ".", so a section-landing with
        # zero children never showed up in it and the 2-8 check could never see it.
        broken = GOOD.replace("&nbsp;&nbsp;&nbsp;2.1  Data layer\n", "") \
                     .replace("&nbsp;&nbsp;&nbsp;2.2  API layer\n", "")
        broken = re.sub(r"## 2\.1 Data layer\n\n```yaml.*?```\n\n\*\*Brief:\*\* x\n\n", "",
                         broken, flags=re.S)
        broken = re.sub(r"## 2\.2 API layer\n\n```yaml.*?```\n\n\*\*Brief:\*\* x\n\n", "",
                         broken, flags=re.S)
        self.assertFalse(results(broken)["each section holds 2-8 children"][0])


FILES = {"packages/a/x.ts", "packages/b/y.ts", "packages/b/z.ts", "packages/c/w.ts"}
ALLOWED = {"packages/a/**", "packages/b/**", "packages/c/**", "packages/d/**"}
MODEL = {"dispatch": {"cross_module_index": [
    {"id": "rest|a/one", "keys": 2, "modules": 3, "reg": "packages/a/x.ts"},
    {"id": "rest|d/two", "keys": 1, "modules": 2, "reg": "packages/d/absent.ts"},
]}}


def ev(text, files=FILES, allowed=ALLOWED, model=MODEL):
    return {label: (ok, detail) for label, ok, detail, _ in
            L.check_evidence(L.parse_outline(text), files, allowed, model)}


class EvidenceTest(unittest.TestCase):
    def test_expand_is_recursive(self):
        self.assertEqual(L.expand("packages/b/**", FILES),
                         {"packages/b/y.ts", "packages/b/z.ts"})

    def test_good_outline_passes_hard_evidence_checks(self):
        for label, ok, detail, sev in L.check_evidence(
                L.parse_outline(GOOD), FILES, ALLOWED, MODEL):
            if sev == "HARD":
                self.assertTrue(ok, f"{label}: {detail}")

    def test_glob_outside_candidate_list_is_caught(self):
        broken = GOOD.replace('"packages/c/**"', '"packages/invented/**"')
        self.assertFalse(ev(broken)["every glob comes from the candidate list"][0])

    def test_glob_matching_nothing_is_caught(self):
        broken = GOOD.replace('"packages/c/**"', '"packages/d/**"')
        self.assertFalse(ev(broken)["every glob matches >=1 indexed file"][0])

    def test_capability_placement_is_reported_not_gated(self):
        res = {label: (ok, detail, sev) for label, ok, detail, sev in
               L.check_evidence(L.parse_outline(GOOD), FILES, ALLOWED, MODEL)}
        label = "capability placement rate"
        self.assertEqual(res[label][2], "SOFT")
        self.assertIn("1/2", res[label][1])

    def test_arc_accounting_requires_every_position(self):
        broken = GOOD.replace("practice yes; ", "")
        self.assertFalse(ev(broken)["derivation notes account for every arc position"][0])


if __name__ == "__main__":
    unittest.main()
