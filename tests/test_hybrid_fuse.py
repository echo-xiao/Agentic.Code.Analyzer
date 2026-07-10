from src.qa.retriever import reciprocal_rank_fusion, Hit


def test_rrf_merges_and_ranks():
    a = [Hit("t1", "x.ts", 0.9), Hit("t2", "y.ts", 0.8)]
    b = [Hit("t2b", "y.ts", 0.7), Hit("t3", "z.ts", 0.6)]
    fused = reciprocal_rank_fusion([a, b], k=60, top_k=3)
    files = [h.file_path for h in fused]
    assert files[0] == "y.ts"          # appears in both -> highest RRF
    assert set(files) == {"x.ts", "y.ts", "z.ts"}
