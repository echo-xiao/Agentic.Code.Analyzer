# How does the Omnichannel queue process and close a livechat conversation?

## Gemini Answer



## Tool Calls (8 calls, 40,003 tokens)

**Step 1:** `search({"query":"omnichannel queue","layer":"server"})` → 225 tokens
**Step 2:** `graph({"query":"OmnichannelQueue","direction":"down"})` → 224 tokens
**Step 3:** `search({"query":"closeRoom","layer":"server"})` → 347 tokens
**Step 4:** `graph({"direction":"down","query":"closeRoom"})` → 1388 tokens
**Step 5:** `graph({"query":"closeRoom apps/meteor/app/livechat/server/lib/closeRoom.ts","direction":"down"})` → 24 tokens
**Step 6:** `implement({"symbolName":"closeRoom","filename":"apps/meteor/app/livechat/server/lib/closeRoom.ts"})` → 352 tokens
**Step 7:** `implement({"symbolName":"doCloseRoom","filename":"apps/meteor/app/livechat/server/lib/closeRoom.ts"})` → 892 tokens
**Step 8:** `implement({"filename":"apps/meteor/app/livechat/server/lib/closeRoom.ts","symbolName":"afterRoomClosed"})` → 612 tokens

## Metrics

| Metric | Value |
|--------|-------|
| Files hit | 2/6 |
| Symbols hit | 3/4 |
| Tool calls | 8 |
| Total tokens | 40,003 |
| Pass | NO |
