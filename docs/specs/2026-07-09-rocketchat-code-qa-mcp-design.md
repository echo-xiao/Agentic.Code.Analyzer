# Rocket.Chat 代码问答 MCP —— 设计文档 (Design Spec)

- **日期**: 2026-07-09
- **状态**: Draft(待 review)
- **背景**: Rocket.Chat 官方 GSoC idea 的固定交付物 —— *在 free tier 约束下,能保证 accuracy 地回答用户对 Rocket.Chat 代码库的提问*。
- **基座**: 基于开源 `AsyncFuncAI/deepwiki-open`(Python 后端 + adalflow RAG)改造,从 0 重搭(不继承旧 `Agentic.Code.Analyzer` 实现逻辑)。
- **术语**: 全文技术名词用英文;GT = ground truth。

---

## 0. 设计原则

- **最大化复用公开库,最小化自造轮子**(用户明确要求):每个能力优先找成熟开源实现,自研只填空白与集成层。复用清单见 §5.0。
- **索引期烧质量、查询期抠预算**:贵活离线一次(Claude 预处理 + 全量 embedding),线上每问 ≤2 次 LLM。
- **一切 accuracy 声明先对 GT / 真引擎验证**,MATCH 才进指标、再 commit。

## 1. 目标与成功标准

**一句话**:一个自托管、free-tier 的 MCP server,对 Rocket.Chat 源码做 **全量** 索引,回答代码问题时**每条声明都接地到真实 `file:line`**,并由一套**系统化 eval 哈尼**用可机器核验的 GT 对准确率打分、驱动迭代。

**成功标准(可量化)**:
1. **覆盖率**:索引覆盖 RC 全部源码文件(≈ 8,883 个 ts/tsx/js/jsx,总 10,009 文件),而非 deepwiki-open 那种因超时被迫截断的子集。指标 = 已索引文件 / 应索引文件 → 目标 ~100%。
2. **eval 分数**:对 `src/eval/utils/testcases.json` 的 34 题,用 `logs/answers-claude` 作 GT,按**文件+符号粒度**判分。核心指标:**事实点召回率(fact-point recall)**、**引用命中率(cited file:line 真实且相关)**。
3. **free tier 内可跑**:索引与查询全程只用免费/受限的 Gemini(embedding + Flash)+ 一次性 Claude 预处理,不依赖任何付费 tier。
4. **动态题不塌**:对 `locate/call-chain/impact`(动态注册扩散类)题,召回不显著低于 `architecture` 类。

**范围与优先级**:
- **只针对 Rocket.Chat**,不做多仓库/私有仓通用化。
- **增量跟随 upstream —— 在范围内**(用户要求):除离线全量外,需支持定期跟随 RC main 的增量更新(见 §5.10、M4)。
- **wiki 网页 UI —— 保留口子,置于最后**(可选 M5):deepwiki-open 前端可复用。**若做 UI,则连带做 Mermaid 图生成 + 渲染前校验**(补 deepwiki-open「无预渲染校验」的空白)。非 UI 阶段不做图。

**非目标(YAGNI)**:
- 非 UI(M5 之前)阶段不生成 Mermaid 图。
- 不做 RC 之外的语言/框架泛化。

---

## 2. 背景:deepwiki-open 现状与两个病根(已核验)

deepwiki-open 保 accuracy **几乎只靠 RAG grounding 一个机制**,无引用强制、无引用校验、无检索验证(仅有 embedding 维度一致性检查,属数据完整性)。其对 RC 答不好的两个根因:

1. **漏扫**:前端硬编码 5 分钟超时(PR #273,未合并)覆盖后端计算的时长 → 大仓被迫"换小仓/开过滤" → **扫不全**。(`repo.json` 里 `max_size_mb: 50000` 并非瓶颈,超时才是。)
2. **动态代码**:纯 top-20 语义检索抓不到"分散注册→dispatch"的链路。**实证**:`slashCommands.add()` 在 RC 仓有 **45 处调用点**,语义 top-20 结构性地捞不全。

deepwiki-open 现状关键参数(已读源码核验):

| 项 | 现状 | 位置 |
|---|---|---|
| 抓取 | `git clone --depth=1 --single-branch` + include/exclude 过滤 | `api/data_pipeline.py`, `api/config/repo.json` |
| chunk | 按词切,350 词/块,100 词重叠(**切碎符号**) | `api/config/embedder.json` |
| embedding | 工厂可插拔;内置 `embedder_google` = `gemini-embedding-001`(batch 100) | `api/config/embedder.json`, `api/tools/embedder.py` |
| 检索 | top_k=20,FAISS(adalflow),存 `~/.adalflow/databases/` | `api/rag.py` |
| 生成 | 默认 `google` provider,`gemini-2.5-flash`,注入 `File Path:` 到 context | `api/config/generator.json`, `api/prompts.py` |
| 引用 | context 里给了 file_path,但 **prompt 不强制 cite、不"仅用 context"、无校验** | `api/prompts.py` |
| MCP | **无**(纯 Next.js + FastAPI) | — |

---

## 3. 关键环境事实(已核验)

- **RC 规模**:10,009 tracked 文件;8,883 个 ts/tsx/js/jsx(6,198 .ts + 2,544 .tsx)。结构:`apps/meteor`(主体)、`apps/uikit-playground`、`ee/`(企业版)、`packages/`(56 个:apps-engine、core-services、ddp-client、models、livechat、message-parser…)、`scripts/`。
- **Gemini free tier**(会变,不硬编码,以 AI Studio 实际为准):
  - **Embedding**:free 层约 **10M tokens/分钟** —— 对全量索引极宽裕(全量估 ~25M tokens、数百次 batch 请求)。
  - **生成 (Gemini 2.5 Flash)**:约 **10–15 RPM / 250–1500 RPD**(2025-12 曾砍 50–80%)。**这是全系统最稀缺资源** → 查询侧必须重度节流。
- **GT 可核验性(关键)**:抽验 slash 答案,`apps/meteor/app/utils/server/slashCommand.ts` **文件真实、`slashCommands` 符号真实**,但声称的 "line 25" 实际在 line 27(**行号偏 ~2,因代码演进**)。→ 结论:GT 文件/符号可信,**行号不可信**;判分按文件+符号粒度;GT 入库前需拿当前 RC 复验刷新。
- **GT 格式**:每题答案 = 分节 markdown + 每节 `file:line` + 代码片段 + **Key Files 表** + **Key Symbols 列表**。这定义了我们系统的输出契约与 judge 的核验锚点。

---

## 4. 架构总览

**核心策略:贵而慢的活全塞进离线索引期(Claude 重活 + 全量 embedding);查询期压到 Gemini free,每问 1–2 次 LLM。**

```
┌─ 索引期 (离线, 可重跑, hash 增量缓存) ────────────────────────────────┐
│ A. Ingest      全量枚举 RC 源文件 (去 node_modules/build/lock/binary;    │
│                去掉 deepwiki 的前端超时;不设文件数上限)                  │
│ B. Parse       tree-sitter / TS Compiler API → 符号索引 + 引用图谱        │
│                (定义 / import / export / 调用点 / 注册点)                 │
│ C. Preprocess  Claude 离线预处理 (跑一次, 层级化, 缓存):                  │
│                · 文件/模块摘要                                            │
│                · ★动态接线抽取★: 把"分散注册→dispatch"链路显式成文        │
│ D. Embed       Gemini free embedding (symbol-aware chunk;                 │
│                batch + cache + 增量 + 限流退避)                           │
│                对象 = 代码chunk + Claude摘要 + 动态接线文档               │
│ 产出: FAISS向量库 + 符号图谱 + 摘要 + 动态接线文档 (持久化)              │
└──────────────────────────────────────────────────────────────────────┘
┌─ 查询期 (在线, MCP server, Gemini free, 每问 ≤2 次 LLM) ──────────────┐
│ Hybrid Retrieve  语义(FAISS top-k) + 结构(图谱 traverse) + 词法(grep)   │
│        → 融合排序 (RRF)                                                  │
│ Generate         Gemini 2.5 Flash + ★强制 file:line 引用★ prompt         │
│ Verify           Citation Verifier: 校验每条 cite 的 file 存在、符号命中 │
│                  → 撑不住的声明标注"未验证"/降权/触发一次补检索          │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 5. 组件(各含 职责 / 接口 / 依赖)

### 5.0 复用清单 (Reuse Inventory) —— 呼应 §0 原则

| 能力 | 复用的公开库 | 备注 |
|---|---|---|
| RAG 管道 / 生成编排 | **deepwiki-open** + **adalflow** | 基座,多为改配置 |
| 向量库 / 检索 | **FAISS**(adalflow 内置) | 本地持久化 `~/.adalflow/` |
| **符号 / 引用 / 实现 图谱** | **scip-typescript**(Sourcegraph SCIP indexer) | 编译器级精度、**monorepo `--yarn-workspaces`**(RC 正是 yarn workspaces);产 SCIP protobuf,用 `scip` 库解析。轻量退路:**stack-graphs** / **gossiphs**(tree-sitter,免 build,有 Python 绑定) |
| 代码分块 | **tree-sitter**(ts/tsx grammar) | symbol-aware,不切断符号 |
| 词法检索 | **ripgrep** | exact identifier 兜底 |
| Embedding | **Gemini `gemini-embedding-001`**(free) | deepwiki 已内置 `embedder_google` |
| 生成 | **Gemini 2.5 Flash**(free) | deepwiki 默认 provider |
| 预处理 LLM | **Anthropic Claude**(官方 SDK) | 离线摘要 + 接线抽取 |
| MCP server | **官方 `mcp` Python SDK** | server 骨架 |
| 融合排序 | **RRF**(现成 hybrid-search 实现/小工具) | 无 LLM 开销 |

原则:凡上表已有的,不自研;自研仅限「集成胶水 + Claude 接线预处理 + Citation Verifier + Eval 判分」这几处公开库没覆盖的空白。

### 5.1 Ingest(全量枚举)
- **职责**:clone RC(`--depth=1`),按 `repo.json` 过滤枚举全部源文件,产出 `(path, content)` 列表。**移除 deepwiki-open 前端 5 分钟超时**;索引作为独立离线 job,无请求时限。
- **改动点**:复用 `api/data_pipeline.py` 的 `download_repo`/`read_all_documents`/`should_process_file`;去掉超时;确认 RC 特有目录(`ee/`、`packages/*`)不被误排除。
- **依赖**:git;`repo.json`。

### 5.2 Parse(符号图谱)—— 复用 scip-typescript,不手搓
- **职责**:产出 RC 全仓 **symbol index**(symbol → 定义位置)+ **reference/implementation 图谱**(who-calls-who、who-imports-what、注册点→registry、reverse-deps)。
- **复用**:**Sourcegraph `scip-typescript`** —— 编译器级精度、**原生 monorepo(`--yarn-workspaces`,RC 正是 yarn workspaces)**、~1k–5k 行/秒。产出 SCIP protobuf,用 `scip` 库解析成图,喂给下面三个接口。
- **前置**:scip-typescript 走 TS 编译器,需先对 RC `yarn install`(离线一次性成本;换编译器级准确,值得)。
- **fallback**:若 install 太重/不稳,退到 **stack-graphs** 或 **gossiphs**(tree-sitter 语法级、免 build、有 Python 绑定),牺牲一点精度。
- **接口**:`find_symbol(name) → [defs]`;`find_references(symbol) → [call sites]`;`impacted_by(symbol) → [reverse deps]`。
- **为什么值**:① 给结构检索;② **给 eval 产机器可验证 GT**(locate/call-chain/impact 类);③ 抓动态扩散(45 处注册点全在图里)。这三类题的准确率直接取决于本层,编译器级引用远胜手搓。

### 5.3 Preprocess(Claude 离线预处理)—— 新增
- **职责**:一次性用 Claude 产出:①文件/模块**层级摘要**(先 package/dir 级,再按需下钻文件级,控 token);②**动态接线文档**——针对 RC 已知动态模式(Apps-Engine 注册、DDP method、settings 注册、事件总线、slashCommands、streamer/notifications),让 Claude 读注册点+registry+dispatcher,写成结构化"谁注册什么、在哪 dispatch、扩散到哪"。
- **接口**:输入 = 文件内容 + 符号图谱局部;输出 = markdown 摘要/接线文档(带真实 file 引用)。
- **缓存**:按内容 hash;文件未变则跳过。
- **依赖**:Anthropic API(Claude);符号图谱(5.2)。**注意**:Claude 无 embedding API,仅做文本产出。

### 5.4 Embed(Gemini free 向量化)
- **职责**:对 代码chunk + Claude摘要 + 动态接线文档 做 embedding,存 FAISS。
- **改动点**:① embedder 切 `embedder_google`(`gemini-embedding-001`);② **chunk 改 symbol-aware**(整函数/整类不切断,保 `file`+`start_line`/`end_line` 元数据),替换 deepwiki 的按词 350/100 盲切;③ **batch + 内容 hash 缓存 + 增量 + 429 退避**,以适配 free 层。
- **依赖**:Gemini API;adalflow LocalDB/FAISS。

### 5.5 Hybrid Retriever(查询期)—— 升级
- **职责**:对一个 query,并行取:①语义(FAISS top-k);②结构(从 query 抽取的标识符 → 图谱 traverse:定义、引用、注册点);③词法(exact identifier grep/BM25)。用 **Reciprocal Rank Fusion** 融合去重排序,产出带 file:line 的候选证据集。
- **为什么**:纯语义答不全动态题(45 处注册实证)。
- **依赖**:5.2、5.4;ripgrep。

### 5.6 Generator(Gemini Flash + 强制引用)—— 升级 prompt
- **职责**:把证据集注入,Gemini 2.5 Flash 生成答案。**新 system prompt 强制**:每个事实性声明后必须附 `` `path:line` ``;只能基于提供的 context;输出含 **Key Files 表 + Key Symbols 列表**(对齐 GT 格式)。
- **依赖**:Gemini API;`prompts.py`(新增 RC 专用模板)。

### 5.7 Citation Verifier —— 新增,accuracy 核心
- **职责**:解析答案里的每个 `path:line` 引用,校验:①文件在索引里存在;②该位置/符号确实与声明相关(符号名出现在被引文件、或行邻域文本匹配)。撑不住的引用 → 标注"未验证"/降权,可触发**一次**补检索再答(受 RPD 限,硬上限 1 次)。
- **接口**:`verify(answer, evidence) → {claim, cite, status: ok|unverified}[]`。
- **依赖**:符号图谱 + 索引。

### 5.8 MCP Server —— 新增交付物
- **职责**:stdio MCP server(Python),暴露 tools(见 §8)。查询期编排 5.5→5.6→5.7。
- **依赖**:`mcp` Python SDK;上面各组件。

### 5.9 Eval Harness —— accuracy 机制
- 见 §7。

### 5.10 Incremental Follow(增量跟随 upstream)—— 在范围内
- **职责**:定期 `git fetch` RC main,`git diff <last_indexed>..<HEAD>` 取变更文件集,只对变更集重跑「解析 → Claude 摘要 → embedding」(hash 增量已支撑),更新符号图谱与向量库,记录已索引 commit。
- **依赖**:5.1/5.2/5.3/5.4;git。
- **注**:受 free-tier 限额,增量频率可调(如每日一次);首次仍需全量。

---

## 6. 数据流

**索引期**:`git clone → 枚举(A) → 解析建图(B) → Claude 摘要+接线(C) → symbol-aware chunk → Gemini embed(D) → FAISS + 图谱 + 文档 持久化`。全程 hash 增量、可断点重跑。

**查询期**:`MCP tool 请求 → Hybrid Retrieve(语义+结构+词法, RRF) → 组 context → Gemini Flash 生成(强制引用) → Citation Verifier → (必要时补检索1次) → 返回 {answer, citations, key_files, key_symbols}`。

---

## 7. Eval 哈尼(accuracy 的落地机制)

### 7.1 GT 预处理(入库前必做)
- **复验刷新**:拿当前 RC checkout,对 `answers-claude` 每条 `path:line` 引用做核验——文件存在?符号命中?**行号按 ±N 行窗口容错**(因 GT 行号已知偏 ~2)。产出"已核验 GT",剔除/修正失效引用。
- **抽取 fact-points**:从每份 GT 抽出可核验事实点:{提到的 file}、{Key Symbols}、{call-chain 顺序}、{impact 集合}。这些是判分锚点,**不做整体文本相似度**(避免"像不像 Claude"的循环偏差)。

### 7.2 分层判分(按 questionType)
| questionType | GT 来源 | 判分方式 |
|---|---|---|
| `locate` | **符号图谱(机器)** | 答案指出的 file/symbol 是否 = 图谱定义位置 → 精确 P/R |
| `call-chain` | 符号图谱 + GT 顺序 | 调用链节点召回 + 顺序正确性 |
| `impact` | 反向依赖图 | 答案的受影响集 vs 图谱 reverse-deps 的召回 |
| `pattern`/`architecture`/`routing` | 已核验 GT fact-points | **fact-point 召回率** + **引用命中率**(LLM-judge 只判"这些硬事实点是否覆盖、引用是否真实",不判文风) |

### 7.3 循环性偏差的处理(呼应"主动查 tautological 偏")
- `locate/call-chain/impact` 三类**完全不依赖 Claude GT**,用符号图谱当机器 GT → 天然无循环。
- 开放类只核验"硬事实点 + 引用真实性",不奖励"复述 Claude 的话"。
- 抽样人工 spot-check 若干题,确认 judge 与人判一致。

### 7.4 指标
覆盖率 / 事实点召回率 / 引用命中率(cite 真实且相关)/ 分 questionType 的 P·R。这些是驱动 retrieval 迭代的信号,而非"文本相似度"。

### 7.5 输出物(两套)
每轮 eval 产出两个文件:
- **`metrics.md`** —— 聚合量化:覆盖率、事实点召回率、引用命中率、分 questionType 的 P·R、总分;附与上一轮的 diff(看趋势、驱动迭代)。
- **`verdicts.md`** —— 逐题明细:每道 testcase 的 question、系统答案摘要、命中/漏掉的 fact-points、每个 cite 的校验结果(ok/unverified)、该题 pass/fail 与理由(定位每道题为什么错)。

---

## 8. MCP Tool 面(刻意精简 —— 对齐 DeepWiki)

官方 DeepWiki MCP 只有 3 个 tool(`read_wiki_structure` / `read_wiki_contents` / `ask_question`)。我们**同样保持精简**,默认只暴露:

| tool | 入参 | 出参 | 用途 | 何时有 |
|---|---|---|---|---|
| `ask` | question | {answer, citations[], key_files[], key_symbols[]} | 主问答(内部编排 混合检索+生成+校验) | MVP 起 |
| `read_wiki_structure` | — | 章节树 | 读生成的 wiki 目录 | M5(有 wiki 才有) |
| `read_wiki_contents` | page | markdown | 读某 wiki 页 | M5 |

**结构能力(`find_symbol` / `find_references` / `impacted_by` / `search_code` / `get_file`)默认不作为 MCP tool 暴露**,而是 `ask` 内部的检索接口 + eval 判分接口。仅当确有外部 agent 组合需求时,再以可选 flag 暴露少数几个。→ 直接回应「tools 是不是太多」:是,已收敛到以 `ask` 为主(+ M5 才有的两个 wiki 读取 tool)。

---

## 9. Free-tier 预算与节流

- **索引侧**:embedding 10M TPM 宽裕;按 `batch_size` 打包、内容 hash 缓存(改动才重算)、429 指数退避、可断点续跑。全量首次可能跨多段时间,接受**渐进完成**。
- **查询侧(硬约束)**:Flash ~250–1500 RPD。规则:**每问 LLM 调用 ≤2 次**(1 次生成 + 最多 1 次补检索);检索(语义/结构/词法)与校验**不耗 LLM**;eval 34 题一轮 ≤ ~68 次调用,远在 RPD 内。多把 key / 分组 session(testcases 里已有的 "one free-tier session per group" 约定)作为退路。

## 10. 错误处理
- Embedding 维度不一致 → 沿用 deepwiki `_validate_and_filter_embeddings`。
- Gemini 429/配额耗尽 → 退避重试;索引 job 落 checkpoint;查询侧返回"配额受限,请稍后"而非编答案。
- 检索空命中 → 明确返回"未在索引中找到",不放任 LLM 幻觉。
- Citation 校验全失败 → 答案降级为"低置信 + 未验证引用"标注。

## 11. 测试
- **单元**:parser(符号/引用抽取正确性,拿手写小样)、chunker(不切断符号)、RRF 融合、citation verifier(给定假引用能否判否)。
- **集成**:eval 哈尼端到端跑 34 题,产指标报告。
- **回归**:每次 retrieval 改动都重跑 eval,指标 MATCH 才算改进(呼应"每个改动先对 GT 验证")。

## 12. 风险与开放问题
- **R1 全量首次索引耗时**:8.9K 文件 × (Claude 摘要 + embedding),Claude 侧 token 量大、耗时长。缓解:层级摘要 + hash 缓存 + 可重跑;必要时先索引 `apps/meteor` + `packages` 核心子集验证管道,再铺满。
- **R2 Gemini free 限额随时变**:Google 已多次下调。缓解:退避 + 多 key + 配额耗尽优雅降级;不把具体数字写死进代码。
- **R3 符号图谱构建成本/稳定性**:改用 scip-typescript(编译器级)后精度风险降低,但需先对 RC `yarn install`(重、可能失败)。缓解:install 失败则退 stack-graphs/gossiphs(免 build);动态 registry 仍靠「Claude 接线文档 + 词法 grep」兜底。
- **R4 GT 质量**:answers-claude 有行号漂移、可能有错。缓解:§7.1 复验刷新 + 机器 GT 优先。
- **O1**:deepwiki-open 前端 UI 是否保留(MVP 可只留后端 + MCP + eval)。
- **O2**:Claude 预处理的粒度/预算上限(全量 vs 核心子集优先)——实现期按 R1 决定。

## 13. 里程碑(GSoC 友好分期)
1. **M1 管道打通**:fork deepwiki-open,切 Gemini embedding,全量索引 `packages/` 子集,MCP `ask` 跑通,eval 哈尼出首个基线分。
2. **M2 结构层**:symbol index + reference graph;`find_symbol/find_references/impacted_by`;locate/call-chain/impact 机器判分。
3. **M3 动态接线 + 引用校验**:Claude 预处理接线文档;强制引用 prompt;Citation Verifier;全量铺满。
4. **M4 迭代到达标 + 增量跟随**:按 eval 指标调 retrieval(RRF 权重、chunk、top_k)达成 §1 成功标准;加**增量跟随 upstream**(§5.10:git diff 变更集 → 只重解析/重嵌入);`metrics.md` + `verdicts.md` + demo 交付。
5. **M5(可选,最后)wiki 网页 UI**:复用 deepwiki-open 前端;**Mermaid 图生成 + 渲染前校验**(补其空白);上线 `read_wiki_structure` / `read_wiki_contents` 两个 MCP tool。
