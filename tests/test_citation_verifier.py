from src.verify.citation_verifier import verify_answer, citation_hit_rate

def test_verify(tmp_path):
    (tmp_path/"a.ts").write_text("export const X=1")
    ans = "X lives in `a.ts` and also `ghost.ts`."
    v = verify_answer(ans, str(tmp_path), None)
    st = {x["cite"]: x["status"] for x in v}
    assert st["a.ts"] == "ok" and st["ghost.ts"] == "unverified"
    assert 0.0 < citation_hit_rate(v) < 1.0
