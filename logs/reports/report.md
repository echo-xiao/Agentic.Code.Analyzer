# report — per-question trace + gold check

7/15/2026, 1:08:20 AM | 34 testcases | deterministic (retrieval-trace × claude-truth × wiki-map)

## Gold-check summary (zero-API)
- **scope correct**: 17/34 (the answer file's page entered the entry scope; another 0 have answer files on no wiki page, marked —)
- **recall**: found **56%** of answer files on average · none-found 10/34
- **seed hits core**: seed-hit **3** · walk-caught 21 · never 10 — seed-hit = routing + seed both right; walk-caught = dredged up by the walk (scope/seed fell short)
- **Semantic** (agent answers vs claude gold, cached verdicts-latest.json): PASS 13 / PARTIAL 19 / FAIL 2
> "answer file" = the core of claude-truth.json (Claude's gold key files). The trace carries no gold itself; this section is the report-side trace × gold check, zero-API.

## tour-04-msg-client — How is a message sent on the client side in Rocket.Chat?  _[architecture]_

**Gold check**: scope ✓ correct · recall 2/5 answer files · first core hit at step 2 (seed fell short, walk caught it)

**Semantic**: ◐ PARTIAL — core step missing — The candidate correctly identifies sendMessage flow and ChatAPI but omits the critical React component chain (RoomBody → ComposerContainer → ComposerMessage → MessageBox → handleSendMessage) and the final DDP transport step (sdk.call('sendMessage')), which are central to how a message is actually sent on the client side.

**scope entry pages** (10 scored → 3 chosen)
- Message Composer & Input Toolbar `0.789`
- Message Actions, Reactions & Moderation `0.78`
- Room Views, Message List & Contextual Bars `0.78`

**per-page seeds**:
- `Message Composer & Input Toolbar`: → `ChatMessages` · 10 candidates — top lexical score among 21 candidate symbols in 12 files (0.895)
- `Message Actions, Reactions & Moderation`: → `pinMessage` · 10 candidates — top lexical score among 14 candidate symbols in 10 files (0.923)
- `Room Views, Message List & Contextual Bars`: → `isMessageNewDay` · 10 candidates — top lexical score among 22 candidate symbols in 14 files (0.866)

**walk** (3 seeds · 6 steps)
- **ChatMessages** · 0 steps · ⏹ exhausted
- **pinMessage** · 3 steps · ⏹ exhausted
    - R1 → `expand` · affinity top 0.868 (expand) vs 0.863 (down) / 0.805 (up)
        - ↳ reached 124 files · core hit 0
    - R2 → `expand` · affinity top 0.974 (expand) vs 0.94 (down) / 0.974 (up)
        - ↳ reached 3247 files · **core hit 2⭐**: `messageBox/MessageBox.tsx` `flows/sendMessage.ts`
    - R3 → `expand` · affinity top 0.835 (expand) vs 0.815 (down) / 0.823 (up)
        - ↳ reached 111 files · core hit 0
- **isMessageNewDay** · 3 steps · ⏹ exhausted
    - R1 → `expand` · affinity top 0.863 (expand) vs 0.429 (down) / 0.862 (up)
        - ↳ reached 11 files · core hit 0
    - R2 → `expand` · affinity top 0.962 (expand) vs 0.907 (down) / 0.962 (up)
        - ↳ reached 1027 files · **core hit 1⭐**: `flows/sendMessage.ts`
    - R3 → `expand` · affinity top 0.884 (expand) vs 0.828 (down) / 0.883 (up)
        - ↳ reached 485 files · **core hit 1⭐**: `messageBox/MessageBox.tsx`

**agent calls**: 8 calls ⛔budget full — plan:call-chain  →  search:"ChatMessages"·client  →  graph↓:ChatMessages  →  details:ChatMessages.ts  →  search:"ComposerAPI"·client  →  details:ChatAPI.ts  →  search:"sendMessage"·client  →  details:sendMessage.ts

## new-19-message-rendering — How is a message rendered from raw text to React components in Rocket.Chat?  _[architecture]_

**Gold check**: scope ✗ wrong · recall 2/3 answer files · first core hit at step 2 (seed fell short, walk caught it)

**Semantic**: ✓ PASS — The candidate correctly identifies the core pipeline: raw text → parse() → AST tokens → Markup component → block/inline React components (ParagraphBlock, HeadingBlock, SpoilerBlock, inline elements), which matches the gold answer's central mechanism. The entry point via normalizeThreadMessage is a valid (if narrow) entry-point variant, and the parse function attribution to gazzodown is slightly imprecise but the overall flow is correct and not misleading.

**scope entry pages** (10 scored → 3 chosen)
- Room Views, Message List & Contextual Bars `0.793`
- Account Profile & Client Startup `0.777`
- UI Contexts & React Providers `0.776`

**per-page seeds**:
- `Room Views, Message List & Contextual Bars`: → `isMessageNewDay` · 10 candidates — top lexical score among 22 candidate symbols in 14 files (0.866)
- `Account Profile & Client Startup`: → `RawUserData` · 10 candidates — top lexical score among 25 candidate symbols in 16 files (0.866)
- `UI Contexts & React Providers`: → `Context` · 10 candidates — top lexical score among 27 candidate symbols in 16 files (0.639)

**walk** (3 seeds · 7 steps)
- **isMessageNewDay** · 3 steps · ⏹ exhausted
    - R1 → `expand` · affinity top 0.863 (expand) vs 0.429 (down) / 0.862 (up)
        - ↳ reached 11 files · core hit 0
    - R2 → `expand` · affinity top 0.962 (expand) vs 0.908 (down) / 0.962 (up)
        - ↳ reached 1015 files · **core hit 1⭐**: `src/index.ts`
    - R3 → `expand` · affinity top 0.898 (expand) vs 0.855 (down) / 0.898 (up)
        - ↳ reached 486 files · **core hit 1⭐**: `src/Markup.tsx`
- **RawUserData** · 0 steps · ⏹ exhausted
- **Context** · 4 steps · ⏹ exhausted
    - R1 → `expand` · affinity top 0.463 (expand) vs 0 (down) / 0.463 (up)
        - ↳ reached 642 files · core hit 0
    - R2 → `expand` · affinity top 0.916 (expand) vs 0.916 (down) / 0 (up)
        - ↳ reached 410 files · **core hit 1⭐**: `src/index.ts`
    - R3 → `expand` · affinity top 0.926 (expand) vs 0.855 (down) / 0.902 (up)
        - ↳ reached 464 files · core hit 0
    - R4 → `expand` · affinity top 0.898 (expand) vs 0.873 (down) / 0.898 (up)
        - ↳ reached 289 files · **core hit 1⭐**: `src/Markup.tsx`

**agent calls**: 8 calls ⛔budget full — plan:architecture  →  search:"gazzodown"  →  graph↓:Markup  →  details:normalizeThreadMessage.tsx  →  search:"parse markdown"·packages  →  search:"filterMarkdown"  →  details:markdown.js ×2

## claude-01-push-notifications — How do push notifications work in Rocket.Chat?  _[architecture]_

**Gold check**: scope ✓ correct · recall 3/6 answer files · first core hit at step 1 (seed fell short, walk caught it)

**Semantic**: ◐ PARTIAL — core step missing — The candidate omits the critical upstream pipeline: afterSaveMessage → sendAllNotifications → shouldNotifyMobile/getPushData → queueNotification with delay-based scheduling and the background worker polling the queue. It starts the story mid-pipeline at PushNotification/PushClass, missing how notifications are triggered, evaluated per-user, and queued with scheduling delays — steps without which the central mechanism is incomplete.

**scope entry pages** (10 scored → 3 chosen)
- Push Notifications & Notification Queue `0.78`
- Registration, Setup Wizard & Password Policies `0.598`
- DDP Protocol, Realtime Streaming & Publications `0.579`

**per-page seeds**:
- `Push Notifications & Notification Queue`: → `NotificationPayload` · 10 candidates — top lexical score among 15 candidate symbols in 9 files (0.875)
- `Registration, Setup Wizard & Password Policies`: → `constructor` · 10 candidates — top lexical score among 23 candidate symbols in 13 files (0)
- `DDP Protocol, Realtime Streaming & Publications`: → `_session` · 10 candidates — top lexical score among 26 candidate symbols in 15 files (0)

**walk** (3 seeds · 3 steps)
- **NotificationPayload** · 0 steps · ⏹ exhausted
- **constructor** · 3 steps · ⏹ exhausted
    - R1 → `expand` · affinity top 0.871 (expand) vs 0.871 (down) / 0 (up)
        - ↳ reached 418 files · **core hit 2⭐**: `server/NotificationQueue.ts` `server/push.ts`
    - R2 → `expand` · affinity top 0.917 (expand) vs 0.693 (down) / 0.903 (up)
        - ↳ reached 541 files · **core hit 1⭐**: `lib/sendNotificationsOnMessage.ts`
    - R3 → `expand` · affinity top 0.846 (expand) vs 0.601 (down) / 0.502 (up)
        - ↳ reached 201 files · core hit 0
- **_session** · 0 steps · ⏹ exhausted

**agent calls**: 8 calls ⛔budget full — wiki  →  search:"PushClass"·server  →  search:"PushNotification"·server  →  graph:PushClass  →  details:push.ts  →  details:PushNotification.ts  →  graph↓:PushNotification.send  →  details:PushNotification.ts

## new-09-realtime-streamer — How does a new message appear in real-time on the client after being saved to the database?  _[architecture]_

**Gold check**: scope ✗ wrong · recall 5/5 answer files · first core hit at step 2 (seed fell short, walk caught it)

**Semantic**: ◐ PARTIAL — core step missing — The candidate correctly identifies notifyOnMessageChange and api.broadcast('watch.messages') but misses the critical intermediate layer — the ListenersModule that catches the broadcast and routes it through the Streamer (streamRoomMessage) to clients via DDP — which is the central mechanism connecting server broadcast to client delivery.

**scope entry pages** (10 scored → 3 chosen)
- Data Import, Export & Database Migrations `0.771`
- Room Views, Message List & Contextual Bars `0.767`
- Message Composer & Input Toolbar `0.756`

**per-page seeds**:
- `Data Import, Export & Database Migrations`: → `MessageData` · 10 candidates — top lexical score among 41 candidate symbols in 22 files (0.908)
- `Room Views, Message List & Contextual Bars`: → `isMessageNewDay` · 10 candidates — top lexical score among 22 candidate symbols in 14 files (0.866)
- `Message Composer & Input Toolbar`: → `ChatMessages` · 10 candidates — top lexical score among 21 candidate symbols in 12 files (0.895)

**walk** (3 seeds · 3 steps)
- **MessageData** · 0 steps · ⏹ exhausted
- **isMessageNewDay** · 3 steps · ⏹ exhausted
    - R1 → `expand` · affinity top 0.863 (expand) vs 0.429 (down) / 0.862 (up)
        - ↳ reached 11 files · core hit 0
    - R2 → `expand` · affinity top 0.962 (expand) vs 0.907 (down) / 0.962 (up)
        - ↳ reached 1027 files · **core hit 5⭐**: `lib/notifyListener.ts` `listeners/listeners.module.ts` `notifications/notifications.module.ts` `streamer/streamer.module.ts` `streamer/streamer.ts`
    - R3 → `expand` · affinity top 0.89 (expand) vs 0.835 (down) / 0.89 (up)
        - ↳ reached 483 files · core hit 0
- **ChatMessages** · 0 steps · ⏹ exhausted

**agent calls**: 8 calls ⛔budget full — plan:?  →  search:"afterSaveMessage"·server  →  graph↓:afterSaveMessage  →  details:notifyListener.ts  →  search:"watch.messages"·client  →  details:incomingMessages.ts ×2  →  search:"api.onStream"·client

## tour-05-msg-server — How is a message sent on the server side in Rocket.Chat?  _[call-chain]_

**Gold check**: scope ✗ wrong · recall 3/3 answer files · first core hit at step 2 (seed fell short, walk caught it)

**Semantic**: ◐ PARTIAL — core step missing — The candidate correctly describes the core sendMessage pipeline (validate, prepare, Apps Engine hooks, persist, afterSave) but omits the DDP entry point (Meteor method executeSendMessage) and permission validation (canSendMessageAsync/validateRoomMessagePermissionsAsync), which are essential steps that gate whether sendMessage is ever called.

**scope entry pages** (10 scored → 3 chosen)
- Message Composer & Input Toolbar `0.789`
- Message Actions, Reactions & Moderation `0.78`
- Room Views, Message List & Contextual Bars `0.78`

**per-page seeds**:
- `Message Composer & Input Toolbar`: → `ChatMessages` · 10 candidates — top lexical score among 21 candidate symbols in 12 files (0.895)
- `Message Actions, Reactions & Moderation`: → `pinMessage` · 10 candidates — top lexical score among 14 candidate symbols in 10 files (0.923)
- `Room Views, Message List & Contextual Bars`: → `isMessageNewDay` · 10 candidates — top lexical score among 22 candidate symbols in 14 files (0.866)

**walk** (3 seeds · 6 steps)
- **ChatMessages** · 0 steps · ⏹ exhausted
- **pinMessage** · 3 steps · ⏹ exhausted
    - R1 → `expand` · affinity top 0.868 (expand) vs 0.863 (down) / 0.805 (up)
        - ↳ reached 124 files · core hit 0
    - R2 → `expand` · affinity top 0.974 (expand) vs 0.94 (down) / 0.974 (up)
        - ↳ reached 3247 files · **core hit 3⭐**: `methods/sendMessage.ts` `functions/sendMessage.ts` `functions/canSendMessage.ts`
    - R3 → `expand` · affinity top 0.835 (expand) vs 0.815 (down) / 0.823 (up)
        - ↳ reached 111 files · core hit 0
- **isMessageNewDay** · 3 steps · ⏹ exhausted
    - R1 → `expand` · affinity top 0.863 (expand) vs 0.429 (down) / 0.862 (up)
        - ↳ reached 11 files · core hit 0
    - R2 → `expand` · affinity top 0.962 (expand) vs 0.907 (down) / 0.962 (up)
        - ↳ reached 1027 files · **core hit 2⭐**: `methods/sendMessage.ts` `functions/sendMessage.ts`
    - R3 → `expand` · affinity top 0.884 (expand) vs 0.828 (down) / 0.883 (up)
        - ↳ reached 485 files · core hit 0

**agent calls**: 8 calls ⛔budget full — plan:call-chain  →  search:"sendMessage"·server  →  graph↓:sendMessage  →  details:sendMessage.ts  →  search:"Message.beforeSave"·server  →  search:"Message"·server  →  details:Message.ts  →  search:"beforeSave"·server

## claude-05-call-chain — What is the complete call chain for sendMessage?  _[call-chain]_

**Gold check**: scope ✓ correct · recall 5/5 answer files · first core hit at step 2 (seed fell short, walk caught it)

**Semantic**: ◐ PARTIAL — core step missing — The candidate omits the critical server-side entry points (the Meteor method in methods/sendMessage.ts calling executeSendMessage, and the REST API path in v1/chat.ts) and the permission validation step (canSendMessageAsync/validateRoomMessagePermissionsAsync) — both of which are essential steps in the central mechanism without which the pipeline does not work. The candidate jumps directly to the core sendMessage function, skipping the dispatch and authorization layers entirely.

**scope entry pages** (10 scored → 3 chosen)
- Message Composer & Input Toolbar `0.777`
- Room Views, Message List & Contextual Bars `0.776`
- Message Actions, Reactions & Moderation `0.768`

**per-page seeds**:
- `Message Composer & Input Toolbar`: → `ChatMessages` · 10 candidates — top lexical score among 21 candidate symbols in 12 files (0.895)
- `Room Views, Message List & Contextual Bars`: → `isMessageNewDay` · 10 candidates — top lexical score among 22 candidate symbols in 14 files (0.866)
- `Message Actions, Reactions & Moderation`: → `pinMessage` · 10 candidates — top lexical score among 14 candidate symbols in 10 files (0.923)

**walk** (3 seeds · 6 steps)
- **ChatMessages** · 0 steps · ⏹ exhausted
- **isMessageNewDay** · 3 steps · ⏹ exhausted
    - R1 → `expand` · affinity top 0.863 (expand) vs 0.429 (down) / 0.862 (up)
        - ↳ reached 11 files · core hit 0
    - R2 → `expand` · affinity top 0.962 (expand) vs 0.908 (down) / 0.962 (up)
        - ↳ reached 1027 files · **core hit 4⭐**: `flows/sendMessage.ts` `methods/sendMessage.ts` `functions/sendMessage.ts` `lib/afterSaveMessage.ts`
    - R3 → `expand` · affinity top 0.954 (expand) vs 0.894 (down) / 0.954 (up)
        - ↳ reached 485 files · core hit 0
- **pinMessage** · 3 steps · ⏹ exhausted
    - R1 → `expand` · affinity top 0.897 (expand) vs 0.893 (down) / 0.805 (up)
        - ↳ reached 124 files · core hit 0
    - R2 → `expand` · affinity top 0.986 (expand) vs 0.963 (down) / 0.986 (up)
        - ↳ reached 3247 files · **core hit 5⭐**: `flows/sendMessage.ts` `methods/sendMessage.ts` `functions/sendMessage.ts` `functions/canSendMessage.ts` `lib/afterSaveMessage.ts`
    - R3 → `expand` · affinity top 0.874 (expand) vs 0.851 (down) / 0.847 (up)
        - ↳ reached 111 files · core hit 0

**agent calls**: 8 calls ⛔budget full — plan:call-chain  →  search:"sendMessage"  →  graph↓:sendMessage ×2  →  details:sendMessage.ts ×4

## new-24-autotranslate — How does the auto-translate feature work for messages in Rocket.Chat?  _[locate]_

**Gold check**: scope ✓ correct · recall 4/4 answer files · **seed hits core⭐**

**Semantic**: ◐ PARTIAL — core step missing — The candidate correctly describes the AutoTranslate base class, provider implementations, tokenization/detokenization, and client-side display, but omits the critical integration point: TranslationProviderRegistry and the afterSaveMessage callback hook that actually triggers translation automatically for every saved message. Without this, the core mechanism of how auto-translation is wired into the message pipeline is missing.

**scope entry pages** (10 scored → 3 chosen)
- Integrations, Webhooks & Slash Commands `0.741`
- Email, Mailer & IMAP Inbox `0.709`
- Omnichannel Live Chat UI `0.603`

**per-page seeds**:
- `Integrations, Webhooks & Slash Commands`: → `MsAutoTranslate` · 10 candidates — top lexical score among 21 candidate symbols in 11 files (0.884)
- `Email, Mailer & IMAP Inbox`: → `EmailInbox_Outgoing` · 10 candidates — top lexical score among 19 candidate symbols in 12 files (0.29)
- `Omnichannel Live Chat UI`: → `MessageForm` · 10 candidates — top lexical score among 29 candidate symbols in 16 files (0.908)

**walk** (3 seeds · 3 steps)
- **MsAutoTranslate** · 0 steps · ⏹ exhausted
- **EmailInbox_Outgoing** · 3 steps · ⏹ exhausted
    - R1 → `expand` · affinity top 0.849 (expand) vs 0.849 (down) / 0 (up)
        - ↳ reached 82 files · core hit 0
    - R2 → `expand` · affinity top 0.919 (expand) vs 0.871 (down) / 0.919 (up)
        - ↳ reached 352 files · core hit 0
    - R3 → `expand` · affinity top 0.912 (expand) vs 0.886 (down) / 0.905 (up)
        - ↳ reached 963 files · **core hit 4⭐**: `server/autotranslate.ts` `server/googleTranslate.ts` `server/msTranslate.ts` `server/deeplTranslate.ts`
- **MessageForm** · 0 steps · ⏹ exhausted

**agent calls**: 6 calls — plan:architecture  →  search:"AutoTranslate"·server  →  graph:AutoTranslate  →  details:autotranslate.ts  →  details:msTranslate.ts  →  details:useAutoTranslate.ts

## new-15-impact-aftersave — What would be impacted if the afterSaveMessage callback system were changed?  _[impact]_

**Gold check**: scope ✗ wrong · recall 5/5 answer files · first core hit at step 2 (seed fell short, walk caught it)

**Semantic**: ✓ PASS — The candidate correctly identifies the core mechanism (afterSaveMessage in the right file, called from sendMessage/updateMessage, with callbacks for notifications, auto-translation, mentions, threads, read receipts, federation, etc.) and accurately describes the blast radius across integrations and enterprise features, matching the gold answer's essential content.

**scope entry pages** (10 scored → 3 chosen)
- Message Actions, Reactions & Moderation `0.78`
- Room Coordinator, Publications & Callbacks `0.773`
- Message Types, Threads & System Messages `0.768`

**per-page seeds**:
- `Message Actions, Reactions & Moderation`: → `pinMessage` · 10 candidates — top lexical score among 14 candidate symbols in 10 files (0.923)
- `Room Coordinator, Publications & Callbacks`: → `Callback` · 10 candidates — top lexical score among 22 candidate symbols in 12 files (1)
- `Message Types, Threads & System Messages`: → `MessagesRaw` · 10 candidates — top lexical score among 17 candidate symbols in 12 files (0.908)

**walk** (3 seeds · 11 steps)
- **pinMessage** · 3 steps · ⏹ exhausted
    - R1 → `expand` · affinity top 0.874 (expand) vs 0.869 (down) / 0.805 (up)
        - ↳ reached 124 files · core hit 0
    - R2 → `expand` · affinity top 1 (expand) vs 0.948 (down) / 1 (up)
        - ↳ reached 3247 files · **core hit 5⭐**: `lib/afterSaveMessage.ts` `functions/sendMessage.ts` `functions/updateMessage.ts` `lib/sendNotificationsOnMessage.ts` `server/autotranslate.ts`
    - R3 → `expand` · affinity top 0.86 (expand) vs 0.856 (down) / 0.823 (up)
        - ↳ reached 111 files · core hit 0
- **Callback** · 8 steps · ⏹ budget
    - R1 → `expand` · affinity top 0.706 (expand) vs 0 (down) / 0.706 (up)
        - ↳ reached 14 files · core hit 0
    - R2 → `expand` · affinity top 0.807 (expand) vs 0.807 (down) / 0 (up)
        - ↳ reached 31 files · core hit 0
    - R3 → `expand` · affinity top 0.806 (expand) vs 0.663 (down) / 0.805 (up)
        - ↳ reached 847 files · **core hit 1⭐**: `server/autotranslate.ts`
    - R4 → `expand` · affinity top 0.966 (expand) vs 0.966 (down) / 0.857 (up)
        - ↳ reached 573 files · **core hit 3⭐**: `lib/afterSaveMessage.ts` `functions/sendMessage.ts` `functions/updateMessage.ts`
    - R5 → `expand` · affinity top 0.889 (expand) vs 0.59 (down) / 0.889 (up)
        - ↳ reached 213 files · core hit 0
    - R6 → `expand` · affinity top 0.863 (expand) vs 0.853 (down) / 0.286 (up)
        - ↳ reached 14 files · core hit 0
    - R7 → `expand` · affinity top 0.826 (expand) vs 0.353 (down) / 0.77 (up)
        - ↳ reached 9 files · core hit 0
    - R8 → `expand` · affinity top 0.863 (expand) vs 0.863 (down) / 0.816 (up)
        - ↳ reached 4 files · core hit 0
- **MessagesRaw** · 0 steps · ⏹ exhausted

**agent calls**: 3 calls — plan:impact  →  search:"afterSaveMessage"  →  graph↑:afterSaveMessage

## new-16-impact-streamer — What is the blast radius of changing the Streamer module in Rocket.Chat?  _[impact]_

**Gold check**: scope ✓ correct · recall 3/3 answer files · first core hit at step 3 (seed fell short, walk caught it)

**Semantic**: ◐ PARTIAL — wrong central function — The candidate focuses on 'ee/apps/ddp-streamer/src/Streamer.ts' rather than the core 'apps/meteor/server/modules/streamer/streamer.module.ts' Streamer abstract base class, and misses the central NotificationsModule with its 17 stream instances and the ListenersModule event bridge — the two components that define the actual blast radius of the Streamer module.

**scope entry pages** (10 scored → 3 chosen)
- DDP Protocol, Realtime Streaming & Publications `0.734`
- OAuth, SAML, CAS & Social SSO Providers `0.471`
- Data Import, Export & Database Migrations `0.464`

**per-page seeds**:
- `DDP Protocol, Realtime Streaming & Publications`: → `Streamer` · 10 candidates — top lexical score among 26 candidate symbols in 15 files (1)
- `OAuth, SAML, CAS & Social SSO Providers`: → `addOAuthApp` · 10 candidates — top lexical score among 23 candidate symbols in 16 files (0)
- `Data Import, Export & Database Migrations`: → `add` · 10 candidates — top lexical score among 41 candidate symbols in 22 files (0)

**walk** (3 seeds · 4 steps)
- **Streamer** · 1 steps · ⏹ exhausted
    - R1 → `expand` · affinity top 0.67 (expand) vs 0.607 (down) / 0.308 (up)
        - ↳ reached 14 files · core hit 0
- **addOAuthApp** · 0 steps · ⏹ decayed
- **add** · 3 steps · ⏹ decayed
    - R1 → `expand` · affinity top 0.463 (expand) vs 0.463 (down) / 0 (up)
        - ↳ reached 169 files · core hit 0
    - R2 → `expand` · affinity top 0.778 (expand) vs 0.579 (down) / 0.583 (up)
        - ↳ reached 712 files · **core hit 3⭐**: `streamer/streamer.module.ts` `notifications/notifications.module.ts` `listeners/listeners.module.ts`
    - R3 → `expand` · affinity top 0.883 (expand) vs 0.883 (down) / 0 (up)
        - ↳ reached 296 files · core hit 0

**agent calls**: 3 calls — plan:impact  →  search:"Streamer"  →  graph↑:Streamer

## claude-08-federation — How are federation messages sent across different servers in Rocket.Chat?  _[routing]_

**Gold check**: scope ✓ correct · recall 4/4 answer files · first core hit at step 1 (seed fell short, walk caught it)

**Semantic**: ◐ PARTIAL — core step missing — The candidate only covers the inbound path (remote server sending to Rocket.Chat) and omits the outbound path entirely — FederationMatrix.sendMessage(), toExternalMessageFormat(), FederationActions hooks, and how a local user's message gets forwarded to a remote homeserver — which is the other half of the core mechanism.

**scope entry pages** (10 scored → 3 chosen)
- Matrix Federation & Cross-Server Messaging `0.538`
- Message Actions, Reactions & Moderation `0.504`
- Apps Server Integration & Bridges `0.502`

**per-page seeds**:
- `Matrix Federation & Cross-Server Messaging`: → `federation` · 10 candidates — top lexical score among 12 candidate symbols in 7 files (1)
- `Message Actions, Reactions & Moderation`: → `pinMessage` · 10 candidates — top lexical score among 14 candidate symbols in 10 files (0.923)
- `Apps Server Integration & Bridges`: → `convertMessageFiles` · 10 candidates — top lexical score among 16 candidate symbols in 9 files (0.84)

**walk** (3 seeds · 6 steps)
- **federation** · 3 steps · ⏹ exhausted
    - R1 → `expand` · affinity top 0.56 (expand) vs 0.56 (down) / 0.227 (up)
        - ↳ reached 37 files · **core hit 1⭐**: `src/FederationMatrix.ts`
    - R2 → `expand` · affinity top 0.962 (expand) vs 0.784 (down) / 0.962 (up)
        - ↳ reached 1883 files · **core hit 2⭐**: `_matrix/transactions.ts` `events/message.ts`
    - R3 → `expand` · affinity top 0.901 (expand) vs 0.855 (down) / 0.901 (up)
        - ↳ reached 287 files · **core hit 1⭐**: `helpers/message.parsers.ts`
- **pinMessage** · 3 steps · ⏹ exhausted
    - R1 → `expand` · affinity top 0.868 (expand) vs 0.863 (down) / 0.805 (up)
        - ↳ reached 124 files · core hit 0
    - R2 → `expand` · affinity top 0.986 (expand) vs 0.94 (down) / 0.986 (up)
        - ↳ reached 3247 files · **core hit 4⭐**: `src/FederationMatrix.ts` `_matrix/transactions.ts` `events/message.ts` `helpers/message.parsers.ts`
    - R3 → `expand` · affinity top 0.837 (expand) vs 0.832 (down) / 0.823 (up)
        - ↳ reached 111 files · core hit 0
- **convertMessageFiles** · 0 steps · ⏹ exhausted

**agent calls**: 8 calls ⛔budget full — plan:architecture  →  search:"startFederationService"·server  →  graph↓:startFederationService  →  details:federation.ts  →  search:"getFederationRoutes"  →  details:routes.ts  →  search:"getMatrixTransactionsRoutes"  →  details:transactions.ts

## new-18-webhook — How does an incoming webhook get processed in Rocket.Chat?  _[routing]_

**Gold check**: scope ✓ correct · recall 0/4 answer files · ✗ core never hit

**Semantic**: ✓ PASS — The candidate correctly identifies the core mechanism: executeIntegrationRest as the entry point, script engine execution via processIncomingRequest, and processWebhookMessage for message delivery, matching the gold answer's central pipeline.

**scope entry pages** (10 scored → 3 chosen)
- Omnichannel Live Chat UI `0.445`
- Integrations, Webhooks & Slash Commands `0.386`
- Email, Mailer & IMAP Inbox `0.356`

**per-page seeds**:
- `Omnichannel Live Chat UI`: → `WebhooksPage` · 10 candidates — top lexical score among 29 candidate symbols in 16 files (0.895)
- `Integrations, Webhooks & Slash Commands`: → `incomingLogger` · 10 candidates — top lexical score among 21 candidate symbols in 11 files (0.884)
- `Email, Mailer & IMAP Inbox`: → `api` · 10 candidates — top lexical score among 19 candidate symbols in 12 files (0)

**walk** (3 seeds · 0 steps)
- **WebhooksPage** · 0 steps · ⏹ exhausted
- **incomingLogger** · 0 steps · ⏹ exhausted
- **api** · 0 steps · ⏹ decayed

**agent calls**: 8 calls ⛔budget full — plan:call-chain  →  search:"incoming webhook"·server  →  graph↓:api  →  search:"IntegrationScriptEngine"·server  →  graph↑:IntegrationScriptEngine  →  details:api.ts  →  search:"processWebhookMessage"·server  →  details:processWebhookMessage.ts

## claude-07-api-endpoints — How are new endpoints registered in the REST API in Rocket.Chat?  _[locate]_

**Gold check**: scope ✗ wrong · recall 1/6 answer files · first core hit at step 1 (seed fell short, walk caught it)

**Semantic**: ✓ PASS — The candidate correctly identifies the core mechanism: APIClass, createApi, the API singleton with v1/default instances, and addRoute() as the primary registration method, with correct file paths and examples — the omission of middleware chain details and Hono router internals is peripheral.

**scope entry pages** (10 scored → 3 chosen)
- Microservice Network & Authorization Service `0.543`
- Registration, Setup Wizard & Password Policies `0.519`
- Audit Log & Compliance UI `0.482`

**per-page seeds**:
- `Microservice Network & Authorization Service`: → `AuthEndpoints` · 10 candidates — top lexical score among 11 candidate symbols in 8 files (0.895)
- `Registration, Setup Wizard & Password Policies`: → `constructor` · 10 candidates — top lexical score among 23 candidate symbols in 13 files (0)
- `Audit Log & Compliance UI`: → `AppInfoField` · 10 candidates — top lexical score among 18 candidate symbols in 9 files (0)

**walk** (3 seeds · 4 steps)
- **AuthEndpoints** · 0 steps · ⏹ exhausted
- **constructor** · 1 steps · ⏹ decayed
    - R1 → `expand` · affinity top 0.848 (expand) vs 0.848 (down) / 0 (up)
        - ↳ reached 418 files · **core hit 1⭐**: `server/router.ts`
- **AppInfoField** · 3 steps · ⏹ decayed
    - R1 → `expand` · affinity top 0.498 (expand) vs 0.41 (down) / 0.428 (up)
        - ↳ reached 155 files · core hit 0
    - R2 → `expand` · affinity top 0.533 (expand) vs 0.533 (down) / 0 (up)
        - ↳ reached 167 files · core hit 0
    - R3 → `expand` · affinity top 0.392 (expand) vs 0.392 (down) / 0.282 (up)
        - ↳ reached 145 files · core hit 0

**agent calls**: 8 calls ⛔budget full — plan:architecture  →  search:"APIClass"  →  details:ApiClass.ts  →  graph↑:APIClass  →  details:api.ts ×2  →  search:"API.v1.addRoute"·server  →  details:channels.ts

## new-25-search — How does message search work in Rocket.Chat?  _[locate]_

**Gold check**: scope ✓ correct · recall 4/4 answer files · **seed hits core⭐**

**Semantic**: ◐ PARTIAL — core step missing — The candidate correctly describes the messageSearch method and MongoDB query layer but entirely misses the pluggable SearchProviderService/SearchProvider/DefaultProvider architecture that is the core mechanism of message search in Rocket.Chat — the abstraction layer that coordinates providers, the DefaultProvider that delegates to messageSearch, and the extensibility for external engines like Elasticsearch.

**scope entry pages** (10 scored → 3 chosen)
- Full-Text Search Service `0.763`
- Room Coordinator, Publications & Callbacks `0.738`
- WebDAV, Nextcloud & Smarsh Connector `0.654`

**per-page seeds**:
- `Full-Text Search Service`: → `messageSearch` · 10 candidates — top lexical score among 10 candidate symbols in 6 files (0.884)
- `Room Coordinator, Publications & Callbacks`: → `add` · 10 candidates — top lexical score among 22 candidate symbols in 12 files (0)
- `WebDAV, Nextcloud & Smarsh Connector`: → `_client` · 10 candidates — top lexical score among 14 candidate symbols in 9 files (0)

**walk** (3 seeds · 9 steps)
- **messageSearch** · 4 steps · ⏹ exhausted
    - R1 → `up` · affinity top 0.872 (up) vs 0.838 (expand) / 0.789 (down)
        - ↳ reached 10 files · **core hit 2⭐**: `model/SearchProvider.ts` `provider/DefaultProvider.ts`
    - R2 → `expand` · affinity top 0.908 (expand) vs 0.899 (down) / 0.894 (up)
        - ↳ reached 207 files · core hit 0
    - R3 → `expand` · affinity top 0.93 (expand) vs 0.871 (down) / 0.93 (up)
        - ↳ reached 984 files · core hit 0
    - R4 → `expand` · affinity top 0.895 (expand) vs 0.889 (down) / 0.857 (up)
        - ↳ reached 490 files · **core hit 1⭐**: `service/SearchProviderService.ts`
- **add** · 5 steps · ⏹ exhausted
    - R1 → `expand` · affinity top 0.788 (expand) vs 0.788 (down) / 0 (up)
        - ↳ reached 169 files · core hit 0
    - R2 → `expand` · affinity top 0.643 (expand) vs 0.643 (down) / 0.079 (up)
        - ↳ reached 40 files · core hit 0
    - R3 → `expand` · affinity top 0.954 (expand) vs 0.863 (down) / 0.954 (up)
        - ↳ reached 3275 files · **core hit 3⭐**: `service/SearchProviderService.ts` `model/SearchProvider.ts` `provider/DefaultProvider.ts`
    - R4 → `expand` · affinity top 0.887 (expand) vs 0.862 (down) / 0.887 (up)
        - ↳ reached 211 files · core hit 0
    - R5 → `expand` · affinity top 0.493 (expand) vs 0.444 (down) / 0.183 (up)
        - ↳ reached 16 files · core hit 0
- **_client** · 0 steps · ⏹ exhausted

**agent calls**: 7 calls — plan:architecture  →  search:"messageSearch"  →  graph↓:messageSearch  →  details:messageSearch.ts  →  details:parseMessageSearchQuery.ts  →  search:"MessageSearchQueryParser"  →  details:parseMessageSearchQuery.ts

## new-27-video-conference — How does the video conference system work in Rocket.Chat?  _[locate]_

**Gold check**: scope ✓ correct · recall 0/6 answer files · ✗ core never hit

**Semantic**: ◐ PARTIAL — core step missing — The candidate describes only the client-side URL-opening flow (ConferencePage, useVideoConfOpenCall) and completely omits the core server-side mechanism: VideoConfService, conference creation/type routing, provider integration via Apps Engine, participant management, and call status tracking — without which the central mechanism does not work.

**scope entry pages** (10 scored → 3 chosen)
- Video Conferencing Service & UI `0.801`
- Invite Links, Conference Pages & Error Pages `0.779`
- Message Types, Threads & System Messages `0.643`

**per-page seeds**:
- `Video Conferencing Service & UI`: → `ConferencePage` · 10 candidates — top lexical score among 16 candidate symbols in 10 files (0.908)
- `Invite Links, Conference Pages & Error Pages`: → `ConferencePage` · 5 candidates — top lexical score among 5 candidate symbols in 4 files (0.908)
- `Message Types, Threads & System Messages`: → `videoconf` · 10 candidates — top lexical score among 17 candidate symbols in 12 files (0.908)

**walk** (2 seeds · 0 steps)
- **ConferencePage** · 0 steps · ⏹ exhausted
- **videoconf** · 0 steps · ⏹ exhausted

**agent calls**: 6 calls — plan:architecture  →  search:"ConferencePage"  →  graph:ConferencePage  →  details:ConferencePage.tsx  →  details:useVideoConfOpenCall.tsx ×2

## tour-06-endpoint — How do you create a new REST API endpoint in Rocket.Chat?  _[pattern]_

**Gold check**: scope ✗ wrong · recall 5/5 answer files · first core hit at step 1 (seed fell short, walk caught it)

**Semantic**: ✓ PASS — The candidate correctly identifies the core mechanism: using API.v1/API.default instances from api.ts, calling addRoute() on an APIClass instance with path/options/handlers, and the key handler context methods (this.success, this.bodyParams, etc.). Minor omissions like the internal middleware chain details and index.ts bootstrap are peripheral.

**scope entry pages** (10 scored → 3 chosen)
- Room Views, Message List & Contextual Bars `0.733`
- Engagement, NPS Surveys & Version Checks `0.604`
- Microservice Network & Authorization Service `0.543`

**per-page seeds**:
- `Room Views, Message List & Contextual Bars`: → `createDataAPI` · 10 candidates — top lexical score among 22 candidate symbols in 14 files (0.875)
- `Engagement, NPS Surveys & Version Checks`: → `getNewUpdates` · 10 candidates — top lexical score among 23 candidate symbols in 13 files (0.851)
- `Microservice Network & Authorization Service`: → `AuthEndpoints` · 10 candidates — top lexical score among 11 candidate symbols in 8 files (0.895)

**walk** (3 seeds · 11 steps)
- **createDataAPI** · 6 steps · ⏹ exhausted
    - R1 → `up` · affinity top 0.745 (up) vs 0.497 (expand) / 0.405 (down)
        - ↳ reached 632 files · **core hit 1⭐**: `server/ApiClass.ts`
    - R2 → `expand` · affinity top 0.929 (expand) vs 0.929 (down) / 0 (up)
        - ↳ reached 417 files · **core hit 1⭐**: `server/router.ts`
    - R3 → `expand` · affinity top 0.904 (expand) vs 0.887 (down) / 0.888 (up)
        - ↳ reached 125 files · core hit 0
    - R4 → `expand` · affinity top 0.896 (expand) vs 0.874 (down) / 0.878 (up)
        - ↳ reached 190 files · **core hit 1⭐**: `server/api.ts`
    - R5 → `expand` · affinity top 0.849 (expand) vs 0.739 (down) / 0.403 (up)
        - ↳ reached 99 files · core hit 0
    - R6 → `expand` · affinity top 0.403 (expand) vs 0.25 (down) / 0.403 (up)
        - ↳ reached 40 files · core hit 0
- **getNewUpdates** · 5 steps · ⏹ exhausted
    - R1 → `expand` · affinity top 0.333 (expand) vs 0.331 (down) / 0.228 (up)
        - ↳ reached 31 files · core hit 0
    - R2 → `expand` · affinity top 0.93 (expand) vs 0.254 (down) / 0.93 (up)
        - ↳ reached 1164 files · **core hit 4⭐**: `server/api.ts` `server/ApiClass.ts` `middlewares/authenticationHono.ts` `middlewares/permissions.ts`
    - R3 → `expand` · affinity top 0.899 (expand) vs 0.874 (down) / 0.884 (up)
        - ↳ reached 145 files · core hit 0
    - R4 → `expand` · affinity top 0.393 (expand) vs 0.393 (down) / 0 (up)
        - ↳ reached 34 files · core hit 0
    - R5 → `expand` · affinity top 0.893 (expand) vs 0.17 (down) / 0.893 (up)
        - ↳ reached 142 files · core hit 0
- **AuthEndpoints** · 0 steps · ⏹ exhausted

**agent calls**: 8 calls ⛔budget full — plan:architecture  →  search:"ApiClass"·server  →  graph:ApiClass  →  details:ApiClass.ts  →  details:api.ts  →  search:"new APIClass"·server  →  details:api.ts ×2

## new-17-slash-commands — How do slash commands work in Rocket.Chat — from registration to execution?  _[pattern]_

**Gold check**: scope ✗ wrong · recall 2/2 answer files · first core hit at step 1 (seed fell short, walk caught it)

**Semantic**: ◐ PARTIAL — wrong central function — The candidate focuses primarily on the Apps-Engine slash command manager (AppSlashCommandManager/CommandBridge) as the core registration and execution mechanism, missing the central `slashCommands` object with `add()`/`run()` in `app/utils/server/slashCommand.ts` and the Meteor method `slashCommand` that bridges client to server — these are the core mechanisms for built-in slash commands.

**scope entry pages** (10 scored → 3 chosen)
- Integrations, Webhooks & Slash Commands `0.769`
- Registration, Setup Wizard & Password Policies `0.467`
- Account Profile & Client Startup `0.45`

**per-page seeds**:
- `Integrations, Webhooks & Slash Commands`: → `_allUsers` · 10 candidates — top lexical score among 21 candidate symbols in 11 files (0)
- `Registration, Setup Wizard & Password Policies`: → `constructor` · 10 candidates — top lexical score among 23 candidate symbols in 13 files (0)
- `Account Profile & Client Startup`: → `useAllowPasswordChange` · 10 candidates — top lexical score among 25 candidate symbols in 16 files (0.276)

**walk** (3 seeds · 3 steps)
- **_allUsers** · 0 steps · ⏹ exhausted
- **constructor** · 3 steps · ⏹ exhausted
    - R1 → `expand` · affinity top 0.867 (expand) vs 0.867 (down) / 0 (up)
        - ↳ reached 418 files · **core hit 1⭐**: `flows/processSlashCommand.ts`
    - R2 → `expand` · affinity top 0.807 (expand) vs 0.33 (down) / 0.58 (up)
        - ↳ reached 317 files · core hit 0
    - R3 → `expand` · affinity top 0.708 (expand) vs 0.162 (down) / 0.547 (up)
        - ↳ reached 15 files · **core hit 1⭐**: `server/slashCommand.ts`
- **useAllowPasswordChange** · 0 steps · ⏹ exhausted

**agent calls**: 8 calls ⛔budget full — plan:call-chain  →  search:"registerCommand"  →  graph↓:registerCommand  →  details:CommandBridge.ts ×2  →  details:AppSlashCommandManager.ts ×2  →  search:"processSlashCommand"

## new-11-settings — How does the Settings system work in Rocket.Chat — from registration to client-side access?  _[architecture]_

**Gold check**: scope ✗ wrong · recall 3/3 answer files · first core hit at step 3 (seed fell short, walk caught it)

**Semantic**: ◐ PARTIAL — core step missing — The candidate covers registration, caching, and client-side React hooks but completely omits the critical propagation mechanism — the Meteor methods `public-settings/get` and `private-settings/get` — that actually transfer settings from server to client, which is a core step without which the end-to-end pipeline doesn't work.

**scope entry pages** (10 scored → 3 chosen)
- Authentication, Login & Two-Factor Auth `0.788`
- Message Actions, Reactions & Moderation `0.78`
- Account Profile & Client Startup `0.776`

**per-page seeds**:
- `Authentication, Login & Two-Factor Auth`: → `AuthenticatedContext` · 10 candidates — top lexical score among 22 candidate symbols in 13 files (0)
- `Message Actions, Reactions & Moderation`: → `afterDeleteRoom` · 10 candidates — top lexical score among 14 candidate symbols in 10 files (0)
- `Account Profile & Client Startup`: → `AccessibilityPage` · 10 candidates — top lexical score among 25 candidate symbols in 16 files (0.845)

**walk** (3 seeds · 9 steps)
- **AuthenticatedContext** · 0 steps · ⏹ exhausted
- **afterDeleteRoom** · 4 steps · ⏹ exhausted
    - R1 → `up` · affinity top 0.368 (up) vs 0.328 (expand) / 0.246 (down)
        - ↳ reached 5 files · core hit 0
    - R2 → `expand` · affinity top 0.45 (expand) vs 0.447 (down) / 0.247 (up)
        - ↳ reached 123 files · core hit 0
    - R3 → `expand` · affinity top 0.914 (expand) vs 0.884 (down) / 0.905 (up)
        - ↳ reached 2001 files · **core hit 3⭐**: `server/SettingsRegistry.ts` `server/CachedSettings.ts` `settings/index.ts`
    - R4 → `expand` · affinity top 0.865 (expand) vs 0.865 (down) / 0.458 (up)
        - ↳ reached 189 files · core hit 0
- **AccessibilityPage** · 5 steps · ⏹ exhausted
    - R1 → `expand` · affinity top 0.805 (expand) vs 0.805 (down) / 0 (up)
        - ↳ reached 67 files · **core hit 1⭐**: `server/CachedSettings.ts`
    - R2 → `expand` · affinity top 0.821 (expand) vs 0.566 (down) / 0.789 (up)
        - ↳ reached 227 files · core hit 0
    - R3 → `expand` · affinity top 0.743 (expand) vs 0.643 (down) / 0.493 (up)
        - ↳ reached 31 files · core hit 0
    - R4 → `expand` · affinity top 0.767 (expand) vs 0.66 (down) / 0.506 (up)
        - ↳ reached 10 files · core hit 0
    - R5 → `expand` · affinity top 0.561 (expand) vs 0.343 (down) / 0.353 (up)
        - ↳ reached 36 files · core hit 0

**agent calls**: 9 calls ⛔budget full — plan:?  →  details:index.ts  →  graph↓:settingsRegistry  →  details:index.ts ×2  →  search:"SettingsRegistry"  →  details:SettingsRegistry.ts  →  graph↑:SettingsRegistry.add  →  graph↑:SettingsRegistry.addGroup

## claude-03-file-upload — What is the storage workflow for file uploads in Rocket.Chat?  _[architecture]_

**Gold check**: scope ✓ correct · recall 0/5 answer files · ✗ core never hit

**Semantic**: ◐ PARTIAL — core step missing — The candidate describes the UFS-based server-side storage pipeline well but omits the critical two-step client-server flow (POST /v1/rooms.media then POST /v1/rooms.mediaConfirm), the client-side entry point (uploadFiles()), and the confirm step that calls parseFileIntoMessageAttachments() to create message attachments — without which the central mechanism for attaching files to messages is absent.

**scope entry pages** (10 scored → 3 chosen)
- Message Actions, Reactions & Moderation `0.792`
- File Upload, UFS & Image Processing `0.776`
- Email, Mailer & IMAP Inbox `0.767`

**per-page seeds**:
- `Message Actions, Reactions & Moderation`: → `afterDeleteRoom` · 10 candidates — top lexical score among 14 candidate symbols in 10 files (0)
- `File Upload, UFS & Image Processing`: → `UploadFS` · 10 candidates — top lexical score among 28 candidate symbols in 16 files (0.941)
- `Email, Mailer & IMAP Inbox`: → `FileAttachment` · 10 candidates — top lexical score among 19 candidate symbols in 12 files (0.852)

**walk** (3 seeds · 1 steps)
- **afterDeleteRoom** · 0 steps · ⏹ decayed
- **UploadFS** · 0 steps · ⏹ decayed
- **FileAttachment** · 1 steps · ⏹ decayed
    - R1 → `expand` · affinity top 0.827 (expand) vs 0.82 (down) / 0.46 (up)
        - ↳ reached 95 files · core hit 0

**agent calls**: 8 calls ⛔budget full — plan:architecture  →  search:"UploadFS"·server  →  graph:UploadFS  →  details:service.ts ×2  →  search:"FileUpload"·server  →  details:FileUpload.ts ×2

## new-10-apps-engine — How does a Rocket.Chat App hook into events like afterSaveMessage via the Apps Engine?  _[architecture]_

**Gold check**: scope ✗ wrong · recall 3/4 answer files · first core hit at step 1 (seed fell short, walk caught it)

**Semantic**: ✗ FAIL — wrong subsystem — The candidate describes the Rocket.Chat callback system (callbacks.run) as the integration point rather than the correct AppListenerManager/AppListenerBridge/executeListener pipeline, misses AppInterface enum, registerListeners, and the bridge layer entirely, and provides a largely speculative and incorrect account of how Apps Engine hooks work.

**scope entry pages** (10 scored → 3 chosen)
- Message Actions, Reactions & Moderation `0.793`
- Full-Text Search Service `0.791`
- Room Views, Message List & Contextual Bars `0.76`

**per-page seeds**:
- `Message Actions, Reactions & Moderation`: → `pinMessage` · 10 candidates — top lexical score among 14 candidate symbols in 10 files (0.923)
- `Full-Text Search Service`: → `messageSearch` · 10 candidates — top lexical score among 10 candidate symbols in 6 files (0.884)
- `Room Views, Message List & Contextual Bars`: → `isMessageNewDay` · 10 candidates — top lexical score among 22 candidate symbols in 14 files (0.866)

**walk** (3 seeds · 9 steps)
- **pinMessage** · 3 steps · ⏹ exhausted
    - R1 → `expand` · affinity top 0.877 (expand) vs 0.874 (down) / 0.805 (up)
        - ↳ reached 124 files · **core hit 1⭐**: `server/AppManager.ts`
    - R2 → `expand` · affinity top 0.986 (expand) vs 0.94 (down) / 0.986 (up)
        - ↳ reached 3247 files · **core hit 2⭐**: `managers/AppListenerManager.ts` `bridges/listeners.ts`
    - R3 → `expand` · affinity top 0.849 (expand) vs 0.84 (down) / 0.833 (up)
        - ↳ reached 111 files · core hit 0
- **messageSearch** · 3 steps · ⏹ exhausted
    - R1 → `expand` · affinity top 0.757 (expand) vs 0.662 (down) / 0.733 (up)
        - ↳ reached 71 files · **core hit 1⭐**: `server/AppManager.ts`
    - R2 → `expand` · affinity top 0.962 (expand) vs 0.897 (down) / 0.962 (up)
        - ↳ reached 2846 files · **core hit 2⭐**: `managers/AppListenerManager.ts` `bridges/listeners.ts`
    - R3 → `expand` · affinity top 0.885 (expand) vs 0.861 (down) / 0.877 (up)
        - ↳ reached 142 files · core hit 0
- **isMessageNewDay** · 3 steps · ⏹ exhausted
    - R1 → `expand` · affinity top 0.863 (expand) vs 0.429 (down) / 0.862 (up)
        - ↳ reached 11 files · core hit 0
    - R2 → `expand` · affinity top 0.962 (expand) vs 0.907 (down) / 0.962 (up)
        - ↳ reached 1027 files · **core hit 3⭐**: `managers/AppListenerManager.ts` `server/AppManager.ts` `bridges/listeners.ts`
    - R3 → `expand` · affinity top 0.893 (expand) vs 0.85 (down) / 0.886 (up)
        - ↳ reached 485 files · core hit 0

**agent calls**: 9 calls ⛔budget full — plan:?  →  search:"afterSaveMessage"·server  →  search:"IPreMessageAfterSave"·packages  →  search:"App"  →  details:afterSaveMessage.ts  →  details:App.ts  →  search:"callbacks.add.*Apps"·server  →  search:"IMessageEvent"·packages  →  search:"IHook"·packages

## new-20-proxify — How does the core-services proxify() pattern work for inter-service communication in Rocket.Chat?  _[locate]_

**Gold check**: scope ✗ wrong · recall 0/3 answer files · ✗ core never hit

**Semantic**: ✓ PASS — The candidate correctly identifies the core mechanism: proxify() creates a Proxy with a get handler that intercepts method calls and routes them to api.call('namespace.methodName', params), which is the essential pipeline. Missing peripheral details like LocalBroker internals, ServiceClass lifecycle hooks, and Promisify type do not affect the core correctness.

**scope entry pages** (10 scored → 3 chosen)
- Livechat Embedded Widget `0.45`
- Apps Server Integration & Bridges `0.383`
- Build, CI & Release Tooling `0.371`

**per-page seeds**:
- `Livechat Embedded Widget`: → `api` · 10 candidates — top lexical score among 27 candidate symbols in 14 files (0)
- `Apps Server Integration & Bridges`: → `_disableAppsWithAddonsCallback` · 10 candidates — top lexical score among 16 candidate symbols in 9 files (0)
- `Build, CI & Release Tooling`: → `baseConfig` · 10 candidates — top lexical score among 13 candidate symbols in 8 files (0)

**walk** (3 seeds · 0 steps)
- **api** · 0 steps · ⏹ decayed
- **_disableAppsWithAddonsCallback** · 0 steps · ⏹ decayed
- **baseConfig** · 0 steps · ⏹ exhausted

**agent calls**: 8 calls ⛔budget full — plan:?  →  search:"proxify"  →  graph:proxify  →  details:proxify.ts ×4  →  search:"api.call"

## tour-07-db-model-create — How do you create a new database model in Rocket.Chat?  _[pattern]_

**Gold check**: scope ✗ wrong · recall 3/5 answer files · first core hit at step 1 (seed fell short, walk caught it)

**Semantic**: ✓ PASS — The candidate correctly identifies the three-layer pattern (document interface, model class extending BaseRaw, registration/export), the BaseRaw base class, constructor requirements (Db instance, collection name, optional trash), modelIndexes override, and the proxify/export mechanism — matching the core mechanism even if it omits the model-typings interface layer and registerModel details.

**scope entry pages** (10 scored → 3 chosen)
- Room Views, Message List & Contextual Bars `0.733`
- Job Scheduling, Agenda & Queue Worker `0.665`
- Omnichannel Server Engine & Livechat Routing `0.617`

**per-page seeds**:
- `Room Views, Message List & Contextual Bars`: → `createDataAPI` · 10 candidates — top lexical score among 22 candidate symbols in 14 files (0.875)
- `Job Scheduling, Agenda & Queue Worker`: → `createJob` · 10 candidates — top lexical score among 15 candidate symbols in 9 files (0.923)
- `Omnichannel Server Engine & Livechat Routing`: → `beforeNewRoom` · 10 candidates — top lexical score among 17 candidate symbols in 11 files (0.85)

**walk** (3 seeds · 6 steps)
- **createDataAPI** · 6 steps · ⏹ exhausted
    - R1 → `up` · affinity top 0.781 (up) vs 0.504 (expand) / 0.405 (down)
        - ↳ reached 632 files · **core hit 2⭐**: `models/BaseRaw.ts` `models/Messages.ts`
    - R2 → `expand` · affinity top 0.948 (expand) vs 0.948 (down) / 0 (up)
        - ↳ reached 417 files · **core hit 1⭐**: `IMessage/IMessage.ts`
    - R3 → `expand` · affinity top 0.893 (expand) vs 0.887 (down) / 0.873 (up)
        - ↳ reached 134 files · core hit 0
    - R4 → `expand` · affinity top 0.896 (expand) vs 0.874 (down) / 0.878 (up)
        - ↳ reached 190 files · core hit 0
    - R5 → `expand` · affinity top 0.849 (expand) vs 0.739 (down) / 0.403 (up)
        - ↳ reached 99 files · core hit 0
    - R6 → `expand` · affinity top 0.403 (expand) vs 0.25 (down) / 0.403 (up)
        - ↳ reached 40 files · core hit 0
- **createJob** · 0 steps · ⏹ decayed
- **beforeNewRoom** · 0 steps · ⏹ decayed

**agent calls**: 8 calls ⛔budget full — plan:architecture  →  search:"RawCollection"·packages  →  search:"Base"·packages  →  details:BaseRaw.ts  →  details:Apps.ts  →  search:"AppsRaw"·packages  →  search:"AppsModel"·packages  →  details:Apps.ts

## tour-08-db-model-use — How do you use a database model to query data in Rocket.Chat?  _[pattern]_

**Gold check**: scope ✓ correct · recall 0/3 answer files · ✗ core never hit

**Semantic**: ◐ PARTIAL — core step missing — The candidate correctly explains the BaseRaw layer and domain-specific model methods, but uses VideoConference as its example rather than tracing any complete end-to-end query pipeline (entry point → service function → model method → result processing), missing the essential dispatch and post-processing steps that constitute the core mechanism as illustrated by the loadHistory example in the gold answer.

**scope entry pages** (10 scored → 3 chosen)
- Video Conferencing Service & UI `0.761`
- Core Data Models & Type Definitions `0.39`
- File Upload, UFS & Image Processing `0.39`

**per-page seeds**:
- `Video Conferencing Service & UI`: → `getQueryParams` · 10 candidates — top lexical score among 16 candidate symbols in 10 files (0.859)
- `Core Data Models & Type Definitions`: → `$all` · 10 candidates — top lexical score among 31 candidate symbols in 17 files (0)
- `File Upload, UFS & Image Processing`: → `bufferToStream` · 10 candidates — top lexical score among 28 candidate symbols in 16 files (0)

**walk** (3 seeds · 0 steps)
- **getQueryParams** · 0 steps · ⏹ decayed
- **$all** · 0 steps · ⏹ decayed
- **bufferToStream** · 0 steps · ⏹ decayed

**agent calls**: 5 calls — plan:?  →  search:"VideoConferenceRaw"  →  graph:VideoConferenceRaw  →  details:VideoConference.ts  →  details:BaseRaw.ts

## tour-11-new-package — How do you create a new package in the Rocket.Chat monorepo?  _[pattern]_

**Gold check**: scope ✗ wrong · recall 0/3 answer files · ✗ core never hit

**Semantic**: ✓ PASS — The candidate correctly identifies the core mechanism: creating a directory under packages/, adding a package.json with the @rocket.chat namespace, and running yarn install to link the workspace. The extra step about manually adding to root package.json workspaces array is slightly inaccurate (the glob pattern 'packages/*' typically covers all packages automatically), but the overall pipeline is correct and not misleading. Missing peripheral detail like tsconfig.json setup and consuming package wiring does not warrant a PARTIAL.

**scope entry pages** (10 scored → 3 chosen)
- Room Views, Message List & Contextual Bars `0.733`
- Engagement, NPS Surveys & Version Checks `0.604`
- Account Profile & Client Startup `0.476`

**per-page seeds**:
- `Room Views, Message List & Contextual Bars`: → `createDataAPI` · 10 candidates — top lexical score among 22 candidate symbols in 14 files (0.875)
- `Engagement, NPS Surveys & Version Checks`: → `getNewUpdates` · 10 candidates — top lexical score among 23 candidate symbols in 13 files (0.851)
- `Account Profile & Client Startup`: → `createStyleElement` · 10 candidates — top lexical score among 25 candidate symbols in 16 files (0.84)

**walk** (3 seeds · 6 steps)
- **createDataAPI** · 6 steps · ⏹ exhausted
    - R1 → `up` · affinity top 0.721 (up) vs 0.492 (expand) / 0.405 (down)
        - ↳ reached 632 files · core hit 0
    - R2 → `expand` · affinity top 0.927 (expand) vs 0.927 (down) / 0 (up)
        - ↳ reached 417 files · core hit 0
    - R3 → `expand` · affinity top 0.893 (expand) vs 0.887 (down) / 0.873 (up)
        - ↳ reached 132 files · core hit 0
    - R4 → `expand` · affinity top 0.896 (expand) vs 0.874 (down) / 0.878 (up)
        - ↳ reached 190 files · core hit 0
    - R5 → `expand` · affinity top 0.849 (expand) vs 0.739 (down) / 0.403 (up)
        - ↳ reached 98 files · core hit 0
    - R6 → `expand` · affinity top 0.403 (expand) vs 0.25 (down) / 0.403 (up)
        - ↳ reached 40 files · core hit 0
- **getNewUpdates** · 0 steps · ⏹ decayed
- **createStyleElement** · 0 steps · ⏹ exhausted

**agent calls**: 7 calls — wiki  →  search:"create new package monorepo"  →  search:"yarn workspace"  →  search:"package.json" ×2  →  details:package.json  →  search:"workspaces"

## tour-10-new-service — How do you add a new service in Rocket.Chat?  _[pattern]_

**Gold check**: scope ✓ correct · recall 0/4 answer files · ✗ core never hit

**Semantic**: ✓ PASS — The candidate correctly identifies the core mechanism: extending ServiceClassInternal, setting the protected name, implementing a service interface, creating the file in apps/meteor/server/services/, and registering during startup. It also correctly mentions proxify-style registration and the core-services package structure, matching the gold answer's central pipeline even if less exhaustive.

**scope entry pages** (10 scored → 3 chosen)
- Room Views, Message List & Contextual Bars `0.753`
- Engagement, NPS Surveys & Version Checks `0.501`
- Omnichannel Server Engine & Livechat Routing `0.495`

**per-page seeds**:
- `Room Views, Message List & Contextual Bars`: → `isMessageNewDay` · 10 candidates — top lexical score among 22 candidate symbols in 14 files (0.837)
- `Engagement, NPS Surveys & Version Checks`: → `getNewUpdates` · 10 candidates — top lexical score among 23 candidate symbols in 13 files (0.851)
- `Omnichannel Server Engine & Livechat Routing`: → `beforeNewRoom` · 10 candidates — top lexical score among 17 candidate symbols in 11 files (0.85)

**walk** (3 seeds · 0 steps)
- **isMessageNewDay** · 0 steps · ⏹ decayed
- **getNewUpdates** · 0 steps · ⏹ decayed
- **beforeNewRoom** · 0 steps · ⏹ decayed

**agent calls**: 5 calls — plan:architecture  →  search:"NPSService"·server  →  details:service.ts  →  search:"ServiceClassInternal"  →  details:ServiceClass.ts

## new-21-impact-settings — What would be affected if the CachedSettings system were changed?  _[impact]_

**Gold check**: scope ✗ wrong · recall 0/3 answer files · ✗ core never hit

**Semantic**: ✗ FAIL — wrong subsystem — The candidate focuses on API middleware, CORS, and Wizard UI components as the primary dependents, missing the core truth that CachedSettings is the universal in-memory settings store used by virtually every server module (auth, messaging, omnichannel, notifications, etc.) via settings.get()/watch()/change(); the listed dependents are peripheral or unrelated to CachedSettings itself.

**scope entry pages** (10 scored → 3 chosen)
- Authentication, Login & Two-Factor Auth `0.788`
- Message Actions, Reactions & Moderation `0.78`
- Account Profile & Client Startup `0.776`

**per-page seeds**:
- `Authentication, Login & Two-Factor Auth`: → `AuthenticatedContext` · 10 candidates — top lexical score among 22 candidate symbols in 13 files (0)
- `Message Actions, Reactions & Moderation`: → `afterDeleteRoom` · 10 candidates — top lexical score among 14 candidate symbols in 10 files (0)
- `Account Profile & Client Startup`: → `{
	registerSidebarItem: registerAccountSidebarItem,
	unregisterSidebarItem,
	getSidebarItems: getAccountSidebarItems,
	subscribeToSidebarItems: subscribeToAccountSidebarItems,
}` · 10 candidates — top lexical score among 25 candidate symbols in 16 files (0.215)

**walk** (3 seeds · 0 steps)
- **AuthenticatedContext** · 0 steps · ⏹ exhausted
- **afterDeleteRoom** · 0 steps · ⏹ decayed
- **{
	registerSidebarItem: registerAccountSidebarItem,
	unregisterSidebarItem,
	getSidebarItems: getAccountSidebarItems,
	subscribeToSidebarItems: subscribeToAccountSidebarItems,
}** · 0 steps · ⏹ decayed

**agent calls**: 3 calls — plan:impact  →  search:"CachedSettings"  →  graph↑:CachedSettings

## new-22-2fa — How does two-factor authentication (2FA) work in Rocket.Chat?  _[architecture]_

**Gold check**: scope ✓ correct · recall 0/6 answer files · ✗ core never hit

**Semantic**: ✓ PASS — The candidate correctly identifies the core mechanism: twoFactorRequired decorator, checkCodeForUser orchestration, pluggable check methods (TOTP/Email/Password), remember-me via isAuthorizedForToken/rememberAuthorization, HTTP header support, and the totp-required error flow. The client-side retry loop is also correctly described. Missing only peripheral detail like the ICodeCheck interface definition and exhaustive per-step enumeration.

**scope entry pages** (10 scored → 3 chosen)
- Authentication, Login & Two-Factor Auth `0.779`
- Apps Server Integration & Bridges `0.698`
- Client SDK, API Client & Shared Utilities `0.694`

**per-page seeds**:
- `Authentication, Login & Two-Factor Auth`: → `AuthenticationProvider` · 10 candidates — top lexical score among 22 candidate symbols in 13 files (0.866)
- `Apps Server Integration & Bridges`: → `isNonEnterpriseTwoFactorOptions` · 10 candidates — top lexical score among 16 candidate symbols in 9 files (0.788)
- `Client SDK, API Client & Shared Utilities`: → `TwoFactorMethod` · 10 candidates — top lexical score among 21 candidate symbols in 13 files (0.859)

**walk** (3 seeds · 1 steps)
- **AuthenticationProvider** · 1 steps · ⏹ decayed
    - R1 → `expand` · affinity top 0.668 (expand) vs 0.668 (down) / 0 (up)
        - ↳ reached 29 files · core hit 0
- **isNonEnterpriseTwoFactorOptions** · 0 steps · ⏹ decayed
- **TwoFactorMethod** · 0 steps · ⏹ exhausted

**agent calls**: 8 calls ⛔budget full — wiki  →  search:"twoFactorRequired"·server  →  details:twoFactorRequired.ts  →  graph↓:twoFactorRequired  →  details:index.ts  →  search:"totpOnCall"·client  →  details:totpOnCall.ts  →  search:"isTotpRequiredError"·client

## claude-04-e2e-encryption — How are the keys managed for end-to-end (E2E) encryption in Rocket.Chat?  _[architecture]_

**Gold check**: scope ✓ correct · recall 2/6 answer files · **seed hits core⭐**

**Semantic**: ◐ PARTIAL — core step missing — The candidate correctly describes PBKDF2-based private key encryption/decryption and the Keychain class, but omits the RSA key pair generation, the per-room AES group key system, and key distribution — all central mechanisms of E2E key management without which the system doesn't work end-to-end.

**scope entry pages** (10 scored → 3 chosen)
- End-to-End Encryption `0.789`
- Service Workers & Public Assets `0.703`
- Omnichannel Server Engine & Livechat Routing `0.393`

**per-page seeds**:
- `End-to-End Encryption`: → `EncryptedKey` · 10 candidates — top lexical score among 15 candidate symbols in 10 files (0.856)
- `Service Workers & Public Assets`: → `E2ERoom` · 10 candidates — top lexical score among 20 candidate symbols in 10 files (0.907)
- `Omnichannel Server Engine & Livechat Routing`: → `applyDepartmentRestrictions` · 10 candidates — top lexical score among 17 candidate symbols in 11 files (0)

**walk** (3 seeds · 0 steps)
- **EncryptedKey** · 0 steps · ⏹ exhausted
- **E2ERoom** · 0 steps · ⏹ exhausted
- **applyDepartmentRestrictions** · 0 steps · ⏹ decayed

**agent calls**: 4 calls — wiki  →  search:"Keychain"·client  →  details:keychain.ts ×2

## new-12-ldap-auth — How does LDAP authentication work in Rocket.Chat?  _[routing]_

**Gold check**: scope ✗ wrong · recall 4/5 answer files · first core hit at step 2 (seed fell short, walk caught it)

**Semantic**: ◐ PARTIAL — core step missing — The candidate correctly identifies the login handler registration in ldap.ts but omits the critical middle layers — LDAPService.loginRequest(), LDAPManager.login(), LDAPConnection, and LDAPUserConverter — which are the actual mechanisms that make LDAP authentication work. The candidate vaguely says the handler 'uses configured settings to connect, authenticate, and synchronize' without identifying the central dispatch chain (LDAPManager.login) that orchestrates those steps.

**scope entry pages** (10 scored → 3 chosen)
- Client SDK, API Client & Shared Utilities `0.495`
- UI Contexts & React Providers `0.48`
- Authentication, Login & Two-Factor Auth `0.479`

**per-page seeds**:
- `Client SDK, API Client & Shared Utilities`: → `AbacAttributeDefinitionNotFoundError` · 10 candidates — top lexical score among 21 candidate symbols in 13 files (0)
- `UI Contexts & React Providers`: → `AuthenticationContext` · 10 candidates — top lexical score among 27 candidate symbols in 16 files (0.875)
- `Authentication, Login & Two-Factor Auth`: → `AuthenticationProvider` · 10 candidates — top lexical score among 22 candidate symbols in 13 files (0.866)

**walk** (3 seeds · 5 steps)
- **AbacAttributeDefinitionNotFoundError** · 0 steps · ⏹ exhausted
- **AuthenticationContext** · 0 steps · ⏹ exhausted
- **AuthenticationProvider** · 5 steps · ⏹ exhausted
    - R1 → `expand` · affinity top 0.487 (expand) vs 0.487 (down) / 0 (up)
        - ↳ reached 29 files · core hit 0
    - R2 → `expand` · affinity top 0.759 (expand) vs 0.104 (down) / 0.759 (up)
        - ↳ reached 758 files · **core hit 2⭐**: `ldap/Connection.ts` `ldap/UserConverter.ts`
    - R3 → `expand` · affinity top 0.8 (expand) vs 0.8 (down) / 0 (up)
        - ↳ reached 353 files · **core hit 1⭐**: `ldap/Manager.ts`
    - R4 → `expand` · affinity top 0.831 (expand) vs 0.831 (down) / 0.302 (up)
        - ↳ reached 147 files · **core hit 1⭐**: `ldap/service.ts`
    - R5 → `expand` · affinity top 0.386 (expand) vs 0.371 (down) / 0.258 (up)
        - ↳ reached 232 files · core hit 0

**agent calls**: 8 calls ⛔budget full — plan:architecture  →  search:"loginWithLDAP"  →  graph↓:loginWithLDAP  →  search:"Accounts.registerLoginHandler"  →  details:ldap.ts ×3  →  graph↓:file

## claude-02-msg-permissions — Where is the logic for message permission validation located?  _[locate]_

**Gold check**: scope ✗ wrong · recall 4/5 answer files · first core hit at step 2 (seed fell short, walk caught it)

**Semantic**: ◐ PARTIAL — core step missing — The candidate identifies canSendMessage.ts and some related files but focuses heavily on delete/update paths rather than the core send-message permission pipeline; it omits validateRoomMessagePermissionsAsync, the key checks inside it (archived, blocked, read-only, muted), and the validateMessage content-level validation in sendMessage.ts, leaving the central mechanism only partially described.

**scope entry pages** (10 scored → 3 chosen)
- Slack Bridge & External Chat Sync `0.765`
- Audit Log & Compliance UI `0.753`
- Message Types, Threads & System Messages `0.738`

**per-page seeds**:
- `Slack Bridge & External Chat Sync`: → `APIClass` · 10 candidates — top lexical score among 11 candidate symbols in 6 files (0)
- `Audit Log & Compliance UI`: → `findMessagesSentOrigin` · 10 candidates — top lexical score among 18 candidate symbols in 9 files (0.824)
- `Message Types, Threads & System Messages`: → `MessagesRaw` · 10 candidates — top lexical score among 17 candidate symbols in 12 files (0.908)

**walk** (3 seeds · 11 steps)
- **APIClass** · 3 steps · ⏹ exhausted
    - R1 → `expand` · affinity top 0.392 (expand) vs 0 (down) / 0.392 (up)
        - ↳ reached 53 files · core hit 0
    - R2 → `expand` · affinity top 0.962 (expand) vs 0.87 (down) / 0.962 (up)
        - ↳ reached 1694 files · **core hit 2⭐**: `methods/sendMessage.ts` `functions/sendMessage.ts`
    - R3 → `expand` · affinity top 0.907 (expand) vs 0.872 (down) / 0.901 (up)
        - ↳ reached 329 files · **core hit 2⭐**: `functions/canAccessRoom.ts` `functions/hasPermission.ts`
- **findMessagesSentOrigin** · 8 steps · ⏹ budget
    - R1 → `up` · affinity top 0.965 (up) vs 0.454 (expand) / 0.26 (down)
        - ↳ reached 3 files · core hit 0
    - R2 → `expand` · affinity top 0.834 (expand) vs 0.819 (down) / 0.471 (up)
        - ↳ reached 39 files · core hit 0
    - R3 → `expand` · affinity top 0.831 (expand) vs 0.831 (down) / 0 (up)
        - ↳ reached 44 files · core hit 0
    - R4 → `expand` · affinity top 0.954 (expand) vs 0.926 (down) / 0.935 (up)
        - ↳ reached 2413 files · core hit 0
    - R5 → `expand` · affinity top 0.889 (expand) vs 0.889 (down) / 0.439 (up)
        - ↳ reached 326 files · **core hit 4⭐**: `methods/sendMessage.ts` `functions/sendMessage.ts` `functions/canAccessRoom.ts` `functions/hasPermission.ts`
    - R6 → `expand` · affinity top 0.892 (expand) vs 0.481 (down) / 0.892 (up)
        - ↳ reached 591 files · core hit 0
    - R7 → `expand` · affinity top 0.895 (expand) vs 0.895 (down) / 0 (up)
        - ↳ reached 265 files · core hit 0
    - R8 → `expand` · affinity top 0.904 (expand) vs 0.804 (down) / 0.904 (up)
        - ↳ reached 13 files · core hit 0
- **MessagesRaw** · 0 steps · ⏹ exhausted

**agent calls**: 8 calls ⛔budget full — plan:locate  →  search:"deleteMessageValidatingPermission"  →  graph:deleteMessageValidatingPermission  →  details:canDeleteMessage.ts  →  search:"executeUpdateMessage"·server  →  details:updateMessage.ts  →  search:"sendMessage"·server  →  details:canSendMessage.ts

## new-14-ee-license — How does enterprise feature gating work in Rocket.Chat?  _[locate]_

**Gold check**: scope ✓ correct · recall 0/6 answer files · ✗ core never hit

**Semantic**: ✓ PASS — The candidate correctly identifies LicenseManager as the central gatekeeper, describes setLicense/validation/hasModule/isLimitReached flow, module-based gating, and event emission — matching the core mechanism even though it omits exhaustive detail on LicenseImp, replaceModules, runValidation internals, and the full event listener API.

**scope entry pages** (10 scored → 3 chosen)
- Enterprise License & Feature Gates `0.787`
- Omnichannel Server Engine & Livechat Routing `0.726`
- Apps Server Integration & Bridges `0.51`

**per-page seeds**:
- `Enterprise License & Feature Gates`: → `_canEnableApp` · 10 candidates — top lexical score among 18 candidate symbols in 12 files (0)
- `Omnichannel Server Engine & Livechat Routing`: → `LivechatEnterprise` · 10 candidates — top lexical score among 17 candidate symbols in 11 files (0.866)
- `Apps Server Integration & Bridges`: → `isNonEnterpriseTwoFactorOptions` · 10 candidates — top lexical score among 16 candidate symbols in 9 files (0.801)

**walk** (3 seeds · 0 steps)
- **_canEnableApp** · 0 steps · ⏹ decayed
- **LivechatEnterprise** · 0 steps · ⏹ decayed
- **isNonEnterpriseTwoFactorOptions** · 0 steps · ⏹ decayed

**agent calls**: 8 calls ⛔budget full — wiki  →  search:"LicenseManager"·ee  →  details:license.ts  →  graph↑:LicenseManager  →  details:licenseImp.ts ×4

## new-13-room-creation — What happens when a user creates a new channel in Rocket.Chat?  _[call-chain]_

**Gold check**: scope ✗ wrong · recall 2/2 answer files · first core hit at step 3 (seed fell short, walk caught it)

**Semantic**: ✓ PASS — The candidate correctly identifies the core mechanism: createChannelMethod entry point, permission checks, createRoom core function, DB insertion via Rooms.createWithFullRoomData, subscriptions via createUsersSubscriptions, callbacks, and Apps Engine events — all matching the gold answer's central pipeline.

**scope entry pages** (10 scored → 3 chosen)
- Room Views, Message List & Contextual Bars `0.733`
- Sidebar, Navigation & Client-Side Router `0.714`
- Home Page, Banners & Announcements `0.673`

**per-page seeds**:
- `Room Views, Message List & Contextual Bars`: → `createDataAPI` · 10 candidates — top lexical score among 22 candidate symbols in 14 files (0.875)
- `Sidebar, Navigation & Client-Side Router`: → `CreateChannelModal` · 10 candidates — top lexical score among 38 candidate symbols in 22 files (0.845)
- `Home Page, Banners & Announcements`: → `CreateChannelsCard` · 10 candidates — top lexical score among 18 candidate symbols in 12 files (0.845)

**walk** (3 seeds · 17 steps)
- **createDataAPI** · 4 steps · ⏹ decayed
    - R1 → `up` · affinity top 0.755 (up) vs 0.513 (expand) / 0.422 (down)
        - ↳ reached 632 files · core hit 0
    - R2 → `expand` · affinity top 0.927 (expand) vs 0.927 (down) / 0 (up)
        - ↳ reached 417 files · core hit 0
    - R3 → `expand` · affinity top 0.915 (expand) vs 0.889 (down) / 0.898 (up)
        - ↳ reached 124 files · **core hit 2⭐**: `methods/createChannel.ts` `functions/createRoom.ts`
    - R4 → `expand` · affinity top 0.901 (expand) vs 0.901 (down) / 0.846 (up)
        - ↳ reached 130 files · core hit 0
- **CreateChannelModal** · 6 steps · ⏹ exhausted
    - R1 → `expand` · affinity top 0.856 (expand) vs 0.85 (down) / 0.844 (up)
        - ↳ reached 83 files · **core hit 1⭐**: `methods/createChannel.ts`
    - R2 → `expand` · affinity top 0.877 (expand) vs 0.378 (down) / 0.853 (up)
        - ↳ reached 117 files · core hit 0
    - R3 → `expand` · affinity top 0.921 (expand) vs 0.895 (down) / 0.905 (up)
        - ↳ reached 889 files · **core hit 1⭐**: `functions/createRoom.ts`
    - R4 → `expand` · affinity top 0.914 (expand) vs 0.914 (down) / 0.639 (up)
        - ↳ reached 360 files · core hit 0
    - R5 → `expand` · affinity top 0.504 (expand) vs 0.169 (down) / 0.335 (up)
        - ↳ reached 5 files · core hit 0
    - R6 → `expand` · affinity top 0.595 (expand) vs 0 (down) / 0.595 (up)
        - ↳ reached 11 files · core hit 0
- **CreateChannelsCard** · 7 steps · ⏹ exhausted
    - R1 → `expand` · affinity top 0.39 (expand) vs 0.334 (down) / 0.282 (up)
        - ↳ reached 6 files · core hit 0
    - R2 → `expand` · affinity top 0.855 (expand) vs 0.85 (down) / 0.507 (up)
        - ↳ reached 96 files · **core hit 1⭐**: `methods/createChannel.ts`
    - R3 → `expand` · affinity top 0.877 (expand) vs 0.378 (down) / 0.853 (up)
        - ↳ reached 117 files · core hit 0
    - R4 → `expand` · affinity top 0.921 (expand) vs 0.895 (down) / 0.905 (up)
        - ↳ reached 886 files · **core hit 1⭐**: `functions/createRoom.ts`
    - R5 → `expand` · affinity top 0.914 (expand) vs 0.914 (down) / 0.639 (up)
        - ↳ reached 359 files · core hit 0
    - R6 → `expand` · affinity top 0.504 (expand) vs 0.169 (down) / 0.335 (up)
        - ↳ reached 5 files · core hit 0
    - R7 → `expand` · affinity top 0.595 (expand) vs 0 (down) / 0.595 (up)
        - ↳ reached 11 files · core hit 0

**agent calls**: 8 calls ⛔budget full — plan:call-chain  →  search:"CreateChannelModal"·client  →  graph↓:CreateChannelModal  →  details:CreateChannelModal.tsx  →  search:"createChannel"·client  →  details:createChannel.ts  →  graph↓:createRoom  →  details:createRoom.ts

## new-23-omnichannel — How does the Omnichannel queue process and close a livechat conversation?  _[call-chain]_

**Gold check**: scope ✓ correct · recall 3/4 answer files · first core hit at step 3 (seed fell short, walk caught it)

**Semantic**: ◐ PARTIAL — core step missing — The candidate correctly describes the queue processing pipeline (OmnichannelQueue, execute, checkQueue, processWaitingQueue) but completely omits the closeRoom() transactional mechanism which is the central piece for how a livechat conversation is actually closed — missing doCloseRoom, afterRoomClosed, MongoDB transactions, and the retry logic that constitute the closure mechanism.

**scope entry pages** (10 scored → 3 chosen)
- Omnichannel Server Engine & Livechat Routing `0.766`
- Job Scheduling, Agenda & Queue Worker `0.763`
- Omnichannel Live Chat UI `0.76`

**per-page seeds**:
- `Omnichannel Server Engine & Livechat Routing`: → `LivechatEnterprise` · 10 candidates — top lexical score among 17 candidate symbols in 11 files (0.852)
- `Job Scheduling, Agenda & Queue Worker`: → `Agenda` · 10 candidates — top lexical score among 15 candidate symbols in 9 files (0)
- `Omnichannel Live Chat UI`: → `useOmnichannelPriorities` · 10 candidates — top lexical score among 29 candidate symbols in 16 files (0.834)

**walk** (3 seeds · 10 steps)
- **LivechatEnterprise** · 2 steps · ⏹ exhausted
    - R1 → `expand` · affinity top 0.808 (expand) vs 0.808 (down) / 0 (up)
        - ↳ reached 36 files · core hit 0
    - R2 → `expand` · affinity top 0.754 (expand) vs 0.754 (down) / 0 (up)
        - ↳ reached 24 files · core hit 0
- **Agenda** · 8 steps · ⏹ budget
    - R1 → `expand` · affinity top 0.792 (expand) vs 0 (down) / 0.792 (up)
        - ↳ reached 652 files · **core hit 2⭐**: `omnichannel/service.ts` `omnichannel/queue.ts`
    - R2 → `expand` · affinity top 0.869 (expand) vs 0.825 (down) / 0.814 (up)
        - ↳ reached 124 files · core hit 0
    - R3 → `expand` · affinity top 0.766 (expand) vs 0.52 (down) / 0.387 (up)
        - ↳ reached 66 files · core hit 0
    - R4 → `expand` · affinity top 0.835 (expand) vs 0.802 (down) / 0.789 (up)
        - ↳ reached 300 files · core hit 0
    - R5 → `expand` · affinity top 0.852 (expand) vs 0.296 (down) / 0.852 (up)
        - ↳ reached 232 files · core hit 0
    - R6 → `expand` · affinity top 0.881 (expand) vs 0 (down) / 0.881 (up)
        - ↳ reached 135 files · core hit 0
    - R7 → `expand` · affinity top 0.784 (expand) vs 0.492 (down) / 0.435 (up)
        - ↳ reached 34 files · core hit 0
    - R8 → `expand` · affinity top 0.89 (expand) vs 0.849 (down) / 0.884 (up)
        - ↳ reached 451 files · **core hit 1⭐**: `lib/closeRoom.ts`
- **useOmnichannelPriorities** · 0 steps · ⏹ exhausted

**agent calls**: 8 calls ⛔budget full — plan:call-chain  →  search:"OmnichannelQueue"·server  →  graph↓:OmnichannelQueue  →  details:queue.ts  →  graph↓:OmnichannelQueue.execute  →  graph↓:OmnichannelQueue.start  →  search:"OmnichannelQueue.start"·server  →  details:queue.ts

## claude-06-livechat-routing — How are Livechat requests routed to the server-side in Rocket.Chat?  _[routing]_

**Gold check**: scope ✓ correct · recall 8/8 answer files · first core hit at step 4 (seed fell short, walk caught it)

**Semantic**: ◐ PARTIAL — core step missing — The candidate correctly identifies RoutingManager and its role but omits the critical QueueManager.requestRoom() step that creates the inquiry record and triggers delegateInquiry — a central pipeline step without which routing cannot work — and also omits the pluggable routing strategies (AutoSelection, ManualSelection, External) that are the core of the routing mechanism.

**scope entry pages** (10 scored → 3 chosen)
- HTTP Router, REST API & Type Contracts `0.667`
- Omnichannel Live Chat UI `0.609`
- Omnichannel Server Engine & Livechat Routing `0.508`

**per-page seeds**:
- `HTTP Router, REST API & Type Contracts`: → `PaginatedRequest` · 10 candidates — top lexical score among 27 candidate symbols in 16 files (0.859)
- `Omnichannel Live Chat UI`: → `{
	registerSidebarItem: registerOmnichannelSidebarItem,
	unregisterSidebarItem,
	getSidebarItems: getOmnichannelSidebarItems,
	subscribeToSidebarItems: subscribeToOmnichannelSidebarItems,
}` · 10 candidates — top lexical score among 29 candidate symbols in 16 files (0.218)
- `Omnichannel Server Engine & Livechat Routing`: → `LivechatEnterprise` · 10 candidates — top lexical score among 17 candidate symbols in 11 files (0.852)

**walk** (3 seeds · 11 steps)
- **PaginatedRequest** · 7 steps · ⏹ decayed
    - R1 → `expand` · affinity top 0.346 (expand) vs 0 (down) / 0.346 (up)
        - ↳ reached 7 files · core hit 0
    - R2 → `expand` · affinity top 0.72 (expand) vs 0.048 (down) / 0.72 (up)
        - ↳ reached 228 files · core hit 0
    - R3 → `expand` · affinity top 0.753 (expand) vs 0.339 (down) / 0.649 (up)
        - ↳ reached 60 files · core hit 0
    - R4 → `expand` · affinity top 0.815 (expand) vs 0.375 (down) / 0.795 (up)
        - ↳ reached 155 files · **core hit 1⭐**: `src/api.ts`
    - R5 → `expand` · affinity top 0.834 (expand) vs 0.453 (down) / 0.834 (up)
        - ↳ reached 305 files · **core hit 1⭐**: `src/widget.ts`
    - R6 → `expand` · affinity top 0.847 (expand) vs 0.091 (down) / 0.847 (up)
        - ↳ reached 772 files · **core hit 3⭐**: `routing/AutoSelection.ts` `routing/ManualSelection.ts` `routing/External.ts`
    - R7 → `expand` · affinity top 0.951 (expand) vs 0.951 (down) / 0.903 (up)
        - ↳ reached 1964 files · **core hit 3⭐**: `v1/room.ts` `lib/QueueManager.ts` `lib/RoutingManager.ts`
- **{
	registerSidebarItem: registerOmnichannelSidebarItem,
	unregisterSidebarItem,
	getSidebarItems: getOmnichannelSidebarItems,
	subscribeToSidebarItems: subscribeToOmnichannelSidebarItems,
}** · 0 steps · ⏹ decayed
- **LivechatEnterprise** · 4 steps · ⏹ exhausted
    - R1 → `expand` · affinity top 0.791 (expand) vs 0.791 (down) / 0 (up)
        - ↳ reached 36 files · core hit 0
    - R2 → `expand` · affinity top 0.941 (expand) vs 0.77 (down) / 0.941 (up)
        - ↳ reached 2464 files · **core hit 7⭐**: `src/widget.ts` `v1/room.ts` `lib/QueueManager.ts` `lib/RoutingManager.ts` `routing/AutoSelection.ts` `routing/ManualSelection.ts` `routing/External.ts`
    - R3 → `expand` · affinity top 0.681 (expand) vs 0.3 (down) / 0.429 (up)
        - ↳ reached 21 files · core hit 0
    - R4 → `expand` · affinity top 0.619 (expand) vs 0.619 (down) / 0 (up)
        - ↳ reached 5 files · core hit 0

**agent calls**: 8 calls ⛔budget full — plan:routing  →  search:"RoutingManager"  →  graph:RoutingManager  →  details:inquiries.ts ×2  →  search:"addRoute"·server  →  details:ApiClass.ts ×2

## new-26-team — How does the Team feature work in Rocket.Chat?  _[locate]_

**Gold check**: scope ✗ wrong · recall 2/5 answer files · first core hit at step 3 (seed fell short, walk caught it)

**Semantic**: ✓ PASS — The candidate correctly identifies the core mechanism: TeamService in the right file, extending ServiceClassInternal, covering team creation, room association, membership management, and statistics — matching the essential pipeline described in the gold answer.

**scope entry pages** (10 scored → 3 chosen)
- Crypto, Random & General-Purpose Packages `0.529`
- Email, Mailer & IMAP Inbox `0.48`
- Omnichannel Server Engine & Livechat Routing `0.476`

**per-page seeds**:
- `Crypto, Random & General-Purpose Packages`: → `streamToBuffer` · 10 candidates — top lexical score among 14 candidate symbols in 12 files (0.355)
- `Email, Mailer & IMAP Inbox`: → `api` · 10 candidates — top lexical score among 19 candidate symbols in 12 files (0)
- `Omnichannel Server Engine & Livechat Routing`: → `applyDepartmentRestrictions` · 10 candidates — top lexical score among 17 candidate symbols in 11 files (0)

**walk** (3 seeds · 6 steps)
- **streamToBuffer** · 2 steps · ⏹ exhausted
    - R1 → `expand` · affinity top 0.331 (expand) vs 0.276 (down) / 0.068 (up)
        - ↳ reached 36 files · core hit 0
    - R2 → `expand` · affinity top 0.489 (expand) vs 0 (down) / 0.489 (up)
        - ↳ reached 284 files · core hit 0
- **api** · 4 steps · ⏹ exhausted
    - R1 → `expand` · affinity top 0.849 (expand) vs 0.286 (down) / 0.849 (up)
        - ↳ reached 352 files · **core hit 1⭐**: `team/service.ts`
    - R2 → `expand` · affinity top 0.593 (expand) vs 0.502 (down) / 0.321 (up)
        - ↳ reached 64 files · **core hit 1⭐**: `src/ITeam.ts`
    - R3 → `expand` · affinity top 0.755 (expand) vs 0.274 (down) / 0.755 (up)
        - ↳ reached 110 files · core hit 0
    - R4 → `expand` · affinity top 0.879 (expand) vs 0.87 (down) / 0.804 (up)
        - ↳ reached 138 files · core hit 0
- **applyDepartmentRestrictions** · 0 steps · ⏹ decayed

**agent calls**: 8 calls ⛔budget full — wiki  →  details:service.ts  →  details:teams.ts  →  graph↓:teams.ts  →  graph↓:API.v1.addRoute  →  details:teams.ts  →  search:"TeamService"·server  →  graph:teams.ts
