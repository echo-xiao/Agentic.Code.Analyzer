# How does enterprise feature gating work in Rocket.Chat?

## Gemini Answer



## Tool Calls (8 calls, 27,250 tokens)

**Step 1:** `search({"query":"hasLicense"})` → 82 tokens
**Step 2:** `search({"query":"hasLicense","layer":"server"})` → 82 tokens
**Step 3:** `search({"layer":"server","query":"License"})` → 506 tokens
**Step 4:** `search({"query":"hasModule","layer":"server"})` → 143 tokens
**Step 5:** `graph({"query":"hasModule","direction":"down"})` → 514 tokens
**Step 6:** `graph({"direction":"up","query":"hasModule"})` → 442 tokens
**Step 7:** `implement({"filename":"apps/meteor/ee/app/license/server/license.internalService.ts","symbolName":"hasModule"})` → 82 tokens
**Step 8:** `implement({"symbolName":"hasModule","filename":"ee/packages/license/src/modules.ts"})` → 69 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 1/6 |
| Symbols hit | 4/5 |
| Tool calls | 8 |
| Total tokens | 27,250 |
| Pass | NO |
