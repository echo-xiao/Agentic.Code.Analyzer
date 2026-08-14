# Rocket.Chat Code Analyzer

Answers questions about a large unfamiliar codebase — *how is a message sent*, *where is
permission checked*, *what breaks if I change this* — by walking a static call graph rather than
by retrieving text.

Target repository: [Rocket.Chat](https://github.com/RocketChat/Rocket.Chat) at `e75965c`
(7,484 source files, 70 workspace packages).

The design constraint is **three LLM calls per question, fixed**. There is no per-hop agent loop:
the model chooses where to look and what to say, and deterministic code does everything in
between. A 34-question benchmark therefore costs 100 requests and fits inside a free API tier.

---

## How it works

```
 question
    │
    ├─ 1. routing            LLM call 1   question + wiki outline -> relevant sections
    │
    ├─ 2. pools & seeds      code         section file lists -> lexical scoring -> seed symbols
    ├─ 3. chain building     code         each seed -> a call chain (downstream or upstream)
    ├─ 4. skeleton           code         graph traversal -> per-chain call skeleton
    ├─ 5. dedupe             code         drop chains that are duplicates or subsets of others
    │
    ├─ 6. selection          LLM call 2   which chains actually bear on the question
    │
    ├─ 7. reading            code         read each kept node's body by recorded line range
    │
    └─ 8. answer             LLM call 3   one shot over the skeleton text plus the read bodies
```

Steps 2–5 and 7 are pure functions over the graph. They produce the same output for the same
input, which is what makes a run diagnosable: when an answer is wrong, the report says which
stage lost the thread.

## The graph

Built offline by `src/indexer/`, one shard per workspace package, into `output.nosync/`
(regenerable, git-ignored).

```
70 shards · 7,484 files · 88,419 definitions · 70,150 edges
```

**Binding is resolved by the TypeScript type checker, never by name.** A definition is identified
as `<repo-relative file>#<qualified name>`, so two functions that share a name are two nodes. A
reference that resolves into `lib.*.d.ts` or `node_modules` produces no edge; a reference the
checker cannot resolve is recorded as unbound, counted, and dropped rather than guessed. This is
what stops `arr.map()` from binding to a project function named `map`.

Each package is compiled as its own ts-morph `Program` with workspace `paths` injected so that
`@rocket.chat/core-typings` resolves to that package's `src/`, not to a `dist/` that does not
exist. Without that injection cross-package references bind to nothing.

### Edge kinds

| kind | count | meaning |
|---|---:|---|
| `call` | 32,849 | a call expression, resolved to its declaration |
| `type` | 27,038 | type reference or heritage clause |
| `jsx` | 4,051 | JSX element to its component |
| `implements` | 2,507 | interface or abstract member to the class members implementing it |
| `registers` | 1,338 | a handler registered under a dispatch key |
| `new` | 1,020 | construction |
| `dispatches` | 842 | a call site that fires a dispatch key |
| `handles` | 505 | dispatch key to handler |

### Dynamic dispatch

Rocket.Chat routes most of its behaviour through string keys, which no type checker follows. Six
such channels are modelled explicitly. Each is matched by the **resolved declaration** of the
callee, never by call-site text, so a same-named method on an unrelated class is not a match.

| channel | keys | keys seen on both sides |
|---|---:|---:|
| REST routes | 624 | 322 |
| `api.call` RPC | 270 | 0 |
| Meteor methods | 193 | 35 |
| callbacks | 86 | 70 |
| service events | 72 | 63 |
| streamers | 16 | 10 |

A registration and a dispatch that share a key become two edges through a synthetic node, so a
chain can cross the gap. `dispatch-budget.json` records these counts as a ratchet: a build whose
numbers fall below the recorded baseline fails, which is how a broken idiom gets caught instead
of silently zeroing out a channel.

### Interfaces

Rocket.Chat reaches most core capability through `proxify<IAuthorization>('authorization')`, so a
correctly-resolved call lands on an interface method — which has no body and no outgoing edges.
Adding `implements` edges cut the interface methods that had incoming edges but no outgoing ones
from 634 to 96. Where a member has several implementations, every edge is emitted and carries
`implCount`; the renderer shows the fork rather than silently picking the first.

---

## Layout

```
src/indexer/     graph construction
  workspace.ts     discover packages, resolve dependencies
  defs.ts          definitions and their identity
  binding.ts       the one binding rule: checker, or unbound
  idioms.ts        the six dispatch channels
  overrides.ts     several implementations behind one key
  impl-edges.ts    interface member -> implementing member
  graph-build.ts   per-package shard
  dispatch.ts      dispatch nodes and their edges
  build-graph.ts   whole-repo build, self-check, budget ratchet

src/pipeline/    question answering
  routing.ts       LLM call 1
  entry.ts         pools, lexical scoring, seeds
  traverse.ts      graph traversal primitives
  skeleton-defs.ts chain skeleton construction
  candidates.ts    dedupe
  select.ts        LLM call 2
  reading.ts       body reading under a token budget
  answer.ts        LLM call 3
  report.ts        per-run report

src/deepwiki/    the architecture outline routing reads
src/eval/        the 34-question benchmark and its ground truth
logs/            reference answers used for manual scoring
```

## Running it

```bash
npm test                    # 205 unit tests
npx tsc --noEmit            # type check

npm run prewarm             # build the graph (needs ../Rocket.Chat or $ROCKET_CHAT_SRC)
npm run ask                 # run the 34-question benchmark -> runs/<date>-report-v<n>.md
npm run ask -- --filter=ldap --limit=1     # one question
```

`npm run ask` needs `GEMINI_API_KEY` in `.env`. Building the graph needs the target repository's
dependencies installed, because binding resolution reads them.

## Where it stands

Latest run: 34 questions, manually scored against reference answers.

```
correct 17 · partially correct 13 · incorrect 4
```

Two findings matter more than the score:

**The benchmark is noisy.** Re-running with identical code and an identical graph moved the chain
count or node count on 15 of 34 questions, while 10 questions produced byte-identical answers.
Both LLM-driven stages — routing and selection — vary between runs. Any single-run comparison is
therefore weak evidence; the run-to-run interval has not been measured yet, and should be before
the next change is judged.

**No failure is attributable to the graph.** Of the 17 questions that were not fully correct:

| where it broke | count |
|---|---:|
| the architecture outline does not cover that subsystem | 6 |
| the question's vocabulary does not match the code's (`2FA` vs `twoFactorRequired`) | 2 |
| selection discarded most of the material (25 chains kept 1) | 2 |
| the high-fan-in cutoff dropped the very function being asked about | 2 |
| routing chose the wrong section | 1 |
| the answer lives in config files, which are not indexed | 1 |
| materials were right, the answer was not organised | 1 |
| indexing, graph construction, or traversal | **0** |

The largest single cause is outline coverage, not code analysis. The high-fan-in cutoff is the
sharpest self-inflicted one: a node with more than 25 callers is treated as a utility and left
unexpanded, which is right for `trim` and wrong for `hasPermissionAsync` (225 callers) when the
question is about permissions.
