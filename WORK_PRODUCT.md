# GSoC 2026 Work Product: Agentic Code Analyzer for Rocket.Chat

- **Contributor:** Echo Xiao ([@echo-xiao](https://github.com/echo-xiao))
- **Project:** Agentic Code Analyzer
- **Mentor:** William Liu
- **Organization:** Rocket.Chat
- **Repository:** [RocketChat/Agentic.Code.Analyzer](https://github.com/RocketChat/Agentic.Code.Analyzer)
- **Period:** 25 May 2026 – 18 August 2026 (proposal-phase prototype from 25 February)

---

## The problem

Newcomers to a large codebase face the same wall: they cannot read their way into it, and there is
no onboarding document that would let them. Rocket.Chat needed a **free** tool a contributor could
ask questions of — "how do push notifications work?", "where is a message permission checked?" —
and get an answer grounded in the actual source. That need is what this project set out to serve.

Rocket.Chat's size is what makes it hard. Roughly 15,000 indexable source files across dozens of
workspace packages, and a large share of the control flow does not travel through import edges at
all. It travels through string dispatch: `Meteor.call` to `Meteor.methods`, a REST route
registration to its handler, `callbacks.run` to `callbacks.add`, a streamer definition to its
subscription. No parser resolves those natively, so a tool built on import graphs sees a
disconnected repository.

Two criteria had to hold at the same time:

- **Cost** — a question must be answerable inside a free-tier LLM quota. Request count, not tokens
  and not wall-clock time, is the scarce resource.
- **Accuracy** — the answer has to get the mechanism right, and the code it cites has to actually
  say what it is claimed to say.

## Background: where this sits relative to DeepWiki

A commercial product already solves this problem end to end: DeepWiki. Its page for this
project's target repository is
[deepwiki.com/RocketChat/Rocket.Chat](https://deepwiki.com/RocketChat/Rocket.Chat/). It ships
three things per repository:

- a browsable **wiki page**;
- an **MCP product** that answers a question about the repository directly;
- an **MCP product** that serves the repository's **code map**.

This project does not compete with it. It is an **open-source reference implementation**, scoped
to the code map layer alone; its benchmark baseline comes from the question-answering MCP. The wiki layer is not built, because there is no
suitable method for it yet. DeepWiki manages it, but it is closed, and nothing published describes
how; nor could I derive an approach that held up. Without a method that holds up the output cannot
be evaluated, so that layer is left for later.

DeepWiki was not known when this project started; it was discovered partway through and adopted as
an external yardstick, which is why the design goals here — free-tier cost, citations checkable to
a line range, an index that runs locally — were not set by comparison with it.

## Scope: what this project is, and what it is not

The original design had two halves: a *thin knowledge layer* acting as a router, and MCP tools
that let a model traverse the code graph hop by hop. Both halves ran into trouble.

The thin layer failed on two counts. Its **coverage was incomplete** — many kinds of question had
nowhere to land in it — and it **could not be kept current**: the repository moves, and there was
no mechanism to keep the layer moving with it. Fixing either means making the layer thick, and
building a layer thick enough to cover the repository and current enough to track it *is* the
repo-to-wiki problem above, the one with no method that holds up.

The trouble with the other half is described under "Iteration and changes of direction" below. The response
was to split the problem and pick one half:

- **Knowledge layer** — not built here for now. The pipeline consumes DeepWiki's outline as its
  knowledge layer instead.
- **Code map** — this is the project's deliverable.

## What was built

Three components.

**Offline graph indexer (`src/indexer/`).** A ts-morph pass over the target repository producing
71 shards, one per workspace package, about 46 MB, regenerable. This is where most of the
project's effort went. It has a static half and a string-dispatch half.

*Static half.* Every reference is resolved to a declaration by the TypeScript type checker: a
declaration inside the repository becomes a project binding, one in `lib.*.d.ts` or under
`node_modules` produces no edge.

- **One ts-morph Program per package, with the workspace `paths` injected**: 70 packages, 165
  seconds. For the `ddp-client` package alone, cross-package bindings went from 0 to 347 and the
  unbound share from 28.8% to 0.3%.
- **Node identity is `defId = <relative path>#<qualified name>`**, not the symbol name. That
  removes the "same name, take the first matching file" fallback entirely.
- **Binding rules replaced nine heuristics**: on a hand-checked sample of 200 edges, false edges
  **0/200**, fully correct **197/200 (98.5%)**.
- **Per-package shards with `fanIn` counted per definition**: cross-package edges went from 8 to
  26,525 — nearly every cross-package relationship had been missing.
- **`yarn install` is a hard prerequisite**, and the indexer exits with an error without it: the
  `extends` in 102 tsconfig files cannot resolve without `node_modules`.

*String-dispatch half: six communication trunks.* This is the part no parser resolves. The six
were not chosen by size but because **they cover every major cross-module hop in the repository**:
in-process events (callbacks), inter-service events (service-events), inter-service RPC
(api.call), client-to-server (REST, Meteor methods) and server-to-client (streamer). Any
cross-module control flow makes at least one hop through one of them.

Matching is by *resolved declaration*, never by call-site text. Testing `objText === 'callbacks'`
misses `this.callbacks.add(...)`, aliased imports and destructured calls — three spellings whose
declaration is one and the same node. REST additionally needs its paths normalised (stripping
`^/` and `^v\d+/`) before the two sides join at all: measured, 5 slots / 373 keys before
normalisation against 13 slots / 646 keys after.

Each trunk was then reconciled side by side. **The bar is not "a high share of keys have both
sides", it is "every asymmetry has an explanation"** — a difference may be non-zero, but it may
not be unaccounted for:

| Trunk | Keys | Register | Dispatch | Both sides | Reg. only | Disp. only | Reading |
|---|---|---|---|---|---|---|---|
| REST | 624 | 622 | 472 | 322 | 289 | 13 | `AppsRestApi` carries its prefix in the type parameter while `addRoute` registers only the bare sub-path, splitting one route across two keys. Fixed, merging 15 routes; the remaining 13 are other instances of the same pattern (federation 5, apps 4, livechat 3, `im.leave`) |
| api.call | 270 | 292 | 0 | 0 | 270 | 0 | The dispatch side is a template string `api.call(...)`, which correctly lands in unbound; the typed Proxy on the business side travels as an ordinary static edge. Also fixed: `variant` was never assigned, so 22 keys registered once under the monolith and once under microservices were collapsed into one graph |
| Meteor methods | 193 | 190 | 41 | 35 | 155 | 3 | The idiom recognised only `Meteor.call`, of which the real codebase has zero occurrences; adding `useMethod` 32, `sdk.call` 11, `callAsync` 1 is what made the sides meet. The 3 dispatch-only keys are Meteor's built-ins (`login`, `resetPassword`, `stream-notify-room`) |
| callbacks | 86 | 134 | 122 | 70 | 3 | 13 | The 13 are empty extension points: `beforeMuteUser`, `afterAddedToRoom`, `onCreateUser` and friends are declared in the `Hook` type union and `run` by product code, but nothing in the repository calls `.add()` — they are reserved for EE and third-party Apps |
| service-events | 72 | 97 | 182 | 63 | 7 | 2 | More dispatch sites than register sites is expected; one event can be broadcast from many places |
| streamer | 16 | 16 | 70 | 10 | 6 | 0 | All 70 dispatch sites land on genuinely registered channels, evidence the idiom is not matching too broadly; the 6 unsubscribed channels (`local`, `apps-engine`, `room-data`, `notify-room-users`) have no `useStream` anywhere on the client, confirming they are server-only |

`slash-commands` is also in the graph but marked `scope: 'out'` — something that already works is
not deleted, but its numbers are never counted towards the six trunks.

These six are the **trunks, not every dispatch form**. Other mechanisms in the repository are not
exhausted here — the intermediate hops that dispatch on data (`roomCoordinator` picking a room
type by `room.t`, `MessageTypes` choosing a renderer by `msg.t`) and several client-side
registries among them. The scope of this round was to connect the main cross-module channels, not
to cover every kind.

**DeepWiki outline as the knowledge layer (`src/deepwiki/`).** The outline is fetched and cached
on disk, then split into 294 subsections, each carrying the source files cited under it. Questions
are routed against these subsections.

**MCP tool (`src/mcp/`).** A stdio Model Context Protocol server exposing one tool,
`ask_codebase(question)`, callable from any MCP client. Inside it runs a fixed pipeline with no
agent loop, orchestrated in `src/pipeline/run.ts` (131 lines, one question end to end):

1. **Routing** (LLM call 1, `routing.ts`) — the question plus all 294 wiki subsections go to the
   model, which picks the relevant subsections and groups them into *chains* by topic. This is the
   one place in the pipeline that maps natural language onto repository structure.
2. **Entry retrieval** (no LLM, `entry.ts`) — take the source files cited by the chosen
   subsections, add a full-repo lexical channel, and fuse the two rankings with RRF to get each
   chain's seed symbols.
3. **Skeleton expansion** (no LLM, `candidates.ts` + `skeleton-defs.ts`) — expand the definition
   graph from the seeds into per-chain skeletons. Pure in-memory graph work, about 3 seconds for
   all 34 questions; the rules that matter are below.
4. **Chain selection** (LLM call 2, `select.ts`) — every chain's skeleton goes to the model, which
   decides which chains are worth reading in full. The granularity is the chain, not the node: a
   chain header carries three reliable signals (page, subsection, seed symbol), while node names
   alone mislead.
5. **Targeted reading** (no LLM, `reading.ts`) — read the bodies of major nodes in the kept chains
   by line range, round-robin across chains with roots first, into a token budget (24,000 by
   default). Round-robin matters: measured chain sizes are wildly uneven (35 / 81 / 81 / 4 / 6 / 7
   / 30 / 13 major nodes), so reading in render order lets the first large chain eat the ceiling.
6. **Answer generation** (LLM call 3, `answer.ts`) — one shot over the kept skeleton text plus the
   read bodies. The skeleton goes into the prompt too, so the model can narrate the pass-through,
   boundary and dispatch nodes that have no body to read at all.

Three LLM requests per question, fixed. That is what keeps a question inside the free tier.

**The skeleton expansion rules:**

- **A chain travels in one direction only.** The answer to a flow question is downstream of the
  entry; the answer to an impact question is upstream. Direction is decided by the data: compare
  the entry's best downstream candidate against its best upstream candidate (upstream weighted
  0.7) and follow the winner. A chain never turns around, or indentation would mean both "then"
  and "alongside" at once. If the entry sits mid-flow, the root may be moved up once, after which
  the chain is strictly downstream.
- **Downstream edges are filtered by file.** The call graph is indexed by symbol name rather than
  definition site, so a shared name drags in outgoing edges belonging to other files; candidates
  are filtered to the file the current node resolved to before they are scored. Upstream is pruned
  the same way, by import relation.
- **Five node classes.** `boundary` (crosses into another subsystem), `hotleaf` (fan-in above 25)
  and `type` (a type declaration) become leaves immediately and are not expanded; `passthrough` (a
  single-candidate forwarding shell) is rendered but costs no quota; everything else is `major` —
  short id, costs quota, body read.
- **String-dispatch keys become pseudo-nodes.** A key (an event name, a route, a streamer name) is
  not a real symbol, so treating it as an ordinary candidate discards it as external. Keys are
  instead kept as pseudo-nodes with no definition site and no body, with every member on that key
  listed flat beneath them — no recursion, no quota, no body read — which makes all listeners on
  an event visible in the skeleton. A key is recognised by the shape of its name (contains a
  separator, or splits into two or more subwords), so callback parameters like `resolve` and `cb`
  are not mistaken for keys.

Main parameters (`skeleton-defs.ts`): downstream depth 6, upstream depth 3, at most 8 child
candidates per node, hot-node fan-in threshold 25, upstream direction weight 0.7, at most 12
same-key siblings, 200 nodes per chain, a 24,000-token read budget.

Calls are serialised with a 6-second spacing so a host emitting several tool calls at once cannot
exceed the rate limit.

## A complete run

The question, asked through the MCP tool: *How do push notifications work in Rocket.Chat?*

The tool's answer, verbatim:

> Rocket.Chat's push notification system is primarily managed by the `PushClass` (3b) which exposes a public `send` method (4b). This system supports both native push services (Apple Push Notification Service - APN and Firebase Cloud Messaging - FCM) and a custom gateway for sending notifications.
>
> Here's a breakdown of how push notifications work:
>
> 1.  **Initiating a Push Notification:**
>     *   The process typically starts with a call to `Push.send(options: IPushNotificationConfig)` (4b), which is an instance of `PushClass` (3a).
>     *   Various parts of the application can trigger this, such as:
>         *   `NotificationQueue.push` (4d) for general notifications.
>         *   `PushNotification.send` (4c) which wraps the `Push.send` call.
>         *   `executePushTest` (4e) for testing push functionality.
>         *   `VideoConferenceService.sendPushNotification` (4h) and `sendAllPushNotifications` (4i) for video conference calls.
>         *   `MediaCallService.sendVoipPushNotificationAsync` (4k) and `sendVoipPushNotification` (4l) for VoIP calls.
>
> 2.  **Constructing the Notification Payload:**
>     *   The `PushClass.send` method (4b) takes an `IPushNotificationConfig` and transforms it into a `PendingPushNotification` object. This object includes details like `createdAt`, `createdBy`, `title`, `text`, `userId`, `payload`, `badge`, `sound`, `notId`, `priority`, `useVoipToken`, and platform-specific options (`apn`, `gcm`).
>     *   The `_validateDocument` method ensures the `PendingPushNotification` adheres to the expected structure.
>
> 3.  **Core Sending Logic (`sendNotification`):**
>     *   The `PushClass.send` method then calls `private async sendNotification(notification: PendingPushNotification, options)` (4a).
>     *   This method first validates basic string fields (`from`, `title`, `text`).
>     *   It retrieves all relevant device tokens (`IPushToken`) for the target `userId` from the `PushToken` model (e.g., `PushToken.findAllTokensByUserId` or `findTokensByUserIdExceptId`).
>     *   For each `app` (device token) found, it decides whether to use the **Gateway** or **Native** push mechanism.
>
> 4.  **Gateway Push Notifications:**
>     *   If `this.shouldUseGateway()` returns `true` (meaning `this.options.gateways` is configured and cloud services are agreed upon), `sendNotification` calls `private async sendNotificationGateway(...)` (5b, 8a).
>     *   **`sendNotificationGateway` (8a):**
>         *   Prepares the notification data for the gateway by calling `getGatewayNotificationData` (5e), which strips `priority` and `useVoipToken` from the `PendingPushNotification` to create a `GatewayNotification` (5a).
>         *   Sets `retryOptions`, with `maxRetries` being 0 for VoIP tokens.
>         *   Iterates through configured gateways.
>         *   For APN tokens, it determines the `userToken` (VoIP or regular) and `topic` (e.g., `${app.appName}.voip`).
>         *   It then calls `private async sendGatewayPush(...)` (5b, 8b) for each token and service type ('apn' or 'gcm').
>     *   **`sendGatewayPush` (8b):**
>         *   Adds a `uniqueId` from `this.options` to the `GatewayNotification`.
>         *   Constructs an HTTP POST request to the gateway URL (`${gateway}/push/${service}/send`) with the token and notification options in the body. Authorization headers are added if available.
>         *   Handles the response status:
>             *   `406`: Calls `this.removeToken(token)` (8c) to remove the invalid token from the database via `PushToken.removeOrUnsetByTokenString` (8d).
>             *   `422` or `401`: Logs a warning and does not retry.
>             *   `result.ok`: The notification was sent successfully.
>             *   Other errors: Logs an error and schedules a retry with exponential backoff (`setTimeout`) if `tries < maxRetries`.
>
> 5.  **Native Push Notifications (APN & FCM):**
>     *   If `this.shouldUseGateway()` returns `false`, `sendNotification` calls `private async sendNotificationNative(...)` (7a, 9c).
>     *   **`sendNotificationNative` (7a):**
>         *   Checks the type of `app.token` (APN or GCM).
>         *   **For APN tokens:**
>             *   Determines the `userToken` (VoIP or regular APN token) and `topic` (e.g., `${app.appName}.voip`).
>             *   If APN options are configured and a `userToken` exists, it calls `export const sendAPN(...)` (7b).
>         *   **For GCM tokens:**
>             *   It first calls `private async getNativeNotificationAuthorizationCredentials()` (7f) to obtain an OAuth2 token and project ID from the `Push_google_api_credentials` setting.
>             *   It then constructs `sendGCMOptions` with these credentials.
>             *   Finally, it calls `export const sendFCM(...)` (7d, 9b) with the GCM token, notification, and options.
>         *   If the token type is neither APN nor GCM, it throws an error.
>     *   **`sendAPN` (7b):**
>         *   Requires an initialized `apnConnection`.
>         *   Creates a new `apn.Notification()` (1b).
>         *   Sets various properties on the `note` object based on the `PendingPushNotification`, including `pushType` (for VoIP), `expiry`, `badge`, `sound`, `setContentAvailable` (7c), `category`, `body` (from `text`), `title`, `threadId` (from `notId`), `payload`, `priority`, `topic`, and `mutableContent`.
>         *   Sends the `note` to the `userToken` via `apnConnection.send()`.
>         *   Handles failures: if the status is '400' or '410', it calls `_removeToken(userToken)` to remove the invalid token.
>     *   **`sendFCM` (7d, 9b):**
>         *   Takes `NativeNotificationParameters` (9a) including `userTokens`, `notification`, `_removeToken` callback, and `options`.
>         *   Formats the `notification` into FCM messages using `getFCMMessagesFromPushData` (not expanded).
>         *   Constructs HTTP headers with `Authorization: Bearer ${options.gcm.apiKey}`.
>         *   Sends each FCM message to the Google FCM API endpoint (`https://fcm.googleapis.com/v1/projects/${options.gcm.projectNumber}/messages:send`) using `fetchWithRetry`.
>         *   The `fetchWithRetry` function includes a callback to `_removeToken` if the push fails, ensuring invalid tokens are cleaned up.
>
> 6.  **Token Removal (`removeToken`):**
>     *   The `private removeToken(token: string)` method (8c) is called when a push service (APN, FCM, or Gateway) indicates a token is invalid.
>     *   It calls `PushToken.removeOrUnsetByTokenString(token)` (8d) which performs two database operations:
>         *   `deleteMany` to remove documents where the `token.apn` or `token.gcm` field matches the invalid token.
>         *   `updateMany` to `$unset` the `voipToken` field if it matches the invalid token.
>
> In summary, Rocket.Chat's push notification system is a robust mechanism that intelligently routes notifications either directly to native APN/FCM services or through a custom gateway, with comprehensive error handling and token management to ensure reliable delivery and cleanup of invalid device tokens.

## Evaluation

A 34-question benchmark (`src/eval/utils/testcases.json`) covering locate, mechanism and
cross-cutting questions. Every run writes a report to `runs/` recording the routed sections, the
chains, the skeleton, which node bodies were read, and the request and token counts. Answers are
scored by hand.

As noted above, the baseline column is produced by DeepWiki's question-answering MCP endpoint
(`ask_question` on `mcp.deepwiki.com`, see `src/deepwiki/ask.ts`), not by its wiki or its code map.

| System | CORRECT | PARTIAL | INCORRECT |
|---|---|---|---|
| DeepWiki MCP (baseline) | 20 | 14 | 0 |
| This project, current architecture (`runs/2026-08-14-report-v38.en.md`) | 17 | 13 | 4 |
| This project, earlier graph-navigation architecture | 13 | 19 | 2 |

Supporting numbers: 216 unit tests, about 7,400 lines of tracked source and tests.

## Iteration and changes of direction

Eight phases counting from the proposal-phase prototype, each change traceable to the commit that
made the cut.

The work lives in two repositories: the proposal phase in
[echo-xiao/gsoc-rocket-chat](https://github.com/echo-xiao/gsoc-rocket-chat), and from 25 May in
[echo-xiao/Agentic.Code.Analyzer](https://github.com/echo-xiao/Agentic.Code.Analyzer), which holds
all 293 commits of the coding period. Neither repository has commits between 8 April and 25 May —
that is the GSoC community bonding period.

| When | Phase / change | Marker commit | Why |
|---|---|---|---|
| 25 Feb – 8 Apr | Origin: prototype repo | `feat: upgrade to MCP server architecture with AST caching and memory topology index` | Proposal-phase feasibility: AST skeletonisation with a dynamic retriever, then built into an MCP server |
| 25 May – 9 Jun | Baseline: graph-native analyzer plus an evaluation framework | `Add eval framework (layer0/1 baseline+tool eval)` | The 34-question benchmark and Claude-judged scoring start here; every later change of direction is decided against them |
| 29 Jun – 2 Jul | Retrieval becomes graph-aware, with a hand-authored architecture layer on top | `Graph-aware subsystem retrieval: expand + rank, not name-fuzzy`; `architecture layer: concept-routing + code-grounded semantic map` | Fuzzy name matching could not pick out a subsystem; routing needed a layer describing structure |
| 4 Jul | Hand-authored architecture layer → DeepWiki | `refactor(server): DeepWiki wiki tool replaces hand-authored architecture layer` | The hand-authored knowledge layer, finished on 2 Jul, was not maintainable |
| 8–9 Jul | Semantics added to the graph tools | walker-directed traversal, local embeddings (all-MiniLM → bge-small), RRF fusion into `rankCandidates` and `expandNeighborhood` | Purely lexical retrieval picked the wrong entries |
| 10–12 Jul | DeepWiki → self-generated wiki | `chore(wiki): remove DeepWiki fetch`, alongside the four-step `wiki:outline` / `write` / `diagram` / `verify` generator and a wiki site | The external wiki's coverage was incomplete and it did not track the repository |
| 5–6 Aug | Agent self-loop → skeleton-first | `refactor: strip superseded architecture for the skeleton-first pipeline` | Hop-by-hop navigation was imprecise and token-expensive; detailed below |
| 11–13 Aug | Name-keyed index → definition graph | `refactor: remove the name-keyed index` | Same-named symbols bled into each other, so edges could not be trusted |

**From graph navigation to skeletons.** The first architecture let a model navigate the graph one
hop at a time through MCP tools. The initial assumption was that answer quality was a *navigator
quality* problem — better navigation would produce better answers. The benchmark said otherwise:
13 CORRECT / 19 PARTIAL / 2 INCORRECT, with PARTIAL accounting for more than half the set, meaning
answers that touched the right area without landing on it. It was also expensive: every hop
resends context, so requests and tokens both grew with path length. The project therefore moved to
a skeleton-first strategy: traversal is handed to a deterministic algorithm that expands a whole
chain into a skeleton in one pass, and the model only makes the routing and chain-selection
calls.

## Current state and remaining work

The system runs end to end. `npm run prewarm` builds the index, `npm run ask` runs the benchmark
and writes a report, `npm run mcp` serves the pipeline as an MCP tool.

- **Repo-to-wiki is the main open problem.** Turning a repository into a wiki is hard, no public
  method describes how to do it well, and the products that manage it are closed. This project
  delivers the code map layer and leaves that problem open.
- **Seeding is the current dominant error source.** The chain is: the wiki classifies content,
  questions match onto sections, and sections map to core files. It leaks at two points — the
  sections do not necessarily cover everything, and a section that does cover the right topic does
  not necessarily carry the files that implement it.
- **Query-side semantics are an untested idea.** Embedding the query is an obvious next step, but
  looking at the historical data the discrimination may be too weak to help. This has not been
  measured, and should be before it is built.
- **One target repository.** The index and the outline are built for Rocket.Chat; pointing the
  system elsewhere means regenerating both, not passing a flag.

## Challenges and what I learned

**Measure before believing.** The most useful habit of the summer was refusing to accept a
component as working until it was measured. It repeatedly overturned my intuitions: one LLM call
looked indispensable and turned out to leave the final prompt completely unchanged, so it was
removed. Without a benchmark and a per-run report it would still be there, costing a third of the
request budget.

**Reversing a direction is cheaper than defending it.** Graph navigation was weeks of work, and
the evidence against it was unambiguous once I looked: poor scores and high token cost together.
Having a benchmark is what turned that from a matter of taste into a decision.

**Constraints improve designs.** The free-tier limit forced a fixed request budget, which forced
the question "what does this call actually change?" for every LLM call in the pipeline. That
question is what found the useless call above.

**A plausible answer is not a checkable one.** Answers that read beautifully cited files that did
not contain what they claimed. Reading bodies by line range, and handing those line ranges back
with the answer, both exist so a reader can check a claim rather than having to trust prose.

**The interesting structure hides in string dispatch.** The edges no parser resolves are precisely
the ones a newcomer most needs explained. Declaring them as six communication trunks and matching
by declaration rather than call-site text is what made cross-subsystem questions answerable at
all.
