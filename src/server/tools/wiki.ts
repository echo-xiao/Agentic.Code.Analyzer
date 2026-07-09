// wiki — 离线架构地图（只走入口图逻辑，运行期零 DeepWiki/零网络）。
// 内容全部派生自 data/wiki-map.json（构建期一次性压缩自 DeepWiki）+ 代码索引上的确定性游走：
// 入口页结构（章节 + mermaid 关系边）+ 按相关度排序的候选文件。纯结构无散文，路径全部经索引校验。
// （旧的运行期 DeepWiki MCP 客户端已删除 2026-07-08 — 用户决定只走入口图；活 MCP 版本在 git 历史。）
import { offlineWikiAnswer } from '../engine/entry-map.js';

export async function askWiki(question: string): Promise<string> {
    if (!question) return 'Missing parameter: question';
    return offlineWikiAnswer(question)
        ?? 'No architecture-map hit for this question — the wiki map has no matching page. Use search/graph/details directly.';
}
