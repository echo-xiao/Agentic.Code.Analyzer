# How does an incoming webhook get processed in Rocket.Chat?

## Gemini Answer



## Tool Calls (6 calls, 36,125 tokens)

**Step 1:** `search({"layer":"server","query":"IncomingWebhook"})` → 225 tokens
**Step 2:** `graph({"query":"executeIntegrationRest","direction":"down"})` → 1074 tokens
**Step 3:** `implement({"filename":"apps/meteor/app/integrations/server/api/api.ts","symbolName":"executeIntegrationRest"})` → 1172 tokens
**Step 4:** `graph({"query":"processWebhookMessage","direction":"down"})` → 900 tokens
**Step 5:** `implement({"filename":"apps/meteor/app/lib/server/functions/processWebhookMessage.ts","symbolName":"processWeb)` → 596 tokens
**Step 6:** `implement({"symbolName":"sendMessage","filename":"apps/meteor/app/lib/server/functions/sendMessage.ts"})` → 621 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 2/6 |
| Symbols hit | 3/3 |
| Tool calls | 6 |
| Total tokens | 36,125 |
| Pass | NO |
