"""machine_check scores by file-level recall against the GT's own cited files
(verified to exist on disk), not a graph-expanded symbol closure."""
from src.eval.ground_truth import GTFacts, machine_check


def _touch(tmp_path, rel, body="x"):
    p = tmp_path / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(body)


def test_full_recall_when_answer_cites_gt_file(tmp_path):
    f = "apps/meteor/app/utils/server/slashCommand.ts"
    _touch(tmp_path, f, "export const slashCommands={}")
    facts = GTFacts(files={f}, symbols={"slashCommands"})
    res = machine_check({"questionType": "locate"},
                        "It is defined in slashCommand.ts", [f], facts, str(tmp_path))
    assert res["score"] == 1.0
    assert f in res["matched"]


def test_zero_recall_when_answer_misses(tmp_path):
    f = "apps/meteor/app/utils/server/slashCommand.ts"
    _touch(tmp_path, f)
    facts = GTFacts(files={f}, symbols=set())
    res = machine_check({"questionType": "locate"}, "no idea", [], facts, str(tmp_path))
    assert res["score"] == 0.0
    assert f in res["missed"]


def test_partial_recall(tmp_path):
    _touch(tmp_path, "a/x.ts")
    _touch(tmp_path, "a/y.ts")
    facts = GTFacts(files={"a/x.ts", "a/y.ts"}, symbols=set())
    res = machine_check({"questionType": "call-chain"}, "see a/x.ts", ["a/x.ts"],
                        facts, str(tmp_path))
    assert res["score"] == 0.5


def test_missing_gt_file_dropped_from_denominator(tmp_path):
    # GT cites two files but only one exists in the pinned repo; the missing one is
    # NOT counted against the system (denominator = files that exist).
    _touch(tmp_path, "a/x.ts")
    facts = GTFacts(files={"a/x.ts", "a/gone.ts"}, symbols=set())
    res = machine_check({"questionType": "impact"}, "", ["a/x.ts:1"], facts, str(tmp_path))
    assert res["score"] == 1.0  # 1/1 existing files matched, gone.ts ignored


def test_no_existing_gt_files_scores_zero(tmp_path):
    facts = GTFacts(files={"a/gone.ts"}, symbols=set())
    res = machine_check({"questionType": "locate"}, "a/gone.ts", ["a/gone.ts"],
                        facts, str(tmp_path))
    assert res["score"] == 0.0
    assert "note" in res


def test_generic_basename_needs_dir_qualified_match(tmp_path):
    f = "packages/models/index.ts"
    _touch(tmp_path, f)
    facts = GTFacts(files={f}, symbols=set())
    # a bare/other index.ts mention must NOT credit the match
    miss = machine_check({"questionType": "locate"}, "look at index.ts",
                         ["src/other/index.ts"], facts, str(tmp_path))
    assert miss["score"] == 0.0
    # the dir-qualified path does credit it
    hit = machine_check({"questionType": "locate"}, "",
                        ["packages/models/index.ts:5"], facts, str(tmp_path))
    assert hit["score"] == 1.0
