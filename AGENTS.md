# Rocket.Chat Codebase — Agent Constitution

## Answer Rules

1. **ALWAYS call at least one tool.** Never answer from memory alone — your training data has outdated file paths. Use tools to get real paths.
2. **Always include specific file paths** in your answer (e.g., `apps/meteor/app/lib/server/functions/sendMessage.ts`). Every key file in the chain must be listed with its role.
3. **Start from the entry point**, not the middle. For architecture questions, trace the full chain from the top-level entry to the final destination.
4. **List the call chain explicitly** in your answer: `Entry → Step 1 → Step 2 → ... → Final`.
5. **Follow the tool order: search → graph → implement.** You MUST call `search` or `graph` before `implement`. The system enforces this — `implement` will be rejected if you haven't searched first.

## Tools

Three tools only. All other file/shell tools are disabled.

| Tool | When to use | Cost |
|------|-------------|------|
| `search(query, layer?)` | Find entry point by symbol or keyword | Cheap (~200 tokens) |
| `graph(query, direction?, depth?, layer?, mode?, edgeTypes?)` | Traverse dependency edges from a known symbol | Cheap (~300 tokens) |
| `implement(symbolName, filename)` | Read source of a specific symbol. For classes: returns method signatures — use `implement("Class.method", file)` to read a specific method. | Expensive (1K-5K tokens) |

**Strategy: use `search` + `graph` to map the territory first (cheap), then `implement` only at 1-2 key points (expensive). `graph(down)` already shows what a function calls — you don't need `implement` just to see the call chain.**

---

## Navigation Rules

**Mandatory flow — follow this order every time:**
```
Step 1: search(entry_symbol)        → find files + symbols
Step 2: graph(symbol, "down")       → map the call chain (cheap, gives you the full picture)
Step 3: implement(symbol, file)     → read source ONLY at 1-2 key points
Step 4: STOP and write your answer  → include all file paths from steps 1-3
```

**Do NOT skip to implement.** `graph(down)` gives you the same call chain information for 1/10th the token cost. Use `implement` only when you need to see the actual logic inside a function.

**Pick direction:**
- `graph(down)` — what does X invoke? (trace a flow forward)
- `graph(up)` — what calls X? (find callers, assess impact)

**Pick layer to suppress noise:**
- Add `layer='client'` for UI questions
- Add `layer='server'` for backend questions
- Omit for cross-layer questions

**Edge types to filter when tracing specific patterns:**
- Event chains: `edgeTypes=['event_emit','event_listen']`
- Component tree: `edgeTypes=['jsx']`
- Full routing: `edgeTypes=['call','event_listen','pubsub_subscribe']`

---

## Question Type → Entry Strategy

| Type | Strategy |
|------|----------|
| Architecture / Call chain | `search(entry)` → `graph(down)` |
| Locate | `search(keyword)` → `graph(down)` → `implement` only if needed |
| Pattern | `search` existing instance → `graph(down)` → `implement` one example |
| Routing | `search(dispatcher)` → `graph(down, edgeTypes=[...])` |
| Impact | `search(target)` → `graph(up, mode="impact")` |

---

## Source Roots

| Root | Contents |
|------|----------|
| `apps/meteor/client/` | React UI, hooks, client-side flows |
| `apps/meteor/server/` | Server services, startup, lib |
| `apps/meteor/app/` | Meteor methods, REST API, legacy server code |
| `packages/` | Shared packages (models, core-services, ui-kit…) |
| `apps/meteor/ee/` and `ee/packages/` | Enterprise features |
