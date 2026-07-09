"""
Tests for multi-level included_dirs path matching in read_all_documents.

RED phase: these tests fail before the fix (0 docs returned for multi-level dirs).
GREEN phase: these tests pass after the fix.
"""
import os
import pytest


def _make_repo(tmp_path):
    """
    Create a small fake repo:
        packages/apps-engine/src/a.ts
        packages/other/b.ts
        top.ts
    """
    (tmp_path / "packages" / "apps-engine" / "src").mkdir(parents=True)
    (tmp_path / "packages" / "other").mkdir(parents=True)

    (tmp_path / "packages" / "apps-engine" / "src" / "a.ts").write_text(
        "export const a = 1;", encoding="utf-8"
    )
    (tmp_path / "packages" / "other" / "b.ts").write_text(
        "export const b = 2;", encoding="utf-8"
    )
    (tmp_path / "top.ts").write_text(
        "export const top = 0;", encoding="utf-8"
    )
    return tmp_path


def test_multilevel_included_dir_matches_contiguous_parts(tmp_path):
    """
    Multi-level included_dir "packages/apps-engine" must match files whose path
    contains those components as a contiguous subsequence.

    Before fix: 0 docs (the single-element `in` check never matches "packages/apps-engine").
    After fix: exactly 1 doc (a.ts), b.ts and top.ts excluded.
    """
    from deepwiki.data_pipeline import read_all_documents

    repo = _make_repo(tmp_path)
    docs = read_all_documents(
        str(repo),
        embedder_type="google",
        included_dirs=["packages/apps-engine"],
    )

    file_paths = [d.meta_data["file_path"] for d in docs]

    # a.ts must be included
    assert any(
        os.path.join("packages", "apps-engine", "src", "a.ts") in fp
        or "apps-engine" in fp
        for fp in file_paths
    ), f"Expected a.ts to be included, got: {file_paths}"

    # b.ts and top.ts must NOT be included
    assert not any("b.ts" in fp for fp in file_paths), (
        f"b.ts should be excluded, got: {file_paths}"
    )
    assert not any("top.ts" in fp for fp in file_paths), (
        f"top.ts should be excluded, got: {file_paths}"
    )

    assert len(docs) == 1, (
        f"Expected exactly 1 doc (a.ts), got {len(docs)}: {file_paths}"
    )


def test_single_component_included_dir_still_works(tmp_path):
    """
    Single-component included_dir "packages" must keep working (backward compat).
    Both a.ts and b.ts live under packages/, so both should be returned.
    top.ts is NOT under packages/, so it should be excluded.
    """
    from deepwiki.data_pipeline import read_all_documents

    repo = _make_repo(tmp_path)
    docs = read_all_documents(
        str(repo),
        embedder_type="google",
        included_dirs=["packages"],
    )

    file_paths = [d.meta_data["file_path"] for d in docs]

    assert any("a.ts" in fp for fp in file_paths), (
        f"a.ts should be included, got: {file_paths}"
    )
    assert any("b.ts" in fp for fp in file_paths), (
        f"b.ts should be included, got: {file_paths}"
    )
    assert not any("top.ts" in fp for fp in file_paths), (
        f"top.ts should be excluded, got: {file_paths}"
    )
    assert len(docs) == 2, (
        f"Expected exactly 2 docs, got {len(docs)}: {file_paths}"
    )
