# How do you use a database model to query data in Rocket.Chat?

## Gemini Answer

I was unable to find a definitive example of how database models are used to query data in Rocket.Chat. My initial search for "model.find" returned some promising results, but I was unable to successfully graph or get details on the `model` symbol in those contexts. Further attempts to locate `Mongo.Collection` or `new Mongo.Collection` did not yield a clear pattern of database model usage for querying.

## Tool Calls (8 calls, 14,240 tokens)

**Step 1:** `plan({"intent":"pattern","question":"How do you use a database model to query data in Rocket.Chat?"})` → 80 tokens
**Step 2:** `search({"query":"model.find"})` → 151 tokens
**Step 3:** `graph({"move":"expand","query":"model.find","depth":1,"file":"apps/meteor/app/settings/server/startup.ts"})` → 20 tokens
**Step 4:** `details({"filename":"apps/meteor/app/settings/server/startup.ts","symbolName":"model"})` → 55 tokens
**Step 5:** `details({"symbolName":"model","filename":"apps/meteor/app/settings/server/SettingsRegistry.ts"})` → 57 tokens
**Step 6:** `search({"query":"Mongo.Collection"})` → 182 tokens
**Step 7:** `search({"query":"new Mongo.Collection"})` → 27 tokens
**Step 8:** `details({"filename":"apps/meteor/app/file-upload/server/lib/FileUpload.ts","symbolName":"model"})` → 57 tokens

## Files Seen In Tool Results (7)

- `apps/meteor/app/file-upload/server/lib/FileUpload.ts`
- `apps/meteor/app/lib/server/functions/saveUserIdentity.ts`
- `apps/meteor/app/settings/server/startup.ts`
- `apps/meteor/app/settings/server/SettingsRegistry.ts`
- `apps/meteor/client/meteor/minimongo/MinimongoCollection.ts`
- `apps/meteor/definition/externals/meteor/oauth.d.ts`
- `apps/meteor/client/meteor/minimongo/LocalCollection.ts`
