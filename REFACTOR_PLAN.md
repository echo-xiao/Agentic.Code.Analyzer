# 提案：Rocket.Chat Code Analyzer 重构 — control / data 分层

> 结构：RC 特有复杂度 → 方案（index + agent）→ 架构（离线索引器 / 在线取数 / 离线评估器）→ 落地。
> 索引段对齐**现有代码**（无 embedding、12 种边、`Meteor.methods` 已抽）。基线 pooled core-cov **41.9%**。
> 目标：agent 自己 `plan`（选题型）→ 执行工具取内容；知识进 code/index/data，不留 prose constitution。

---

## 1. Rocket.Chat 特有复杂度（索引必须处理的跨层模式）

`sendMessage` 端到端跨 5 个通信层（React 组件树 → DDP 边界 → 服务端方法 → 数据库写 → afterSave 回调链）。每根**跨层且没有 import 语句**的箭头都会打断朴素静态遍历，索引对每种显式处理：

| 跨层模式 | 根因（import 图看不见） | 索引怎么处理 |
|---|---|---|
| Meteor 字符串方法派发 | `sdk.call('sendMessage')` 目标是字符串字面量 | 字符串抽成**虚拟节点**，`call` 边连过去；`Meteor.methods({...})` 的 key 也抽成 `call` |
| 字符串事件回调 | `callbacks.run/add('afterSaveMessage')` 发射与监听在不同文件、互不 import | 两侧抽成 `event_emit`/`event_listen`，字符串成为连接二者的虚拟节点 |
| REST 客户端↔服务端 | `rest.get('/v1/..')` 与 `API.addRoute('..')` 无 import | `rest_call`/`rest_route` + **`normRoute` 归一化**（`/v1/livechat/room`→`livechat/room`）撞同一虚拟节点 |
| 符号名跨层碰撞 | `sendMessage` 在 monorepo 有 6+ 定义 | **import-aware 消歧**：按 caller 实际 import 的文件筛（`pickRootFile`/`computeImportDistances`） |
| Blaze→React 迁移空档 | `.html` 模板名不在 TS import 图 | **天生死胡同**——索引本就不建这类边，graph 自然停 |

---

## 2. 方案总览：index + agent

- **index（离线）**：把 Rocket.Chat 源码压成可查的依赖图（§3.1）。
- **agent（在线）**：读 query → 用 `plan` 工具**声明意图**（control）→ 调执行工具 `search / graph / details`（data）取内容 → 写答案。

agent 拿两层输入：**Skeleton**（`search` 种子 + `graph` 邻域/链，压缩签名 + 调用边）和 **Details**（按需读完整源码）。

哲学：**知识进 code/index/data**——题型策略进 `plan`、入口点进 `architecture.json`、跨层进虚拟节点边、工具约束进代码 guard。不留 prose constitution。

---

## 3. 架构

失败的指标 triage 到三个平面之一——**索引器 / 调用图 / 推理**——分别修（§3.3.4）。

### 3.1 离线索引器（`src/indexer/`，本次不改，仅记录）

#### 3.1.1 Pipeline
```
scan       glob **/*.{ts,tsx,js}，忽略 node_modules/dist/*.d.ts/*.test/*.spec
dehydrate  ts-morph 遍历 AST → 每文件一份 *.mapping.json（symbols + calls[edgeType] + imports）
           函数体压成 signature-only skeleton（~4× token 缩减）
hash       CodebaseHasher：hash+mtime+size 变了才重生成；GENERATOR_VERSION bump 触发全量
build      addMappingToIndex 灌进 GLOBAL_INDEX 四张表
load       .global_index.json 缓存；冷启/大变(>max(1500,30%))全量，否则增量 patch；watchAndReload 热更
```

#### 3.1.2 GLOBAL_INDEX（内存四张表）
| 表 | 结构 | 用途 |
|---|---|---|
| `symbols` | name → Set\<file\> | 符号 → 定义位置（exact / 种子） |
| `callGraph` | callee → [{caller, file, edgeType}] | **反向边**：谁引用了它（traverse 底层） |
| `fileDependents` | file → Set\<importer\> | import 图（centrality + 作用域裁剪） |
| `allFiles` | Set\<file\> | 全量文件（grep 兜底） |

#### 3.1.3 边抽取（真实 12 种，三类）—— 对齐 `skeleton.ts`

**Category 1 · 静态边**（import 可达，AST 直接 resolve）
| 边 | 触发 | 连接 |
|---|---|---|
| `call` | 函数/方法调用、identifier 调用 | caller → callee |
| `jsx` | `<Component/>`（首字母大写）+ JSX 属性 identifier | 父组件 → 子组件 |
| `new` | `new X()` | caller → class |
| `type` | 类型注解 `x: ChatAPI` + 类 heritage（extends/implements） | 使用点 → 接口/类型定义 |

**Category 2 · 字符串字面量边（动态派发 → 虚拟节点）**：字符串成为 `callGraph` 的 key，把两侧跨文件连起来。
| 边 | 触发（skeleton.ts） | 连接 |
|---|---|---|
| `event_emit` | `callbacks.run/runAsync/priority('X')`、`.emit('X')`、`api.broadcast('X')` | caller → 虚拟节点 'X' |
| `event_listen` | `callbacks.add/addFrom('X', h)`、`.on/.once('X', h)`、`onEvent('X', h)`、`slashCommands.add('cmd')` | 虚拟节点 'X' → handler |
| `pubsub_publish` | `Meteor.publish('X', fn)` | 虚拟节点 'X' → publish 文件 |
| `pubsub_subscribe` | `Meteor.subscribe('X')` | subscriber → 虚拟节点 'X' |
| `call`（跨界） | `sdk.call/Meteor.call('X')`、`Meteor.methods({X:fn})` 的 key | caller → 虚拟节点 'X' |
| `rest_call` | `X.rest.get/post/put/delete('/v1/path')` → `normRoute` | 客户端 → 虚拟节点 path |
| `rest_route` | `API.v1.addRoute/get/post('path')` → `normRoute` | 虚拟节点 path → 路由文件 |
| `stream_def` | `new Streamer('notify-user')` | 虚拟节点 stream 名 → 定义 |
| `stream_sub` | `sdk.stream('notify-user')` | subscriber → 虚拟节点 stream 名 |

> 虚拟节点范例：`callbacks.run('afterSaveMessage')` →『afterSaveMessage』← `callbacks.add('afterSaveMessage', h)`。REST 靠 `normRoute` 剥版本号让 client 与 server 撞同一 key。

**Category 3 · React inner 边**（组件体内的 handler，删体前必须先抽）
`onXxx`/`handleXxx` 箭头函数，先 unwrap `useCallback/useMemo/useEffectEvent/useEvent`，注册成 `Outer.onXxx` 限定符号。**必须在 `setBodyText('/* hidden */')` 之前跑**，否则信息丢失。

> 更正提案两处：①**没有 embedding**——ranking 是纯图邻近 `finalScore`（proximity+cohesion+centrality−hubPenalty），fuzzysort 只做种子；②`Meteor.methods` **已抽**（记为 `call`），非待办。

### 3.2 在线取数（`src/server/`，control / data，4 工具）

#### 3.2.1 Pipeline
```
control  plan(question)      agent 声明意图 → 写 SESSION.intent（决定 graph 默认 move/depth）
data ┌   search(query)       exact + grep + fuzzy 兜底 → 入口种子（不排序）
     │   graph(query)        move ∈ up|down|expand，缺参从 SESSION.intent 取默认
     └   details(sym, file)  仅 1–2 个关键点读源码
```

#### 3.2.2 四工具实现（输入 · 步骤 · 读什么 · 返回）

**① `plan(question)`** — control（`tools/plan.ts` + `intent.ts`）。agent 调它声明意图；服务端按关键词表给默认分类，agent 可覆盖。
```
1. FORCE_INTENT 存在 → intent = 它（oracle），跳过分类
2. 否则按 intent.ts 关键词表逐条匹配，第一个命中即取；都不中 → architecture（拿不准铺广）
3. SESSION.intent = intent
4. 返回 { intent, strategy, nextStep }（从 §3.2.3 recipe 查表）
```
不碰索引。agent 也可绕过 plan、直接给 graph 传 `move`——plan 只给默认。

**② `search(query, layer?)`** — data（`tools/search.ts` + `engine/seeds.ts`），找入口种子、不排序
```
1. exact：symbols.get(query) 命中 → 列文件（layer 过滤）→ 🎯
2. 没命中 → lexicalSeeds(query) 取 top 种子 → 🔍 Closest（fuzzysort 兜底）
3. grep：query 像调用式(含 . ' " ( 空格)或前面全空 → spawnSync grep -rnF TARGET_SRC_DIR
        → 按文件聚合、按命中数排、top 10 → 🔍 Text matches
4. 拼 sections + getArchitectureHint + navHint("Next: graph(query)")
```
只有 exact + grep；`cluster` 在 graph、`prefix/score/path` 及 `chanOn/ABLATE/ONLY` 全删。

**③ `graph(query, {move?, depth?, layer?, edgeTypes?, file?})`** — data（`tools/graph.ts` 薄分发）。一个工具、内部三块（不拆成多工具，plan 已选 move）：
```
0. move/depth 缺 → SESSION.intent 查默认；maxDepth = min(depth, 6)

1. expand → engine/expand.ts —— 内化后的 cluster，排序唯一落点（这里全是优化细节）
     seeds = lexicalSeeds(query, layer)            # exact + fuzzysort；search 复用同一个
     ranked = expandNeighborhood(seeds, lexical, {maxHop:depth, limit:15})
              # 无向 BFS 到 maxHop + finalScore 排序，公式一行不改：
              #   2.0*proximity + 1.5*lex + 0.6*cohesion + 0.2*cent + prior − 0.6*hubPenalty − testPenalty
     → 排序扁平列表（老 🧭）
     # CodeRetriever.search 退化成 lexicalSeeds ∘ expandNeighborhood(maxHop:2) 的薄壳，保 tools-eval 向后兼容

2. down → engine/down.ts：反转 callGraph 得 calleesOf；pickRootFile 选起点；
     DFS 到 depth，子节点按(非test,中心度)排、每层 cap 6 → 缩进调用树

3. up → engine/up.ts：callGraph.get(sym) 取 callers；computeImportDistances 裁剪作用域；
     过滤 test、按 import 距离排序、cap；按 hop×edgeType 分层 → 爆炸半径
```

**④ `details(symbolName, filename)`** — data（`tools/details.ts` + `engine/source.ts`），原 `implement`
```
0. 守卫：SESSION.hasCalledSearchOrGraph 必须 true，否则提示先 search/graph
1. sym 含 "." → getClassMethod(Class, method, file) → 返回该方法源码
2. 否则 getImplementation：ts-morph 载入按名找
     function/variable → 全量源码；class → 方法骨架+列表+提示 Class.method；interface/type → 全量定义
```

#### 3.2.3 intent → move 策略（plan 返回的 recipe）
| intent | search → graph | move |
|---|---|---|
| architecture / routing | search → **expand**（深 2–3） | 广邻域（地图 / 跨界派发） |
| locate / pattern | search → **expand**（深 1） | 浅邻域 |
| call-chain | search → **down**（深 4–6） | 有序链 |
| impact | search → **up**（深 4–6） | 爆炸半径 |

未 plan 回落 `expand` 广。题型区别在**答案形状**：architecture=地图、call-chain=有序链、routing=跨界派发、locate/pattern=单点。

### 3.3 离线评估器：四件事

| 分析 | 内容 | 谁做 | 产物 |
|---|---|---|---|
| **tools** | 确定性工具能力：R@k、graph 可达、chain-order LCS | 自动·无 API·秒级 | 能力天花板 |
| **token** | 效率：每题 token 数、vs no-MCP 基线 | 自动·读 gen 输出 | token 曲线 |
| **agents** | 语义正确性：机制抓对没（文件不同也算对） | **Claude 手动判** | pass / partial / fail + reason |
| **report** | 归因：每题卡在哪一级 + 汇总 | 自动 join | route/seed/traverse/detail/synth |

**Ground truth**：core spine（`testcases.json` 的 `groundTruthPath`），不拿 Claude 全量引用当真值（它每片叶子都引，会把"抓对机制"误判 fail）。

**为什么 agents 手动**：语义对错自动 rubric 判不准（老 eval-3 的 file-overlap 会把"机制对、文件不同"的答案误判 fail）。所以 Claude 读每题答案 vs ground truth，出 **pass/partial/fail + 一句 reason**——这才是语义真值。tools/token 自动、agents 手动，分工干净。

**两开关**（解耦分类与取数）：`FORCE_INTENT`（oracle，路由天花板）vs agent 自己 plan（realistic，log 分类准确率）。差 = 误分类代价。

#### report：归因分析（就一份，不画漏斗）
route→seed→traverse→detail→synth 是**流水线不是漏斗**。报告两样：
- **头号数字**：pass/partial/fail 分布（来自 agents 手动判）。
- **明细表 + 逐题归因**：每题（尤其 fail/partial）标卡在哪一级——第一个失败的级绑定，用 tools 的确定性信号 + oracle 反事实分 route/seed/traverse，用 agents 的 reason 定 detail/synth：
```
route     oracle 能修好                    → plan 选错 move/depth
seed      oracle 修不好 + search 没命中/噪音大 → search 找错入口
traverse  种子对但 graph 没触及/排不上       → expand 磨 rank；up/down 看可达+链序
detail    core 被 surface 但 details 读错     → details 精确率
synth     surface 了没写进 / 机制说错         → 合成（agents 的 reason 指这里）
```
聚合 = 瓶颈分布。归因靠 `seenFiles` 按工具打 tag + oracle 重跑 + agents 的 reason。

#### 反馈闭环：triage 到三平面
每个失败归因指向一个平面：**seed/traverse → 调 engine**（调用图/检索）；**route → 调 plan/intent 表或 architecture.json**（索引/知识）；**detail/synth → 调 prompt / plan 的 strategy**（推理）。评估给信号、人诊断（自动修有过拟合 testcase 的风险）。闭环：报告 → 定向改一处 → 重跑 tools（必要时 agents）→ 对比。**判定口径永远冻结**。

---

## 4. 落地：一次到位

一个 commit：抽 `lexicalSeeds`+`expandNeighborhood`、`CodeRetriever.search` 变薄壳、加 `plan`+`SESSION.intent`、graph 收成 `move`、search 砍到 exact+grep、`implement→details`、删 `chanOn/ABLATE/ONLY` 与整个 AGENTS.md/constitution、题型策略落在 `plan`/`intent.ts`。

**验收只看一件事：agents 效果有没有提升。** 重构前后各跑一遍 gen，Claude 手动判 pass/partial/fail，比 pass 率——升了即成，没升回 report 看归因。tools/token 只是过程中的信号，不当验收门。
⚠️ 跑 agents 需 Rocket.Chat 源码（`details`/`grep` 依赖它）；当前缺源码，验收待源码就位。

---

## 5. 理想文件层级
```
src/
  config.ts
  indexer/                     # 知识层，本次不改
    state.ts  skeleton.ts  hasher.ts  local-db.ts  index.ts
  server/                      # 取数层，重构主战场
    index.ts                   #   MCP bootstrap
    registry.ts                #   变薄 ~80 行：工具清单 + 分发
    session.ts                 #   SESSION（intent + 计量）
    intent.ts                  #   intent→move 表 + 分类关键词（plan 写 / graph 读）
    tools/  plan.ts  search.ts  graph.ts  details.ts
    engine/                    #   每个工具背后的实现（原 retriever.ts 拆开）
      seeds.ts expand.ts down.ts up.ts source.ts
  eval/                        # 测量层
    gen.ts                     #   生成 agent 答案（--mode=nomcp|mcp、FORCE_INTENT oracle）
    tools.ts                   #   确定性工具能力（R@k/可达/链序），无 API，主循环
    token.ts                   #   效率：token vs no-MCP
    report.ts                  #   归因汇总（读 tools/token + Claude 的 verdict）
    verdicts.md                #   agents：Claude 手动判 pass/partial/fail + reason（非脚本）
    utils/
```
（无 AGENTS.md：题型路由在 plan，死胡同靠索引不建边，agent 靠工具的 navHint/nextStep 自导航。）

## 6. 清洁原则
- **单一职责**：plan 只分类、search 只找种子、graph 只遍历+排序、details 只读源码。
- **单一变量**：search 不随 intent 变；排序只在 `expandNeighborhood` 一处。
- **知识进 code/index/data**：能编码的绝不留 prose；不要 constitution。
- **无通道机制**：`chanOn/ABLATE/ONLY` 全删。
- **一工具一文件、一算法一文件**：`registry` 退回注册+分发。
