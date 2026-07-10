from src.eval.ground_truth import extract_gt_facts, verified_gt_files

GT = "See **`apps/meteor/app/utils/server/slashCommand.ts`, line 25**.\n### Key Symbols\n- `slashCommands`"


def test_extract_and_verify(tmp_path):
    facts = extract_gt_facts(GT)
    assert "apps/meteor/app/utils/server/slashCommand.ts" in facts.files
    assert "slashCommands" in facts.symbols
    (tmp_path / "apps/meteor/app/utils/server").mkdir(parents=True)
    (tmp_path / "apps/meteor/app/utils/server/slashCommand.ts").write_text("export const slashCommands={}")
    assert "apps/meteor/app/utils/server/slashCommand.ts" in verified_gt_files(facts, str(tmp_path), None)


def test_dotted_symbols_are_not_files():
    # Dotted member refs must NOT be mis-read as file paths (they ballooned the GT set).
    gt = "Handled by `API.v1`, `IRoom.teamId`, `AppEvents.IPreRoomCreateExtend`, " \
         "and `Meteor.methods.slashCommand`. Real file: `packages/models/index.ts`."
    facts = extract_gt_facts(gt)
    assert facts.files == {"packages/models/index.ts"}
    for junk in ("API.v1", "IRoom.teamId", "AppEvents.IPreRoomCreateExtend"):
        assert junk not in facts.files


def test_known_extensions_classified_as_files():
    gt = "`ApiClass.ts`, `BoldSpan.tsx`, `app.json`, `README.md` are files; " \
         "`someVar` is a symbol."
    facts = extract_gt_facts(gt)
    assert facts.files == {"ApiClass.ts", "BoldSpan.tsx", "app.json", "README.md"}
    assert "someVar" in facts.symbols
