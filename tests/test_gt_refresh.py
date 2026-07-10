from src.eval.ground_truth import extract_gt_facts, verified_gt_files

GT = "See **`apps/meteor/app/utils/server/slashCommand.ts`, line 25**.\n### Key Symbols\n- `slashCommands`"


def test_extract_and_verify(tmp_path):
    facts = extract_gt_facts(GT)
    assert "apps/meteor/app/utils/server/slashCommand.ts" in facts.files
    assert "slashCommands" in facts.symbols
    (tmp_path / "apps/meteor/app/utils/server").mkdir(parents=True)
    (tmp_path / "apps/meteor/app/utils/server/slashCommand.ts").write_text("export const slashCommands={}")
    assert "apps/meteor/app/utils/server/slashCommand.ts" in verified_gt_files(facts, str(tmp_path), None)
