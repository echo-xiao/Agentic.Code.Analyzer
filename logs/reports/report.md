# report — 逐题 trace + 对不对

7/14/2026, 9:56:41 PM | 34 testcases | deterministic (retrieval-trace × claude-truth × wiki-map)

## 对不对汇总（零-API gold 对照）
- **scope 选对**：17/34 题（答案文件所在页进了入口 scope；另 0 题答案文件不在任何 wiki 页，记 —）
- **召回**：平均找到 **56%** 答案文件 · 一个都没找到的题 10/34
- **seed 命中 core**：seed 即命中 **3** 题 · walk 才捞到 21 · 全程没命中 10 —— seed 即命中 = 路由+种子都对；walk 才捞到 = 靠游走硬捞（scope/seed 没够到）
- **语义**（agent 答案 vs claude gold，本次 --semantic 付费）：PASS 13 / PARTIAL 19 / FAIL 2
> "答案文件" = claude-truth.json 的 core（Claude 金答案关键文件）。trace 本体不含 gold；本节是报告端拿 trace × gold 算的对照，零-API。

## tour-04-msg-client — How is a message sent on the client side in Rocket.Chat?  _[architecture]_

**对不对**：scope ✓ 选对 · 召回 2/5 答案文件 · 首次命中 core 第 2 步（seed 没够到，靠 walk）

**语义**：◐ PARTIAL — core step missing — The candidate correctly identifies sendMessage flow and ChatAPI but omits the critical React component chain (RoomBody → ComposerContainer → ComposerMessage → MessageBox → handleSendMessage) and the final DDP transport step (sdk.call('sendMessage')), which are central to how a message is actually sent on the client side.

**scope 入口页**（10 页打分 → 选 3）
- Message Composer & Input Toolbar `0.789`
- Message Actions, Reactions & Moderation `0.78`
- Room Views, Message List & Contextual Bars `0.78`

**seed 逐页种子**：
- `Message Composer & Input Toolbar`：→ `ChatMessages` · 10 候选 — 页内 12 文件 21 候选符号中词面分最高 (0.895)
- `Message Actions, Reactions & Moderation`：→ `pinMessage` · 10 候选 — 页内 10 文件 14 候选符号中词面分最高 (0.923)
- `Room Views, Message List & Contextual Bars`：→ `isMessageNewDay` · 10 候选 — 页内 14 文件 22 候选符号中词面分最高 (0.866)

**walk 游走**（3 seed · 6 步）
- **ChatMessages** · 0 步 · ⏹ 枯竭
- **pinMessage** · 3 步 · ⏹ 枯竭
    - R1 → `expand` · affinity 最高 0.868 (expand) vs 0.863 (down) / 0.805 (up)
        - ↳ 触达 124 文件 · core 命中 0
    - R2 → `expand` · affinity 最高 0.974 (expand) vs 0.94 (down) / 0.974 (up)
        - ↳ 触达 3247 文件 · **core 命中 2⭐**: `messageBox/MessageBox.tsx` `flows/sendMessage.ts`
    - R3 → `expand` · affinity 最高 0.835 (expand) vs 0.815 (down) / 0.823 (up)
        - ↳ 触达 111 文件 · core 命中 0
- **isMessageNewDay** · 3 步 · ⏹ 枯竭
    - R1 → `expand` · affinity 最高 0.863 (expand) vs 0.429 (down) / 0.862 (up)
        - ↳ 触达 11 文件 · core 命中 0
    - R2 → `expand` · affinity 最高 0.962 (expand) vs 0.907 (down) / 0.962 (up)
        - ↳ 触达 1027 文件 · **core 命中 1⭐**: `flows/sendMessage.ts`
    - R3 → `expand` · affinity 最高 0.884 (expand) vs 0.828 (down) / 0.883 (up)
        - ↳ 触达 485 文件 · **core 命中 1⭐**: `messageBox/MessageBox.tsx`

**agent 实调**：0 calls — (nothing)

## new-19-message-rendering — How is a message rendered from raw text to React components in Rocket.Chat?  _[architecture]_

**对不对**：scope ✗ 选错 · 召回 2/3 答案文件 · 首次命中 core 第 2 步（seed 没够到，靠 walk）

**语义**：✓ PASS — The candidate correctly identifies the core pipeline: raw text → parse() → AST tokens → Markup component → block/inline React components (ParagraphBlock, HeadingBlock, SpoilerBlock, inline elements), which matches the gold answer's central mechanism. The entry point via normalizeThreadMessage is a valid (if narrow) entry-point variant, and the parse function attribution to gazzodown is slightly imprecise but the overall flow is correct and not misleading.

**scope 入口页**（10 页打分 → 选 3）
- Room Views, Message List & Contextual Bars `0.793`
- Account Profile & Client Startup `0.777`
- UI Contexts & React Providers `0.776`

**seed 逐页种子**：
- `Room Views, Message List & Contextual Bars`：→ `isMessageNewDay` · 10 候选 — 页内 14 文件 22 候选符号中词面分最高 (0.866)
- `Account Profile & Client Startup`：→ `RawUserData` · 10 候选 — 页内 16 文件 25 候选符号中词面分最高 (0.866)
- `UI Contexts & React Providers`：→ `Context` · 10 候选 — 页内 16 文件 27 候选符号中词面分最高 (0.639)

**walk 游走**（3 seed · 7 步）
- **isMessageNewDay** · 3 步 · ⏹ 枯竭
    - R1 → `expand` · affinity 最高 0.863 (expand) vs 0.429 (down) / 0.862 (up)
        - ↳ 触达 11 文件 · core 命中 0
    - R2 → `expand` · affinity 最高 0.962 (expand) vs 0.908 (down) / 0.962 (up)
        - ↳ 触达 1015 文件 · **core 命中 1⭐**: `src/index.ts`
    - R3 → `expand` · affinity 最高 0.898 (expand) vs 0.855 (down) / 0.898 (up)
        - ↳ 触达 486 文件 · **core 命中 1⭐**: `src/Markup.tsx`
- **RawUserData** · 0 步 · ⏹ 枯竭
- **Context** · 4 步 · ⏹ 枯竭
    - R1 → `expand` · affinity 最高 0.463 (expand) vs 0 (down) / 0.463 (up)
        - ↳ 触达 642 文件 · core 命中 0
    - R2 → `expand` · affinity 最高 0.916 (expand) vs 0.916 (down) / 0 (up)
        - ↳ 触达 410 文件 · **core 命中 1⭐**: `src/index.ts`
    - R3 → `expand` · affinity 最高 0.926 (expand) vs 0.855 (down) / 0.902 (up)
        - ↳ 触达 464 文件 · core 命中 0
    - R4 → `expand` · affinity 最高 0.898 (expand) vs 0.873 (down) / 0.898 (up)
        - ↳ 触达 289 文件 · **core 命中 1⭐**: `src/Markup.tsx`

**agent 实调**：0 calls — (nothing)

## claude-01-push-notifications — How do push notifications work in Rocket.Chat?  _[architecture]_

**对不对**：scope ✓ 选对 · 召回 3/6 答案文件 · 首次命中 core 第 1 步（seed 没够到，靠 walk）

**语义**：◐ PARTIAL — core step missing — The candidate omits the critical upstream pipeline: afterSaveMessage → sendAllNotifications → shouldNotifyMobile/getPushData → queueNotification with delay-based scheduling and the background worker polling the queue. It starts the story mid-pipeline at PushNotification/PushClass, missing how notifications are triggered, evaluated per-user, and queued with scheduling delays — steps without which the central mechanism is incomplete.

**scope 入口页**（10 页打分 → 选 3）
- Push Notifications & Notification Queue `0.78`
- Registration, Setup Wizard & Password Policies `0.598`
- DDP Protocol, Realtime Streaming & Publications `0.579`

**seed 逐页种子**：
- `Push Notifications & Notification Queue`：→ `NotificationPayload` · 10 候选 — 页内 9 文件 15 候选符号中词面分最高 (0.875)
- `Registration, Setup Wizard & Password Policies`：→ `constructor` · 10 候选 — 页内 13 文件 23 候选符号中词面分最高 (0)
- `DDP Protocol, Realtime Streaming & Publications`：→ `_session` · 10 候选 — 页内 15 文件 26 候选符号中词面分最高 (0)

**walk 游走**（3 seed · 3 步）
- **NotificationPayload** · 0 步 · ⏹ 枯竭
- **constructor** · 3 步 · ⏹ 枯竭
    - R1 → `expand` · affinity 最高 0.871 (expand) vs 0.871 (down) / 0 (up)
        - ↳ 触达 418 文件 · **core 命中 2⭐**: `server/NotificationQueue.ts` `server/push.ts`
    - R2 → `expand` · affinity 最高 0.917 (expand) vs 0.693 (down) / 0.903 (up)
        - ↳ 触达 541 文件 · **core 命中 1⭐**: `lib/sendNotificationsOnMessage.ts`
    - R3 → `expand` · affinity 最高 0.846 (expand) vs 0.601 (down) / 0.502 (up)
        - ↳ 触达 201 文件 · core 命中 0
- **_session** · 0 步 · ⏹ 枯竭

**agent 实调**：0 calls — (nothing)

## new-09-realtime-streamer — How does a new message appear in real-time on the client after being saved to the database?  _[architecture]_

**对不对**：scope ✗ 选错 · 召回 5/5 答案文件 · 首次命中 core 第 2 步（seed 没够到，靠 walk）

**语义**：◐ PARTIAL — core step missing — The candidate correctly identifies notifyOnMessageChange and api.broadcast('watch.messages') but misses the critical intermediate layer — the ListenersModule that catches the broadcast and routes it through the Streamer (streamRoomMessage) to clients via DDP — which is the central mechanism connecting server broadcast to client delivery.

**scope 入口页**（10 页打分 → 选 3）
- Data Import, Export & Database Migrations `0.771`
- Room Views, Message List & Contextual Bars `0.767`
- Message Composer & Input Toolbar `0.756`

**seed 逐页种子**：
- `Data Import, Export & Database Migrations`：→ `MessageData` · 10 候选 — 页内 22 文件 41 候选符号中词面分最高 (0.908)
- `Room Views, Message List & Contextual Bars`：→ `isMessageNewDay` · 10 候选 — 页内 14 文件 22 候选符号中词面分最高 (0.866)
- `Message Composer & Input Toolbar`：→ `ChatMessages` · 10 候选 — 页内 12 文件 21 候选符号中词面分最高 (0.895)

**walk 游走**（3 seed · 3 步）
- **MessageData** · 0 步 · ⏹ 枯竭
- **isMessageNewDay** · 3 步 · ⏹ 枯竭
    - R1 → `expand` · affinity 最高 0.863 (expand) vs 0.429 (down) / 0.862 (up)
        - ↳ 触达 11 文件 · core 命中 0
    - R2 → `expand` · affinity 最高 0.962 (expand) vs 0.907 (down) / 0.962 (up)
        - ↳ 触达 1027 文件 · **core 命中 5⭐**: `lib/notifyListener.ts` `listeners/listeners.module.ts` `notifications/notifications.module.ts` `streamer/streamer.module.ts` `streamer/streamer.ts`
    - R3 → `expand` · affinity 最高 0.89 (expand) vs 0.835 (down) / 0.89 (up)
        - ↳ 触达 483 文件 · core 命中 0
- **ChatMessages** · 0 步 · ⏹ 枯竭

**agent 实调**：0 calls — (nothing)

## tour-05-msg-server — How is a message sent on the server side in Rocket.Chat?  _[call-chain]_

**对不对**：scope ✗ 选错 · 召回 3/3 答案文件 · 首次命中 core 第 2 步（seed 没够到，靠 walk）

**语义**：◐ PARTIAL — core step missing — The candidate correctly describes the core sendMessage pipeline (validate, prepare, Apps Engine hooks, persist, afterSave) but omits the DDP entry point (Meteor method executeSendMessage) and permission validation (canSendMessageAsync/validateRoomMessagePermissionsAsync), which are essential steps that gate whether sendMessage is ever called.

**scope 入口页**（10 页打分 → 选 3）
- Message Composer & Input Toolbar `0.789`
- Message Actions, Reactions & Moderation `0.78`
- Room Views, Message List & Contextual Bars `0.78`

**seed 逐页种子**：
- `Message Composer & Input Toolbar`：→ `ChatMessages` · 10 候选 — 页内 12 文件 21 候选符号中词面分最高 (0.895)
- `Message Actions, Reactions & Moderation`：→ `pinMessage` · 10 候选 — 页内 10 文件 14 候选符号中词面分最高 (0.923)
- `Room Views, Message List & Contextual Bars`：→ `isMessageNewDay` · 10 候选 — 页内 14 文件 22 候选符号中词面分最高 (0.866)

**walk 游走**（3 seed · 6 步）
- **ChatMessages** · 0 步 · ⏹ 枯竭
- **pinMessage** · 3 步 · ⏹ 枯竭
    - R1 → `expand` · affinity 最高 0.868 (expand) vs 0.863 (down) / 0.805 (up)
        - ↳ 触达 124 文件 · core 命中 0
    - R2 → `expand` · affinity 最高 0.974 (expand) vs 0.94 (down) / 0.974 (up)
        - ↳ 触达 3247 文件 · **core 命中 3⭐**: `methods/sendMessage.ts` `functions/sendMessage.ts` `functions/canSendMessage.ts`
    - R3 → `expand` · affinity 最高 0.835 (expand) vs 0.815 (down) / 0.823 (up)
        - ↳ 触达 111 文件 · core 命中 0
- **isMessageNewDay** · 3 步 · ⏹ 枯竭
    - R1 → `expand` · affinity 最高 0.863 (expand) vs 0.429 (down) / 0.862 (up)
        - ↳ 触达 11 文件 · core 命中 0
    - R2 → `expand` · affinity 最高 0.962 (expand) vs 0.907 (down) / 0.962 (up)
        - ↳ 触达 1027 文件 · **core 命中 2⭐**: `methods/sendMessage.ts` `functions/sendMessage.ts`
    - R3 → `expand` · affinity 最高 0.884 (expand) vs 0.828 (down) / 0.883 (up)
        - ↳ 触达 485 文件 · core 命中 0

**agent 实调**：0 calls — (nothing)

## claude-05-call-chain — What is the complete call chain for sendMessage?  _[call-chain]_

**对不对**：scope ✓ 选对 · 召回 5/5 答案文件 · 首次命中 core 第 2 步（seed 没够到，靠 walk）

**语义**：◐ PARTIAL — core step missing — The candidate omits the critical server-side entry points (the Meteor method in methods/sendMessage.ts calling executeSendMessage, and the REST API path in v1/chat.ts) and the permission validation step (canSendMessageAsync/validateRoomMessagePermissionsAsync) — both of which are essential steps in the central mechanism without which the pipeline does not work. The candidate jumps directly to the core sendMessage function, skipping the dispatch and authorization layers entirely.

**scope 入口页**（10 页打分 → 选 3）
- Message Composer & Input Toolbar `0.777`
- Room Views, Message List & Contextual Bars `0.776`
- Message Actions, Reactions & Moderation `0.768`

**seed 逐页种子**：
- `Message Composer & Input Toolbar`：→ `ChatMessages` · 10 候选 — 页内 12 文件 21 候选符号中词面分最高 (0.895)
- `Room Views, Message List & Contextual Bars`：→ `isMessageNewDay` · 10 候选 — 页内 14 文件 22 候选符号中词面分最高 (0.866)
- `Message Actions, Reactions & Moderation`：→ `pinMessage` · 10 候选 — 页内 10 文件 14 候选符号中词面分最高 (0.923)

**walk 游走**（3 seed · 6 步）
- **ChatMessages** · 0 步 · ⏹ 枯竭
- **isMessageNewDay** · 3 步 · ⏹ 枯竭
    - R1 → `expand` · affinity 最高 0.863 (expand) vs 0.429 (down) / 0.862 (up)
        - ↳ 触达 11 文件 · core 命中 0
    - R2 → `expand` · affinity 最高 0.962 (expand) vs 0.908 (down) / 0.962 (up)
        - ↳ 触达 1027 文件 · **core 命中 4⭐**: `flows/sendMessage.ts` `methods/sendMessage.ts` `functions/sendMessage.ts` `lib/afterSaveMessage.ts`
    - R3 → `expand` · affinity 最高 0.954 (expand) vs 0.894 (down) / 0.954 (up)
        - ↳ 触达 485 文件 · core 命中 0
- **pinMessage** · 3 步 · ⏹ 枯竭
    - R1 → `expand` · affinity 最高 0.897 (expand) vs 0.893 (down) / 0.805 (up)
        - ↳ 触达 124 文件 · core 命中 0
    - R2 → `expand` · affinity 最高 0.986 (expand) vs 0.963 (down) / 0.986 (up)
        - ↳ 触达 3247 文件 · **core 命中 5⭐**: `flows/sendMessage.ts` `methods/sendMessage.ts` `functions/sendMessage.ts` `functions/canSendMessage.ts` `lib/afterSaveMessage.ts`
    - R3 → `expand` · affinity 最高 0.874 (expand) vs 0.851 (down) / 0.847 (up)
        - ↳ 触达 111 文件 · core 命中 0

**agent 实调**：0 calls — (nothing)

## new-24-autotranslate — How does the auto-translate feature work for messages in Rocket.Chat?  _[locate]_

**对不对**：scope ✓ 选对 · 召回 4/4 答案文件 · **seed 即命中 core⭐**

**语义**：◐ PARTIAL — core step missing — The candidate correctly describes the AutoTranslate base class, provider implementations, tokenization/detokenization, and client-side display, but omits the critical integration point: TranslationProviderRegistry and the afterSaveMessage callback hook that actually triggers translation automatically for every saved message. Without this, the core mechanism of how auto-translation is wired into the message pipeline is missing.

**scope 入口页**（10 页打分 → 选 3）
- Integrations, Webhooks & Slash Commands `0.741`
- Email, Mailer & IMAP Inbox `0.709`
- Omnichannel Live Chat UI `0.603`

**seed 逐页种子**：
- `Integrations, Webhooks & Slash Commands`：→ `MsAutoTranslate` · 10 候选 — 页内 11 文件 21 候选符号中词面分最高 (0.884)
- `Email, Mailer & IMAP Inbox`：→ `EmailInbox_Outgoing` · 10 候选 — 页内 12 文件 19 候选符号中词面分最高 (0.29)
- `Omnichannel Live Chat UI`：→ `MessageForm` · 10 候选 — 页内 16 文件 29 候选符号中词面分最高 (0.908)

**walk 游走**（3 seed · 3 步）
- **MsAutoTranslate** · 0 步 · ⏹ 枯竭
- **EmailInbox_Outgoing** · 3 步 · ⏹ 枯竭
    - R1 → `expand` · affinity 最高 0.849 (expand) vs 0.849 (down) / 0 (up)
        - ↳ 触达 82 文件 · core 命中 0
    - R2 → `expand` · affinity 最高 0.919 (expand) vs 0.871 (down) / 0.919 (up)
        - ↳ 触达 352 文件 · core 命中 0
    - R3 → `expand` · affinity 最高 0.912 (expand) vs 0.886 (down) / 0.905 (up)
        - ↳ 触达 963 文件 · **core 命中 4⭐**: `server/autotranslate.ts` `server/googleTranslate.ts` `server/msTranslate.ts` `server/deeplTranslate.ts`
- **MessageForm** · 0 步 · ⏹ 枯竭

**agent 实调**：0 calls — (nothing)

## new-15-impact-aftersave — What would be impacted if the afterSaveMessage callback system were changed?  _[impact]_

**对不对**：scope ✗ 选错 · 召回 5/5 答案文件 · 首次命中 core 第 2 步（seed 没够到，靠 walk）

**语义**：✓ PASS — The candidate correctly identifies the core mechanism (afterSaveMessage in the right file, called from sendMessage/updateMessage, with callbacks for notifications, auto-translation, mentions, threads, read receipts, federation, etc.) and accurately describes the blast radius across integrations and enterprise features, matching the gold answer's essential content.

**scope 入口页**（10 页打分 → 选 3）
- Message Actions, Reactions & Moderation `0.78`
- Room Coordinator, Publications & Callbacks `0.773`
- Message Types, Threads & System Messages `0.768`

**seed 逐页种子**：
- `Message Actions, Reactions & Moderation`：→ `pinMessage` · 10 候选 — 页内 10 文件 14 候选符号中词面分最高 (0.923)
- `Room Coordinator, Publications & Callbacks`：→ `Callback` · 10 候选 — 页内 12 文件 22 候选符号中词面分最高 (1)
- `Message Types, Threads & System Messages`：→ `MessagesRaw` · 10 候选 — 页内 12 文件 17 候选符号中词面分最高 (0.908)

**walk 游走**（3 seed · 11 步）
- **pinMessage** · 3 步 · ⏹ 枯竭
    - R1 → `expand` · affinity 最高 0.874 (expand) vs 0.869 (down) / 0.805 (up)
        - ↳ 触达 124 文件 · core 命中 0
    - R2 → `expand` · affinity 最高 1 (expand) vs 0.948 (down) / 1 (up)
        - ↳ 触达 3247 文件 · **core 命中 5⭐**: `lib/afterSaveMessage.ts` `functions/sendMessage.ts` `functions/updateMessage.ts` `lib/sendNotificationsOnMessage.ts` `server/autotranslate.ts`
    - R3 → `expand` · affinity 最高 0.86 (expand) vs 0.856 (down) / 0.823 (up)
        - ↳ 触达 111 文件 · core 命中 0
- **Callback** · 8 步 · ⏹ 预算
    - R1 → `expand` · affinity 最高 0.706 (expand) vs 0 (down) / 0.706 (up)
        - ↳ 触达 14 文件 · core 命中 0
    - R2 → `expand` · affinity 最高 0.807 (expand) vs 0.807 (down) / 0 (up)
        - ↳ 触达 31 文件 · core 命中 0
    - R3 → `expand` · affinity 最高 0.806 (expand) vs 0.663 (down) / 0.805 (up)
        - ↳ 触达 847 文件 · **core 命中 1⭐**: `server/autotranslate.ts`
    - R4 → `expand` · affinity 最高 0.966 (expand) vs 0.966 (down) / 0.857 (up)
        - ↳ 触达 573 文件 · **core 命中 3⭐**: `lib/afterSaveMessage.ts` `functions/sendMessage.ts` `functions/updateMessage.ts`
    - R5 → `expand` · affinity 最高 0.889 (expand) vs 0.59 (down) / 0.889 (up)
        - ↳ 触达 213 文件 · core 命中 0
    - R6 → `expand` · affinity 最高 0.863 (expand) vs 0.853 (down) / 0.286 (up)
        - ↳ 触达 14 文件 · core 命中 0
    - R7 → `expand` · affinity 最高 0.826 (expand) vs 0.353 (down) / 0.77 (up)
        - ↳ 触达 9 文件 · core 命中 0
    - R8 → `expand` · affinity 最高 0.863 (expand) vs 0.863 (down) / 0.816 (up)
        - ↳ 触达 4 文件 · core 命中 0
- **MessagesRaw** · 0 步 · ⏹ 枯竭

**agent 实调**：0 calls — (nothing)

## new-16-impact-streamer — What is the blast radius of changing the Streamer module in Rocket.Chat?  _[impact]_

**对不对**：scope ✓ 选对 · 召回 3/3 答案文件 · 首次命中 core 第 3 步（seed 没够到，靠 walk）

**语义**：◐ PARTIAL — wrong central function — The candidate focuses on 'ee/apps/ddp-streamer/src/Streamer.ts' rather than the core 'apps/meteor/server/modules/streamer/streamer.module.ts' Streamer abstract base class, and misses the central NotificationsModule with its 17 stream instances and the ListenersModule event bridge — the two components that define the actual blast radius of the Streamer module.

**scope 入口页**（10 页打分 → 选 3）
- DDP Protocol, Realtime Streaming & Publications `0.734`
- OAuth, SAML, CAS & Social SSO Providers `0.471`
- Data Import, Export & Database Migrations `0.464`

**seed 逐页种子**：
- `DDP Protocol, Realtime Streaming & Publications`：→ `Streamer` · 10 候选 — 页内 15 文件 26 候选符号中词面分最高 (1)
- `OAuth, SAML, CAS & Social SSO Providers`：→ `addOAuthApp` · 10 候选 — 页内 16 文件 23 候选符号中词面分最高 (0)
- `Data Import, Export & Database Migrations`：→ `add` · 10 候选 — 页内 22 文件 41 候选符号中词面分最高 (0)

**walk 游走**（3 seed · 4 步）
- **Streamer** · 1 步 · ⏹ 枯竭
    - R1 → `expand` · affinity 最高 0.67 (expand) vs 0.607 (down) / 0.308 (up)
        - ↳ 触达 14 文件 · core 命中 0
- **addOAuthApp** · 0 步 · ⏹ 衰减
- **add** · 3 步 · ⏹ 衰减
    - R1 → `expand` · affinity 最高 0.463 (expand) vs 0.463 (down) / 0 (up)
        - ↳ 触达 169 文件 · core 命中 0
    - R2 → `expand` · affinity 最高 0.778 (expand) vs 0.579 (down) / 0.583 (up)
        - ↳ 触达 712 文件 · **core 命中 3⭐**: `streamer/streamer.module.ts` `notifications/notifications.module.ts` `listeners/listeners.module.ts`
    - R3 → `expand` · affinity 最高 0.883 (expand) vs 0.883 (down) / 0 (up)
        - ↳ 触达 296 文件 · core 命中 0

**agent 实调**：0 calls — (nothing)

## claude-08-federation — How are federation messages sent across different servers in Rocket.Chat?  _[routing]_

**对不对**：scope ✓ 选对 · 召回 4/4 答案文件 · 首次命中 core 第 1 步（seed 没够到，靠 walk）

**语义**：◐ PARTIAL — core step missing — The candidate only covers the inbound path (remote server sending to Rocket.Chat) and omits the outbound path entirely — FederationMatrix.sendMessage(), toExternalMessageFormat(), FederationActions hooks, and how a local user's message gets forwarded to a remote homeserver — which is the other half of the core mechanism.

**scope 入口页**（10 页打分 → 选 3）
- Matrix Federation & Cross-Server Messaging `0.538`
- Message Actions, Reactions & Moderation `0.504`
- Apps Server Integration & Bridges `0.502`

**seed 逐页种子**：
- `Matrix Federation & Cross-Server Messaging`：→ `federation` · 10 候选 — 页内 7 文件 12 候选符号中词面分最高 (1)
- `Message Actions, Reactions & Moderation`：→ `pinMessage` · 10 候选 — 页内 10 文件 14 候选符号中词面分最高 (0.923)
- `Apps Server Integration & Bridges`：→ `convertMessageFiles` · 10 候选 — 页内 9 文件 16 候选符号中词面分最高 (0.84)

**walk 游走**（3 seed · 6 步）
- **federation** · 3 步 · ⏹ 枯竭
    - R1 → `expand` · affinity 最高 0.56 (expand) vs 0.56 (down) / 0.227 (up)
        - ↳ 触达 37 文件 · **core 命中 1⭐**: `src/FederationMatrix.ts`
    - R2 → `expand` · affinity 最高 0.962 (expand) vs 0.784 (down) / 0.962 (up)
        - ↳ 触达 1883 文件 · **core 命中 2⭐**: `_matrix/transactions.ts` `events/message.ts`
    - R3 → `expand` · affinity 最高 0.901 (expand) vs 0.855 (down) / 0.901 (up)
        - ↳ 触达 287 文件 · **core 命中 1⭐**: `helpers/message.parsers.ts`
- **pinMessage** · 3 步 · ⏹ 枯竭
    - R1 → `expand` · affinity 最高 0.868 (expand) vs 0.863 (down) / 0.805 (up)
        - ↳ 触达 124 文件 · core 命中 0
    - R2 → `expand` · affinity 最高 0.986 (expand) vs 0.94 (down) / 0.986 (up)
        - ↳ 触达 3247 文件 · **core 命中 4⭐**: `src/FederationMatrix.ts` `_matrix/transactions.ts` `events/message.ts` `helpers/message.parsers.ts`
    - R3 → `expand` · affinity 最高 0.837 (expand) vs 0.832 (down) / 0.823 (up)
        - ↳ 触达 111 文件 · core 命中 0
- **convertMessageFiles** · 0 步 · ⏹ 枯竭

**agent 实调**：0 calls — (nothing)

## new-18-webhook — How does an incoming webhook get processed in Rocket.Chat?  _[routing]_

**对不对**：scope ✓ 选对 · 召回 0/4 答案文件 · ✗ core 全程没命中

**语义**：✓ PASS — The candidate correctly identifies the core mechanism: executeIntegrationRest as the entry point, script engine execution via processIncomingRequest, and processWebhookMessage for message delivery, matching the gold answer's central pipeline.

**scope 入口页**（10 页打分 → 选 3）
- Omnichannel Live Chat UI `0.445`
- Integrations, Webhooks & Slash Commands `0.386`
- Email, Mailer & IMAP Inbox `0.356`

**seed 逐页种子**：
- `Omnichannel Live Chat UI`：→ `WebhooksPage` · 10 候选 — 页内 16 文件 29 候选符号中词面分最高 (0.895)
- `Integrations, Webhooks & Slash Commands`：→ `incomingLogger` · 10 候选 — 页内 11 文件 21 候选符号中词面分最高 (0.884)
- `Email, Mailer & IMAP Inbox`：→ `api` · 10 候选 — 页内 12 文件 19 候选符号中词面分最高 (0)

**walk 游走**（3 seed · 0 步）
- **WebhooksPage** · 0 步 · ⏹ 枯竭
- **incomingLogger** · 0 步 · ⏹ 枯竭
- **api** · 0 步 · ⏹ 衰减

**agent 实调**：0 calls — (nothing)

## claude-07-api-endpoints — How are new endpoints registered in the REST API in Rocket.Chat?  _[locate]_

**对不对**：scope ✗ 选错 · 召回 1/6 答案文件 · 首次命中 core 第 1 步（seed 没够到，靠 walk）

**语义**：✓ PASS — The candidate correctly identifies the core mechanism: APIClass, createApi, the API singleton with v1/default instances, and addRoute() as the primary registration method, with correct file paths and examples — the omission of middleware chain details and Hono router internals is peripheral.

**scope 入口页**（10 页打分 → 选 3）
- Microservice Network & Authorization Service `0.543`
- Registration, Setup Wizard & Password Policies `0.519`
- Audit Log & Compliance UI `0.482`

**seed 逐页种子**：
- `Microservice Network & Authorization Service`：→ `AuthEndpoints` · 10 候选 — 页内 8 文件 11 候选符号中词面分最高 (0.895)
- `Registration, Setup Wizard & Password Policies`：→ `constructor` · 10 候选 — 页内 13 文件 23 候选符号中词面分最高 (0)
- `Audit Log & Compliance UI`：→ `AppInfoField` · 10 候选 — 页内 9 文件 18 候选符号中词面分最高 (0)

**walk 游走**（3 seed · 4 步）
- **AuthEndpoints** · 0 步 · ⏹ 枯竭
- **constructor** · 1 步 · ⏹ 衰减
    - R1 → `expand` · affinity 最高 0.848 (expand) vs 0.848 (down) / 0 (up)
        - ↳ 触达 418 文件 · **core 命中 1⭐**: `server/router.ts`
- **AppInfoField** · 3 步 · ⏹ 衰减
    - R1 → `expand` · affinity 最高 0.498 (expand) vs 0.41 (down) / 0.428 (up)
        - ↳ 触达 155 文件 · core 命中 0
    - R2 → `expand` · affinity 最高 0.533 (expand) vs 0.533 (down) / 0 (up)
        - ↳ 触达 167 文件 · core 命中 0
    - R3 → `expand` · affinity 最高 0.392 (expand) vs 0.392 (down) / 0.282 (up)
        - ↳ 触达 145 文件 · core 命中 0

**agent 实调**：0 calls — (nothing)

## new-25-search — How does message search work in Rocket.Chat?  _[locate]_

**对不对**：scope ✓ 选对 · 召回 4/4 答案文件 · **seed 即命中 core⭐**

**语义**：◐ PARTIAL — core step missing — The candidate correctly describes the messageSearch method and MongoDB query layer but entirely misses the pluggable SearchProviderService/SearchProvider/DefaultProvider architecture that is the core mechanism of message search in Rocket.Chat — the abstraction layer that coordinates providers, the DefaultProvider that delegates to messageSearch, and the extensibility for external engines like Elasticsearch.

**scope 入口页**（10 页打分 → 选 3）
- Full-Text Search Service `0.763`
- Room Coordinator, Publications & Callbacks `0.738`
- WebDAV, Nextcloud & Smarsh Connector `0.654`

**seed 逐页种子**：
- `Full-Text Search Service`：→ `messageSearch` · 10 候选 — 页内 6 文件 10 候选符号中词面分最高 (0.884)
- `Room Coordinator, Publications & Callbacks`：→ `add` · 10 候选 — 页内 12 文件 22 候选符号中词面分最高 (0)
- `WebDAV, Nextcloud & Smarsh Connector`：→ `_client` · 10 候选 — 页内 9 文件 14 候选符号中词面分最高 (0)

**walk 游走**（3 seed · 9 步）
- **messageSearch** · 4 步 · ⏹ 枯竭
    - R1 → `up` · affinity 最高 0.872 (up) vs 0.838 (expand) / 0.789 (down)
        - ↳ 触达 10 文件 · **core 命中 2⭐**: `model/SearchProvider.ts` `provider/DefaultProvider.ts`
    - R2 → `expand` · affinity 最高 0.908 (expand) vs 0.899 (down) / 0.894 (up)
        - ↳ 触达 207 文件 · core 命中 0
    - R3 → `expand` · affinity 最高 0.93 (expand) vs 0.871 (down) / 0.93 (up)
        - ↳ 触达 984 文件 · core 命中 0
    - R4 → `expand` · affinity 最高 0.895 (expand) vs 0.889 (down) / 0.857 (up)
        - ↳ 触达 490 文件 · **core 命中 1⭐**: `service/SearchProviderService.ts`
- **add** · 5 步 · ⏹ 枯竭
    - R1 → `expand` · affinity 最高 0.788 (expand) vs 0.788 (down) / 0 (up)
        - ↳ 触达 169 文件 · core 命中 0
    - R2 → `expand` · affinity 最高 0.643 (expand) vs 0.643 (down) / 0.079 (up)
        - ↳ 触达 40 文件 · core 命中 0
    - R3 → `expand` · affinity 最高 0.954 (expand) vs 0.863 (down) / 0.954 (up)
        - ↳ 触达 3275 文件 · **core 命中 3⭐**: `service/SearchProviderService.ts` `model/SearchProvider.ts` `provider/DefaultProvider.ts`
    - R4 → `expand` · affinity 最高 0.887 (expand) vs 0.862 (down) / 0.887 (up)
        - ↳ 触达 211 文件 · core 命中 0
    - R5 → `expand` · affinity 最高 0.493 (expand) vs 0.444 (down) / 0.183 (up)
        - ↳ 触达 16 文件 · core 命中 0
- **_client** · 0 步 · ⏹ 枯竭

**agent 实调**：0 calls — (nothing)

## new-27-video-conference — How does the video conference system work in Rocket.Chat?  _[locate]_

**对不对**：scope ✓ 选对 · 召回 0/6 答案文件 · ✗ core 全程没命中

**语义**：◐ PARTIAL — core step missing — The candidate describes only the client-side URL-opening flow (ConferencePage, useVideoConfOpenCall) and completely omits the core server-side mechanism: VideoConfService, conference creation/type routing, provider integration via Apps Engine, participant management, and call status tracking — without which the central mechanism does not work.

**scope 入口页**（10 页打分 → 选 3）
- Video Conferencing Service & UI `0.801`
- Invite Links, Conference Pages & Error Pages `0.779`
- Message Types, Threads & System Messages `0.643`

**seed 逐页种子**：
- `Video Conferencing Service & UI`：→ `ConferencePage` · 10 候选 — 页内 10 文件 16 候选符号中词面分最高 (0.908)
- `Invite Links, Conference Pages & Error Pages`：→ `ConferencePage` · 5 候选 — 页内 4 文件 5 候选符号中词面分最高 (0.908)
- `Message Types, Threads & System Messages`：→ `videoconf` · 10 候选 — 页内 12 文件 17 候选符号中词面分最高 (0.908)

**walk 游走**（2 seed · 0 步）
- **ConferencePage** · 0 步 · ⏹ 枯竭
- **videoconf** · 0 步 · ⏹ 枯竭

**agent 实调**：0 calls — (nothing)

## tour-06-endpoint — How do you create a new REST API endpoint in Rocket.Chat?  _[pattern]_

**对不对**：scope ✗ 选错 · 召回 5/5 答案文件 · 首次命中 core 第 1 步（seed 没够到，靠 walk）

**语义**：✓ PASS — The candidate correctly identifies the core mechanism: using API.v1/API.default instances from api.ts, calling addRoute() on an APIClass instance with path/options/handlers, and the key handler context methods (this.success, this.bodyParams, etc.). Minor omissions like the internal middleware chain details and index.ts bootstrap are peripheral.

**scope 入口页**（10 页打分 → 选 3）
- Room Views, Message List & Contextual Bars `0.733`
- Engagement, NPS Surveys & Version Checks `0.604`
- Microservice Network & Authorization Service `0.543`

**seed 逐页种子**：
- `Room Views, Message List & Contextual Bars`：→ `createDataAPI` · 10 候选 — 页内 14 文件 22 候选符号中词面分最高 (0.875)
- `Engagement, NPS Surveys & Version Checks`：→ `getNewUpdates` · 10 候选 — 页内 13 文件 23 候选符号中词面分最高 (0.851)
- `Microservice Network & Authorization Service`：→ `AuthEndpoints` · 10 候选 — 页内 8 文件 11 候选符号中词面分最高 (0.895)

**walk 游走**（3 seed · 11 步）
- **createDataAPI** · 6 步 · ⏹ 枯竭
    - R1 → `up` · affinity 最高 0.745 (up) vs 0.497 (expand) / 0.405 (down)
        - ↳ 触达 632 文件 · **core 命中 1⭐**: `server/ApiClass.ts`
    - R2 → `expand` · affinity 最高 0.929 (expand) vs 0.929 (down) / 0 (up)
        - ↳ 触达 417 文件 · **core 命中 1⭐**: `server/router.ts`
    - R3 → `expand` · affinity 最高 0.904 (expand) vs 0.887 (down) / 0.888 (up)
        - ↳ 触达 125 文件 · core 命中 0
    - R4 → `expand` · affinity 最高 0.896 (expand) vs 0.874 (down) / 0.878 (up)
        - ↳ 触达 190 文件 · **core 命中 1⭐**: `server/api.ts`
    - R5 → `expand` · affinity 最高 0.849 (expand) vs 0.739 (down) / 0.403 (up)
        - ↳ 触达 99 文件 · core 命中 0
    - R6 → `expand` · affinity 最高 0.403 (expand) vs 0.25 (down) / 0.403 (up)
        - ↳ 触达 40 文件 · core 命中 0
- **getNewUpdates** · 5 步 · ⏹ 枯竭
    - R1 → `expand` · affinity 最高 0.333 (expand) vs 0.331 (down) / 0.228 (up)
        - ↳ 触达 31 文件 · core 命中 0
    - R2 → `expand` · affinity 最高 0.93 (expand) vs 0.254 (down) / 0.93 (up)
        - ↳ 触达 1164 文件 · **core 命中 4⭐**: `server/api.ts` `server/ApiClass.ts` `middlewares/authenticationHono.ts` `middlewares/permissions.ts`
    - R3 → `expand` · affinity 最高 0.899 (expand) vs 0.874 (down) / 0.884 (up)
        - ↳ 触达 145 文件 · core 命中 0
    - R4 → `expand` · affinity 最高 0.393 (expand) vs 0.393 (down) / 0 (up)
        - ↳ 触达 34 文件 · core 命中 0
    - R5 → `expand` · affinity 最高 0.893 (expand) vs 0.17 (down) / 0.893 (up)
        - ↳ 触达 142 文件 · core 命中 0
- **AuthEndpoints** · 0 步 · ⏹ 枯竭

**agent 实调**：0 calls — (nothing)

## new-17-slash-commands — How do slash commands work in Rocket.Chat — from registration to execution?  _[pattern]_

**对不对**：scope ✗ 选错 · 召回 2/2 答案文件 · 首次命中 core 第 1 步（seed 没够到，靠 walk）

**语义**：◐ PARTIAL — wrong central function — The candidate focuses primarily on the Apps-Engine slash command manager (AppSlashCommandManager/CommandBridge) as the core registration and execution mechanism, missing the central `slashCommands` object with `add()`/`run()` in `app/utils/server/slashCommand.ts` and the Meteor method `slashCommand` that bridges client to server — these are the core mechanisms for built-in slash commands.

**scope 入口页**（10 页打分 → 选 3）
- Integrations, Webhooks & Slash Commands `0.769`
- Registration, Setup Wizard & Password Policies `0.467`
- Account Profile & Client Startup `0.45`

**seed 逐页种子**：
- `Integrations, Webhooks & Slash Commands`：→ `_allUsers` · 10 候选 — 页内 11 文件 21 候选符号中词面分最高 (0)
- `Registration, Setup Wizard & Password Policies`：→ `constructor` · 10 候选 — 页内 13 文件 23 候选符号中词面分最高 (0)
- `Account Profile & Client Startup`：→ `useAllowPasswordChange` · 10 候选 — 页内 16 文件 25 候选符号中词面分最高 (0.276)

**walk 游走**（3 seed · 3 步）
- **_allUsers** · 0 步 · ⏹ 枯竭
- **constructor** · 3 步 · ⏹ 枯竭
    - R1 → `expand` · affinity 最高 0.867 (expand) vs 0.867 (down) / 0 (up)
        - ↳ 触达 418 文件 · **core 命中 1⭐**: `flows/processSlashCommand.ts`
    - R2 → `expand` · affinity 最高 0.807 (expand) vs 0.33 (down) / 0.58 (up)
        - ↳ 触达 317 文件 · core 命中 0
    - R3 → `expand` · affinity 最高 0.708 (expand) vs 0.162 (down) / 0.547 (up)
        - ↳ 触达 15 文件 · **core 命中 1⭐**: `server/slashCommand.ts`
- **useAllowPasswordChange** · 0 步 · ⏹ 枯竭

**agent 实调**：0 calls — (nothing)

## new-11-settings — How does the Settings system work in Rocket.Chat — from registration to client-side access?  _[architecture]_

**对不对**：scope ✗ 选错 · 召回 3/3 答案文件 · 首次命中 core 第 3 步（seed 没够到，靠 walk）

**语义**：◐ PARTIAL — core step missing — The candidate covers registration, caching, and client-side React hooks but completely omits the critical propagation mechanism — the Meteor methods `public-settings/get` and `private-settings/get` — that actually transfer settings from server to client, which is a core step without which the end-to-end pipeline doesn't work.

**scope 入口页**（10 页打分 → 选 3）
- Authentication, Login & Two-Factor Auth `0.788`
- Message Actions, Reactions & Moderation `0.78`
- Account Profile & Client Startup `0.776`

**seed 逐页种子**：
- `Authentication, Login & Two-Factor Auth`：→ `AuthenticatedContext` · 10 候选 — 页内 13 文件 22 候选符号中词面分最高 (0)
- `Message Actions, Reactions & Moderation`：→ `afterDeleteRoom` · 10 候选 — 页内 10 文件 14 候选符号中词面分最高 (0)
- `Account Profile & Client Startup`：→ `AccessibilityPage` · 10 候选 — 页内 16 文件 25 候选符号中词面分最高 (0.845)

**walk 游走**（3 seed · 9 步）
- **AuthenticatedContext** · 0 步 · ⏹ 枯竭
- **afterDeleteRoom** · 4 步 · ⏹ 枯竭
    - R1 → `up` · affinity 最高 0.368 (up) vs 0.328 (expand) / 0.246 (down)
        - ↳ 触达 5 文件 · core 命中 0
    - R2 → `expand` · affinity 最高 0.45 (expand) vs 0.447 (down) / 0.247 (up)
        - ↳ 触达 123 文件 · core 命中 0
    - R3 → `expand` · affinity 最高 0.914 (expand) vs 0.884 (down) / 0.905 (up)
        - ↳ 触达 2001 文件 · **core 命中 3⭐**: `server/SettingsRegistry.ts` `server/CachedSettings.ts` `settings/index.ts`
    - R4 → `expand` · affinity 最高 0.865 (expand) vs 0.865 (down) / 0.458 (up)
        - ↳ 触达 189 文件 · core 命中 0
- **AccessibilityPage** · 5 步 · ⏹ 枯竭
    - R1 → `expand` · affinity 最高 0.805 (expand) vs 0.805 (down) / 0 (up)
        - ↳ 触达 67 文件 · **core 命中 1⭐**: `server/CachedSettings.ts`
    - R2 → `expand` · affinity 最高 0.821 (expand) vs 0.566 (down) / 0.789 (up)
        - ↳ 触达 227 文件 · core 命中 0
    - R3 → `expand` · affinity 最高 0.743 (expand) vs 0.643 (down) / 0.493 (up)
        - ↳ 触达 31 文件 · core 命中 0
    - R4 → `expand` · affinity 最高 0.767 (expand) vs 0.66 (down) / 0.506 (up)
        - ↳ 触达 10 文件 · core 命中 0
    - R5 → `expand` · affinity 最高 0.561 (expand) vs 0.343 (down) / 0.353 (up)
        - ↳ 触达 36 文件 · core 命中 0

**agent 实调**：0 calls — (nothing)

## claude-03-file-upload — What is the storage workflow for file uploads in Rocket.Chat?  _[architecture]_

**对不对**：scope ✓ 选对 · 召回 0/5 答案文件 · ✗ core 全程没命中

**语义**：◐ PARTIAL — core step missing — The candidate describes the UFS-based server-side storage pipeline well but omits the critical two-step client-server flow (POST /v1/rooms.media then POST /v1/rooms.mediaConfirm), the client-side entry point (uploadFiles()), and the confirm step that calls parseFileIntoMessageAttachments() to create message attachments — without which the central mechanism for attaching files to messages is absent.

**scope 入口页**（10 页打分 → 选 3）
- Message Actions, Reactions & Moderation `0.792`
- File Upload, UFS & Image Processing `0.776`
- Email, Mailer & IMAP Inbox `0.767`

**seed 逐页种子**：
- `Message Actions, Reactions & Moderation`：→ `afterDeleteRoom` · 10 候选 — 页内 10 文件 14 候选符号中词面分最高 (0)
- `File Upload, UFS & Image Processing`：→ `UploadFS` · 10 候选 — 页内 16 文件 28 候选符号中词面分最高 (0.941)
- `Email, Mailer & IMAP Inbox`：→ `FileAttachment` · 10 候选 — 页内 12 文件 19 候选符号中词面分最高 (0.852)

**walk 游走**（3 seed · 1 步）
- **afterDeleteRoom** · 0 步 · ⏹ 衰减
- **UploadFS** · 0 步 · ⏹ 衰减
- **FileAttachment** · 1 步 · ⏹ 衰减
    - R1 → `expand` · affinity 最高 0.827 (expand) vs 0.82 (down) / 0.46 (up)
        - ↳ 触达 95 文件 · core 命中 0

**agent 实调**：0 calls — (nothing)

## new-10-apps-engine — How does a Rocket.Chat App hook into events like afterSaveMessage via the Apps Engine?  _[architecture]_

**对不对**：scope ✗ 选错 · 召回 3/4 答案文件 · 首次命中 core 第 1 步（seed 没够到，靠 walk）

**语义**：✗ FAIL — wrong subsystem — The candidate describes the Rocket.Chat callback system (callbacks.run) as the integration point rather than the correct AppListenerManager/AppListenerBridge/executeListener pipeline, misses AppInterface enum, registerListeners, and the bridge layer entirely, and provides a largely speculative and incorrect account of how Apps Engine hooks work.

**scope 入口页**（10 页打分 → 选 3）
- Message Actions, Reactions & Moderation `0.793`
- Full-Text Search Service `0.791`
- Room Views, Message List & Contextual Bars `0.76`

**seed 逐页种子**：
- `Message Actions, Reactions & Moderation`：→ `pinMessage` · 10 候选 — 页内 10 文件 14 候选符号中词面分最高 (0.923)
- `Full-Text Search Service`：→ `messageSearch` · 10 候选 — 页内 6 文件 10 候选符号中词面分最高 (0.884)
- `Room Views, Message List & Contextual Bars`：→ `isMessageNewDay` · 10 候选 — 页内 14 文件 22 候选符号中词面分最高 (0.866)

**walk 游走**（3 seed · 9 步）
- **pinMessage** · 3 步 · ⏹ 枯竭
    - R1 → `expand` · affinity 最高 0.877 (expand) vs 0.874 (down) / 0.805 (up)
        - ↳ 触达 124 文件 · **core 命中 1⭐**: `server/AppManager.ts`
    - R2 → `expand` · affinity 最高 0.986 (expand) vs 0.94 (down) / 0.986 (up)
        - ↳ 触达 3247 文件 · **core 命中 2⭐**: `managers/AppListenerManager.ts` `bridges/listeners.ts`
    - R3 → `expand` · affinity 最高 0.849 (expand) vs 0.84 (down) / 0.833 (up)
        - ↳ 触达 111 文件 · core 命中 0
- **messageSearch** · 3 步 · ⏹ 枯竭
    - R1 → `expand` · affinity 最高 0.757 (expand) vs 0.662 (down) / 0.733 (up)
        - ↳ 触达 71 文件 · **core 命中 1⭐**: `server/AppManager.ts`
    - R2 → `expand` · affinity 最高 0.962 (expand) vs 0.897 (down) / 0.962 (up)
        - ↳ 触达 2846 文件 · **core 命中 2⭐**: `managers/AppListenerManager.ts` `bridges/listeners.ts`
    - R3 → `expand` · affinity 最高 0.885 (expand) vs 0.861 (down) / 0.877 (up)
        - ↳ 触达 142 文件 · core 命中 0
- **isMessageNewDay** · 3 步 · ⏹ 枯竭
    - R1 → `expand` · affinity 最高 0.863 (expand) vs 0.429 (down) / 0.862 (up)
        - ↳ 触达 11 文件 · core 命中 0
    - R2 → `expand` · affinity 最高 0.962 (expand) vs 0.907 (down) / 0.962 (up)
        - ↳ 触达 1027 文件 · **core 命中 3⭐**: `managers/AppListenerManager.ts` `server/AppManager.ts` `bridges/listeners.ts`
    - R3 → `expand` · affinity 最高 0.893 (expand) vs 0.85 (down) / 0.886 (up)
        - ↳ 触达 485 文件 · core 命中 0

**agent 实调**：0 calls — (nothing)

## new-20-proxify — How does the core-services proxify() pattern work for inter-service communication in Rocket.Chat?  _[locate]_

**对不对**：scope ✗ 选错 · 召回 0/3 答案文件 · ✗ core 全程没命中

**语义**：✓ PASS — The candidate correctly identifies the core mechanism: proxify() creates a Proxy with a get handler that intercepts method calls and routes them to api.call('namespace.methodName', params), which is the essential pipeline. Missing peripheral details like LocalBroker internals, ServiceClass lifecycle hooks, and Promisify type do not affect the core correctness.

**scope 入口页**（10 页打分 → 选 3）
- Livechat Embedded Widget `0.45`
- Apps Server Integration & Bridges `0.383`
- Build, CI & Release Tooling `0.371`

**seed 逐页种子**：
- `Livechat Embedded Widget`：→ `api` · 10 候选 — 页内 14 文件 27 候选符号中词面分最高 (0)
- `Apps Server Integration & Bridges`：→ `_disableAppsWithAddonsCallback` · 10 候选 — 页内 9 文件 16 候选符号中词面分最高 (0)
- `Build, CI & Release Tooling`：→ `baseConfig` · 10 候选 — 页内 8 文件 13 候选符号中词面分最高 (0)

**walk 游走**（3 seed · 0 步）
- **api** · 0 步 · ⏹ 衰减
- **_disableAppsWithAddonsCallback** · 0 步 · ⏹ 衰减
- **baseConfig** · 0 步 · ⏹ 枯竭

**agent 实调**：0 calls — (nothing)

## tour-07-db-model-create — How do you create a new database model in Rocket.Chat?  _[pattern]_

**对不对**：scope ✗ 选错 · 召回 3/5 答案文件 · 首次命中 core 第 1 步（seed 没够到，靠 walk）

**语义**：✓ PASS — The candidate correctly identifies the three-layer pattern (document interface, model class extending BaseRaw, registration/export), the BaseRaw base class, constructor requirements (Db instance, collection name, optional trash), modelIndexes override, and the proxify/export mechanism — matching the core mechanism even if it omits the model-typings interface layer and registerModel details.

**scope 入口页**（10 页打分 → 选 3）
- Room Views, Message List & Contextual Bars `0.733`
- Job Scheduling, Agenda & Queue Worker `0.665`
- Omnichannel Server Engine & Livechat Routing `0.617`

**seed 逐页种子**：
- `Room Views, Message List & Contextual Bars`：→ `createDataAPI` · 10 候选 — 页内 14 文件 22 候选符号中词面分最高 (0.875)
- `Job Scheduling, Agenda & Queue Worker`：→ `createJob` · 10 候选 — 页内 9 文件 15 候选符号中词面分最高 (0.923)
- `Omnichannel Server Engine & Livechat Routing`：→ `beforeNewRoom` · 10 候选 — 页内 11 文件 17 候选符号中词面分最高 (0.85)

**walk 游走**（3 seed · 6 步）
- **createDataAPI** · 6 步 · ⏹ 枯竭
    - R1 → `up` · affinity 最高 0.781 (up) vs 0.504 (expand) / 0.405 (down)
        - ↳ 触达 632 文件 · **core 命中 2⭐**: `models/BaseRaw.ts` `models/Messages.ts`
    - R2 → `expand` · affinity 最高 0.948 (expand) vs 0.948 (down) / 0 (up)
        - ↳ 触达 417 文件 · **core 命中 1⭐**: `IMessage/IMessage.ts`
    - R3 → `expand` · affinity 最高 0.893 (expand) vs 0.887 (down) / 0.873 (up)
        - ↳ 触达 134 文件 · core 命中 0
    - R4 → `expand` · affinity 最高 0.896 (expand) vs 0.874 (down) / 0.878 (up)
        - ↳ 触达 190 文件 · core 命中 0
    - R5 → `expand` · affinity 最高 0.849 (expand) vs 0.739 (down) / 0.403 (up)
        - ↳ 触达 99 文件 · core 命中 0
    - R6 → `expand` · affinity 最高 0.403 (expand) vs 0.25 (down) / 0.403 (up)
        - ↳ 触达 40 文件 · core 命中 0
- **createJob** · 0 步 · ⏹ 衰减
- **beforeNewRoom** · 0 步 · ⏹ 衰减

**agent 实调**：0 calls — (nothing)

## tour-08-db-model-use — How do you use a database model to query data in Rocket.Chat?  _[pattern]_

**对不对**：scope ✓ 选对 · 召回 0/3 答案文件 · ✗ core 全程没命中

**语义**：◐ PARTIAL — core step missing — The candidate correctly explains the BaseRaw layer and domain-specific model methods, but uses VideoConference as its example rather than tracing any complete end-to-end query pipeline (entry point → service function → model method → result processing), missing the essential dispatch and post-processing steps that constitute the core mechanism as illustrated by the loadHistory example in the gold answer.

**scope 入口页**（10 页打分 → 选 3）
- Video Conferencing Service & UI `0.761`
- Core Data Models & Type Definitions `0.39`
- File Upload, UFS & Image Processing `0.39`

**seed 逐页种子**：
- `Video Conferencing Service & UI`：→ `getQueryParams` · 10 候选 — 页内 10 文件 16 候选符号中词面分最高 (0.859)
- `Core Data Models & Type Definitions`：→ `$all` · 10 候选 — 页内 17 文件 31 候选符号中词面分最高 (0)
- `File Upload, UFS & Image Processing`：→ `bufferToStream` · 10 候选 — 页内 16 文件 28 候选符号中词面分最高 (0)

**walk 游走**（3 seed · 0 步）
- **getQueryParams** · 0 步 · ⏹ 衰减
- **$all** · 0 步 · ⏹ 衰减
- **bufferToStream** · 0 步 · ⏹ 衰减

**agent 实调**：0 calls — (nothing)

## tour-11-new-package — How do you create a new package in the Rocket.Chat monorepo?  _[pattern]_

**对不对**：scope ✗ 选错 · 召回 0/3 答案文件 · ✗ core 全程没命中

**语义**：✓ PASS — The candidate correctly identifies the core mechanism: creating a directory under packages/, adding a package.json with the @rocket.chat namespace, and running yarn install to link the workspace. The extra step about manually adding to root package.json workspaces array is slightly inaccurate (the glob pattern 'packages/*' typically covers all packages automatically), but the overall pipeline is correct and not misleading. Missing peripheral detail like tsconfig.json setup and consuming package wiring does not warrant a PARTIAL.

**scope 入口页**（10 页打分 → 选 3）
- Room Views, Message List & Contextual Bars `0.733`
- Engagement, NPS Surveys & Version Checks `0.604`
- Account Profile & Client Startup `0.476`

**seed 逐页种子**：
- `Room Views, Message List & Contextual Bars`：→ `createDataAPI` · 10 候选 — 页内 14 文件 22 候选符号中词面分最高 (0.875)
- `Engagement, NPS Surveys & Version Checks`：→ `getNewUpdates` · 10 候选 — 页内 13 文件 23 候选符号中词面分最高 (0.851)
- `Account Profile & Client Startup`：→ `createStyleElement` · 10 候选 — 页内 16 文件 25 候选符号中词面分最高 (0.84)

**walk 游走**（3 seed · 6 步）
- **createDataAPI** · 6 步 · ⏹ 枯竭
    - R1 → `up` · affinity 最高 0.721 (up) vs 0.492 (expand) / 0.405 (down)
        - ↳ 触达 632 文件 · core 命中 0
    - R2 → `expand` · affinity 最高 0.927 (expand) vs 0.927 (down) / 0 (up)
        - ↳ 触达 417 文件 · core 命中 0
    - R3 → `expand` · affinity 最高 0.893 (expand) vs 0.887 (down) / 0.873 (up)
        - ↳ 触达 132 文件 · core 命中 0
    - R4 → `expand` · affinity 最高 0.896 (expand) vs 0.874 (down) / 0.878 (up)
        - ↳ 触达 190 文件 · core 命中 0
    - R5 → `expand` · affinity 最高 0.849 (expand) vs 0.739 (down) / 0.403 (up)
        - ↳ 触达 98 文件 · core 命中 0
    - R6 → `expand` · affinity 最高 0.403 (expand) vs 0.25 (down) / 0.403 (up)
        - ↳ 触达 40 文件 · core 命中 0
- **getNewUpdates** · 0 步 · ⏹ 衰减
- **createStyleElement** · 0 步 · ⏹ 枯竭

**agent 实调**：0 calls — (nothing)

## tour-10-new-service — How do you add a new service in Rocket.Chat?  _[pattern]_

**对不对**：scope ✓ 选对 · 召回 0/4 答案文件 · ✗ core 全程没命中

**语义**：✓ PASS — The candidate correctly identifies the core mechanism: extending ServiceClassInternal, setting the protected name, implementing a service interface, creating the file in apps/meteor/server/services/, and registering during startup. It also correctly mentions proxify-style registration and the core-services package structure, matching the gold answer's central pipeline even if less exhaustive.

**scope 入口页**（10 页打分 → 选 3）
- Room Views, Message List & Contextual Bars `0.753`
- Engagement, NPS Surveys & Version Checks `0.501`
- Omnichannel Server Engine & Livechat Routing `0.495`

**seed 逐页种子**：
- `Room Views, Message List & Contextual Bars`：→ `isMessageNewDay` · 10 候选 — 页内 14 文件 22 候选符号中词面分最高 (0.837)
- `Engagement, NPS Surveys & Version Checks`：→ `getNewUpdates` · 10 候选 — 页内 13 文件 23 候选符号中词面分最高 (0.851)
- `Omnichannel Server Engine & Livechat Routing`：→ `beforeNewRoom` · 10 候选 — 页内 11 文件 17 候选符号中词面分最高 (0.85)

**walk 游走**（3 seed · 0 步）
- **isMessageNewDay** · 0 步 · ⏹ 衰减
- **getNewUpdates** · 0 步 · ⏹ 衰减
- **beforeNewRoom** · 0 步 · ⏹ 衰减

**agent 实调**：0 calls — (nothing)

## new-21-impact-settings — What would be affected if the CachedSettings system were changed?  _[impact]_

**对不对**：scope ✗ 选错 · 召回 0/3 答案文件 · ✗ core 全程没命中

**语义**：✗ FAIL — wrong subsystem — The candidate focuses on API middleware, CORS, and Wizard UI components as the primary dependents, missing the core truth that CachedSettings is the universal in-memory settings store used by virtually every server module (auth, messaging, omnichannel, notifications, etc.) via settings.get()/watch()/change(); the listed dependents are peripheral or unrelated to CachedSettings itself.

**scope 入口页**（10 页打分 → 选 3）
- Authentication, Login & Two-Factor Auth `0.788`
- Message Actions, Reactions & Moderation `0.78`
- Account Profile & Client Startup `0.776`

**seed 逐页种子**：
- `Authentication, Login & Two-Factor Auth`：→ `AuthenticatedContext` · 10 候选 — 页内 13 文件 22 候选符号中词面分最高 (0)
- `Message Actions, Reactions & Moderation`：→ `afterDeleteRoom` · 10 候选 — 页内 10 文件 14 候选符号中词面分最高 (0)
- `Account Profile & Client Startup`：→ `{
	registerSidebarItem: registerAccountSidebarItem,
	unregisterSidebarItem,
	getSidebarItems: getAccountSidebarItems,
	subscribeToSidebarItems: subscribeToAccountSidebarItems,
}` · 10 候选 — 页内 16 文件 25 候选符号中词面分最高 (0.215)

**walk 游走**（3 seed · 0 步）
- **AuthenticatedContext** · 0 步 · ⏹ 枯竭
- **afterDeleteRoom** · 0 步 · ⏹ 衰减
- **{
	registerSidebarItem: registerAccountSidebarItem,
	unregisterSidebarItem,
	getSidebarItems: getAccountSidebarItems,
	subscribeToSidebarItems: subscribeToAccountSidebarItems,
}** · 0 步 · ⏹ 衰减

**agent 实调**：0 calls — (nothing)

## new-22-2fa — How does two-factor authentication (2FA) work in Rocket.Chat?  _[architecture]_

**对不对**：scope ✓ 选对 · 召回 0/6 答案文件 · ✗ core 全程没命中

**语义**：✓ PASS — The candidate correctly identifies the core mechanism: twoFactorRequired decorator, checkCodeForUser orchestration, pluggable check methods (TOTP/Email/Password), remember-me via isAuthorizedForToken/rememberAuthorization, HTTP header support, and the totp-required error flow. The client-side retry loop is also correctly described. Missing only peripheral detail like the ICodeCheck interface definition and exhaustive per-step enumeration.

**scope 入口页**（10 页打分 → 选 3）
- Authentication, Login & Two-Factor Auth `0.779`
- Apps Server Integration & Bridges `0.698`
- Client SDK, API Client & Shared Utilities `0.694`

**seed 逐页种子**：
- `Authentication, Login & Two-Factor Auth`：→ `AuthenticationProvider` · 10 候选 — 页内 13 文件 22 候选符号中词面分最高 (0.866)
- `Apps Server Integration & Bridges`：→ `isNonEnterpriseTwoFactorOptions` · 10 候选 — 页内 9 文件 16 候选符号中词面分最高 (0.788)
- `Client SDK, API Client & Shared Utilities`：→ `TwoFactorMethod` · 10 候选 — 页内 13 文件 21 候选符号中词面分最高 (0.859)

**walk 游走**（3 seed · 1 步）
- **AuthenticationProvider** · 1 步 · ⏹ 衰减
    - R1 → `expand` · affinity 最高 0.668 (expand) vs 0.668 (down) / 0 (up)
        - ↳ 触达 29 文件 · core 命中 0
- **isNonEnterpriseTwoFactorOptions** · 0 步 · ⏹ 衰减
- **TwoFactorMethod** · 0 步 · ⏹ 枯竭

**agent 实调**：0 calls — (nothing)

## claude-04-e2e-encryption — How are the keys managed for end-to-end (E2E) encryption in Rocket.Chat?  _[architecture]_

**对不对**：scope ✓ 选对 · 召回 2/6 答案文件 · **seed 即命中 core⭐**

**语义**：◐ PARTIAL — core step missing — The candidate correctly describes PBKDF2-based private key encryption/decryption and the Keychain class, but omits the RSA key pair generation, the per-room AES group key system, and key distribution — all central mechanisms of E2E key management without which the system doesn't work end-to-end.

**scope 入口页**（10 页打分 → 选 3）
- End-to-End Encryption `0.789`
- Service Workers & Public Assets `0.703`
- Omnichannel Server Engine & Livechat Routing `0.393`

**seed 逐页种子**：
- `End-to-End Encryption`：→ `EncryptedKey` · 10 候选 — 页内 10 文件 15 候选符号中词面分最高 (0.856)
- `Service Workers & Public Assets`：→ `E2ERoom` · 10 候选 — 页内 10 文件 20 候选符号中词面分最高 (0.907)
- `Omnichannel Server Engine & Livechat Routing`：→ `applyDepartmentRestrictions` · 10 候选 — 页内 11 文件 17 候选符号中词面分最高 (0)

**walk 游走**（3 seed · 0 步）
- **EncryptedKey** · 0 步 · ⏹ 枯竭
- **E2ERoom** · 0 步 · ⏹ 枯竭
- **applyDepartmentRestrictions** · 0 步 · ⏹ 衰减

**agent 实调**：0 calls — (nothing)

## new-12-ldap-auth — How does LDAP authentication work in Rocket.Chat?  _[routing]_

**对不对**：scope ✗ 选错 · 召回 4/5 答案文件 · 首次命中 core 第 2 步（seed 没够到，靠 walk）

**语义**：◐ PARTIAL — core step missing — The candidate correctly identifies the login handler registration in ldap.ts but omits the critical middle layers — LDAPService.loginRequest(), LDAPManager.login(), LDAPConnection, and LDAPUserConverter — which are the actual mechanisms that make LDAP authentication work. The candidate vaguely says the handler 'uses configured settings to connect, authenticate, and synchronize' without identifying the central dispatch chain (LDAPManager.login) that orchestrates those steps.

**scope 入口页**（10 页打分 → 选 3）
- Client SDK, API Client & Shared Utilities `0.495`
- UI Contexts & React Providers `0.48`
- Authentication, Login & Two-Factor Auth `0.479`

**seed 逐页种子**：
- `Client SDK, API Client & Shared Utilities`：→ `AbacAttributeDefinitionNotFoundError` · 10 候选 — 页内 13 文件 21 候选符号中词面分最高 (0)
- `UI Contexts & React Providers`：→ `AuthenticationContext` · 10 候选 — 页内 16 文件 27 候选符号中词面分最高 (0.875)
- `Authentication, Login & Two-Factor Auth`：→ `AuthenticationProvider` · 10 候选 — 页内 13 文件 22 候选符号中词面分最高 (0.866)

**walk 游走**（3 seed · 5 步）
- **AbacAttributeDefinitionNotFoundError** · 0 步 · ⏹ 枯竭
- **AuthenticationContext** · 0 步 · ⏹ 枯竭
- **AuthenticationProvider** · 5 步 · ⏹ 枯竭
    - R1 → `expand` · affinity 最高 0.487 (expand) vs 0.487 (down) / 0 (up)
        - ↳ 触达 29 文件 · core 命中 0
    - R2 → `expand` · affinity 最高 0.759 (expand) vs 0.104 (down) / 0.759 (up)
        - ↳ 触达 758 文件 · **core 命中 2⭐**: `ldap/Connection.ts` `ldap/UserConverter.ts`
    - R3 → `expand` · affinity 最高 0.8 (expand) vs 0.8 (down) / 0 (up)
        - ↳ 触达 353 文件 · **core 命中 1⭐**: `ldap/Manager.ts`
    - R4 → `expand` · affinity 最高 0.831 (expand) vs 0.831 (down) / 0.302 (up)
        - ↳ 触达 147 文件 · **core 命中 1⭐**: `ldap/service.ts`
    - R5 → `expand` · affinity 最高 0.386 (expand) vs 0.371 (down) / 0.258 (up)
        - ↳ 触达 232 文件 · core 命中 0

**agent 实调**：0 calls — (nothing)

## claude-02-msg-permissions — Where is the logic for message permission validation located?  _[locate]_

**对不对**：scope ✗ 选错 · 召回 4/5 答案文件 · 首次命中 core 第 2 步（seed 没够到，靠 walk）

**语义**：◐ PARTIAL — core step missing — The candidate identifies canSendMessage.ts and some related files but focuses heavily on delete/update paths rather than the core send-message permission pipeline; it omits validateRoomMessagePermissionsAsync, the key checks inside it (archived, blocked, read-only, muted), and the validateMessage content-level validation in sendMessage.ts, leaving the central mechanism only partially described.

**scope 入口页**（10 页打分 → 选 3）
- Slack Bridge & External Chat Sync `0.765`
- Audit Log & Compliance UI `0.753`
- Message Types, Threads & System Messages `0.738`

**seed 逐页种子**：
- `Slack Bridge & External Chat Sync`：→ `APIClass` · 10 候选 — 页内 6 文件 11 候选符号中词面分最高 (0)
- `Audit Log & Compliance UI`：→ `findMessagesSentOrigin` · 10 候选 — 页内 9 文件 18 候选符号中词面分最高 (0.824)
- `Message Types, Threads & System Messages`：→ `MessagesRaw` · 10 候选 — 页内 12 文件 17 候选符号中词面分最高 (0.908)

**walk 游走**（3 seed · 11 步）
- **APIClass** · 3 步 · ⏹ 枯竭
    - R1 → `expand` · affinity 最高 0.392 (expand) vs 0 (down) / 0.392 (up)
        - ↳ 触达 53 文件 · core 命中 0
    - R2 → `expand` · affinity 最高 0.962 (expand) vs 0.87 (down) / 0.962 (up)
        - ↳ 触达 1694 文件 · **core 命中 2⭐**: `methods/sendMessage.ts` `functions/sendMessage.ts`
    - R3 → `expand` · affinity 最高 0.907 (expand) vs 0.872 (down) / 0.901 (up)
        - ↳ 触达 329 文件 · **core 命中 2⭐**: `functions/canAccessRoom.ts` `functions/hasPermission.ts`
- **findMessagesSentOrigin** · 8 步 · ⏹ 预算
    - R1 → `up` · affinity 最高 0.965 (up) vs 0.454 (expand) / 0.26 (down)
        - ↳ 触达 3 文件 · core 命中 0
    - R2 → `expand` · affinity 最高 0.834 (expand) vs 0.819 (down) / 0.471 (up)
        - ↳ 触达 39 文件 · core 命中 0
    - R3 → `expand` · affinity 最高 0.831 (expand) vs 0.831 (down) / 0 (up)
        - ↳ 触达 44 文件 · core 命中 0
    - R4 → `expand` · affinity 最高 0.954 (expand) vs 0.926 (down) / 0.935 (up)
        - ↳ 触达 2413 文件 · core 命中 0
    - R5 → `expand` · affinity 最高 0.889 (expand) vs 0.889 (down) / 0.439 (up)
        - ↳ 触达 326 文件 · **core 命中 4⭐**: `methods/sendMessage.ts` `functions/sendMessage.ts` `functions/canAccessRoom.ts` `functions/hasPermission.ts`
    - R6 → `expand` · affinity 最高 0.892 (expand) vs 0.481 (down) / 0.892 (up)
        - ↳ 触达 591 文件 · core 命中 0
    - R7 → `expand` · affinity 最高 0.895 (expand) vs 0.895 (down) / 0 (up)
        - ↳ 触达 265 文件 · core 命中 0
    - R8 → `expand` · affinity 最高 0.904 (expand) vs 0.804 (down) / 0.904 (up)
        - ↳ 触达 13 文件 · core 命中 0
- **MessagesRaw** · 0 步 · ⏹ 枯竭

**agent 实调**：0 calls — (nothing)

## new-14-ee-license — How does enterprise feature gating work in Rocket.Chat?  _[locate]_

**对不对**：scope ✓ 选对 · 召回 0/6 答案文件 · ✗ core 全程没命中

**语义**：✓ PASS — The candidate correctly identifies LicenseManager as the central gatekeeper, describes setLicense/validation/hasModule/isLimitReached flow, module-based gating, and event emission — matching the core mechanism even though it omits exhaustive detail on LicenseImp, replaceModules, runValidation internals, and the full event listener API.

**scope 入口页**（10 页打分 → 选 3）
- Enterprise License & Feature Gates `0.787`
- Omnichannel Server Engine & Livechat Routing `0.726`
- Apps Server Integration & Bridges `0.51`

**seed 逐页种子**：
- `Enterprise License & Feature Gates`：→ `_canEnableApp` · 10 候选 — 页内 12 文件 18 候选符号中词面分最高 (0)
- `Omnichannel Server Engine & Livechat Routing`：→ `LivechatEnterprise` · 10 候选 — 页内 11 文件 17 候选符号中词面分最高 (0.866)
- `Apps Server Integration & Bridges`：→ `isNonEnterpriseTwoFactorOptions` · 10 候选 — 页内 9 文件 16 候选符号中词面分最高 (0.801)

**walk 游走**（3 seed · 0 步）
- **_canEnableApp** · 0 步 · ⏹ 衰减
- **LivechatEnterprise** · 0 步 · ⏹ 衰减
- **isNonEnterpriseTwoFactorOptions** · 0 步 · ⏹ 衰减

**agent 实调**：0 calls — (nothing)

## new-13-room-creation — What happens when a user creates a new channel in Rocket.Chat?  _[call-chain]_

**对不对**：scope ✗ 选错 · 召回 2/2 答案文件 · 首次命中 core 第 3 步（seed 没够到，靠 walk）

**语义**：✓ PASS — The candidate correctly identifies the core mechanism: createChannelMethod entry point, permission checks, createRoom core function, DB insertion via Rooms.createWithFullRoomData, subscriptions via createUsersSubscriptions, callbacks, and Apps Engine events — all matching the gold answer's central pipeline.

**scope 入口页**（10 页打分 → 选 3）
- Room Views, Message List & Contextual Bars `0.733`
- Sidebar, Navigation & Client-Side Router `0.714`
- Home Page, Banners & Announcements `0.673`

**seed 逐页种子**：
- `Room Views, Message List & Contextual Bars`：→ `createDataAPI` · 10 候选 — 页内 14 文件 22 候选符号中词面分最高 (0.875)
- `Sidebar, Navigation & Client-Side Router`：→ `CreateChannelModal` · 10 候选 — 页内 22 文件 38 候选符号中词面分最高 (0.845)
- `Home Page, Banners & Announcements`：→ `CreateChannelsCard` · 10 候选 — 页内 12 文件 18 候选符号中词面分最高 (0.845)

**walk 游走**（3 seed · 17 步）
- **createDataAPI** · 4 步 · ⏹ 衰减
    - R1 → `up` · affinity 最高 0.755 (up) vs 0.513 (expand) / 0.422 (down)
        - ↳ 触达 632 文件 · core 命中 0
    - R2 → `expand` · affinity 最高 0.927 (expand) vs 0.927 (down) / 0 (up)
        - ↳ 触达 417 文件 · core 命中 0
    - R3 → `expand` · affinity 最高 0.915 (expand) vs 0.889 (down) / 0.898 (up)
        - ↳ 触达 124 文件 · **core 命中 2⭐**: `methods/createChannel.ts` `functions/createRoom.ts`
    - R4 → `expand` · affinity 最高 0.901 (expand) vs 0.901 (down) / 0.846 (up)
        - ↳ 触达 130 文件 · core 命中 0
- **CreateChannelModal** · 6 步 · ⏹ 枯竭
    - R1 → `expand` · affinity 最高 0.856 (expand) vs 0.85 (down) / 0.844 (up)
        - ↳ 触达 83 文件 · **core 命中 1⭐**: `methods/createChannel.ts`
    - R2 → `expand` · affinity 最高 0.877 (expand) vs 0.378 (down) / 0.853 (up)
        - ↳ 触达 117 文件 · core 命中 0
    - R3 → `expand` · affinity 最高 0.921 (expand) vs 0.895 (down) / 0.905 (up)
        - ↳ 触达 889 文件 · **core 命中 1⭐**: `functions/createRoom.ts`
    - R4 → `expand` · affinity 最高 0.914 (expand) vs 0.914 (down) / 0.639 (up)
        - ↳ 触达 360 文件 · core 命中 0
    - R5 → `expand` · affinity 最高 0.504 (expand) vs 0.169 (down) / 0.335 (up)
        - ↳ 触达 5 文件 · core 命中 0
    - R6 → `expand` · affinity 最高 0.595 (expand) vs 0 (down) / 0.595 (up)
        - ↳ 触达 11 文件 · core 命中 0
- **CreateChannelsCard** · 7 步 · ⏹ 枯竭
    - R1 → `expand` · affinity 最高 0.39 (expand) vs 0.334 (down) / 0.282 (up)
        - ↳ 触达 6 文件 · core 命中 0
    - R2 → `expand` · affinity 最高 0.855 (expand) vs 0.85 (down) / 0.507 (up)
        - ↳ 触达 96 文件 · **core 命中 1⭐**: `methods/createChannel.ts`
    - R3 → `expand` · affinity 最高 0.877 (expand) vs 0.378 (down) / 0.853 (up)
        - ↳ 触达 117 文件 · core 命中 0
    - R4 → `expand` · affinity 最高 0.921 (expand) vs 0.895 (down) / 0.905 (up)
        - ↳ 触达 886 文件 · **core 命中 1⭐**: `functions/createRoom.ts`
    - R5 → `expand` · affinity 最高 0.914 (expand) vs 0.914 (down) / 0.639 (up)
        - ↳ 触达 359 文件 · core 命中 0
    - R6 → `expand` · affinity 最高 0.504 (expand) vs 0.169 (down) / 0.335 (up)
        - ↳ 触达 5 文件 · core 命中 0
    - R7 → `expand` · affinity 最高 0.595 (expand) vs 0 (down) / 0.595 (up)
        - ↳ 触达 11 文件 · core 命中 0

**agent 实调**：0 calls — (nothing)

## new-23-omnichannel — How does the Omnichannel queue process and close a livechat conversation?  _[call-chain]_

**对不对**：scope ✓ 选对 · 召回 3/4 答案文件 · 首次命中 core 第 3 步（seed 没够到，靠 walk）

**语义**：◐ PARTIAL — core step missing — The candidate correctly describes the queue processing pipeline (OmnichannelQueue, execute, checkQueue, processWaitingQueue) but completely omits the closeRoom() transactional mechanism which is the central piece for how a livechat conversation is actually closed — missing doCloseRoom, afterRoomClosed, MongoDB transactions, and the retry logic that constitute the closure mechanism.

**scope 入口页**（10 页打分 → 选 3）
- Omnichannel Server Engine & Livechat Routing `0.766`
- Job Scheduling, Agenda & Queue Worker `0.763`
- Omnichannel Live Chat UI `0.76`

**seed 逐页种子**：
- `Omnichannel Server Engine & Livechat Routing`：→ `LivechatEnterprise` · 10 候选 — 页内 11 文件 17 候选符号中词面分最高 (0.852)
- `Job Scheduling, Agenda & Queue Worker`：→ `Agenda` · 10 候选 — 页内 9 文件 15 候选符号中词面分最高 (0)
- `Omnichannel Live Chat UI`：→ `useOmnichannelPriorities` · 10 候选 — 页内 16 文件 29 候选符号中词面分最高 (0.834)

**walk 游走**（3 seed · 10 步）
- **LivechatEnterprise** · 2 步 · ⏹ 枯竭
    - R1 → `expand` · affinity 最高 0.808 (expand) vs 0.808 (down) / 0 (up)
        - ↳ 触达 36 文件 · core 命中 0
    - R2 → `expand` · affinity 最高 0.754 (expand) vs 0.754 (down) / 0 (up)
        - ↳ 触达 24 文件 · core 命中 0
- **Agenda** · 8 步 · ⏹ 预算
    - R1 → `expand` · affinity 最高 0.792 (expand) vs 0 (down) / 0.792 (up)
        - ↳ 触达 652 文件 · **core 命中 2⭐**: `omnichannel/service.ts` `omnichannel/queue.ts`
    - R2 → `expand` · affinity 最高 0.869 (expand) vs 0.825 (down) / 0.814 (up)
        - ↳ 触达 124 文件 · core 命中 0
    - R3 → `expand` · affinity 最高 0.766 (expand) vs 0.52 (down) / 0.387 (up)
        - ↳ 触达 66 文件 · core 命中 0
    - R4 → `expand` · affinity 最高 0.835 (expand) vs 0.802 (down) / 0.789 (up)
        - ↳ 触达 300 文件 · core 命中 0
    - R5 → `expand` · affinity 最高 0.852 (expand) vs 0.296 (down) / 0.852 (up)
        - ↳ 触达 232 文件 · core 命中 0
    - R6 → `expand` · affinity 最高 0.881 (expand) vs 0 (down) / 0.881 (up)
        - ↳ 触达 135 文件 · core 命中 0
    - R7 → `expand` · affinity 最高 0.784 (expand) vs 0.492 (down) / 0.435 (up)
        - ↳ 触达 34 文件 · core 命中 0
    - R8 → `expand` · affinity 最高 0.89 (expand) vs 0.849 (down) / 0.884 (up)
        - ↳ 触达 451 文件 · **core 命中 1⭐**: `lib/closeRoom.ts`
- **useOmnichannelPriorities** · 0 步 · ⏹ 枯竭

**agent 实调**：0 calls — (nothing)

## claude-06-livechat-routing — How are Livechat requests routed to the server-side in Rocket.Chat?  _[routing]_

**对不对**：scope ✓ 选对 · 召回 8/8 答案文件 · 首次命中 core 第 4 步（seed 没够到，靠 walk）

**语义**：◐ PARTIAL — core step missing — The candidate correctly identifies RoutingManager and its role but omits the critical QueueManager.requestRoom() step that creates the inquiry record and triggers delegateInquiry — a central pipeline step without which routing cannot work — and also omits the pluggable routing strategies (AutoSelection, ManualSelection, External) that are the core of the routing mechanism.

**scope 入口页**（10 页打分 → 选 3）
- HTTP Router, REST API & Type Contracts `0.667`
- Omnichannel Live Chat UI `0.609`
- Omnichannel Server Engine & Livechat Routing `0.508`

**seed 逐页种子**：
- `HTTP Router, REST API & Type Contracts`：→ `PaginatedRequest` · 10 候选 — 页内 16 文件 27 候选符号中词面分最高 (0.859)
- `Omnichannel Live Chat UI`：→ `{
	registerSidebarItem: registerOmnichannelSidebarItem,
	unregisterSidebarItem,
	getSidebarItems: getOmnichannelSidebarItems,
	subscribeToSidebarItems: subscribeToOmnichannelSidebarItems,
}` · 10 候选 — 页内 16 文件 29 候选符号中词面分最高 (0.218)
- `Omnichannel Server Engine & Livechat Routing`：→ `LivechatEnterprise` · 10 候选 — 页内 11 文件 17 候选符号中词面分最高 (0.852)

**walk 游走**（3 seed · 11 步）
- **PaginatedRequest** · 7 步 · ⏹ 衰减
    - R1 → `expand` · affinity 最高 0.346 (expand) vs 0 (down) / 0.346 (up)
        - ↳ 触达 7 文件 · core 命中 0
    - R2 → `expand` · affinity 最高 0.72 (expand) vs 0.048 (down) / 0.72 (up)
        - ↳ 触达 228 文件 · core 命中 0
    - R3 → `expand` · affinity 最高 0.753 (expand) vs 0.339 (down) / 0.649 (up)
        - ↳ 触达 60 文件 · core 命中 0
    - R4 → `expand` · affinity 最高 0.815 (expand) vs 0.375 (down) / 0.795 (up)
        - ↳ 触达 155 文件 · **core 命中 1⭐**: `src/api.ts`
    - R5 → `expand` · affinity 最高 0.834 (expand) vs 0.453 (down) / 0.834 (up)
        - ↳ 触达 305 文件 · **core 命中 1⭐**: `src/widget.ts`
    - R6 → `expand` · affinity 最高 0.847 (expand) vs 0.091 (down) / 0.847 (up)
        - ↳ 触达 772 文件 · **core 命中 3⭐**: `routing/AutoSelection.ts` `routing/ManualSelection.ts` `routing/External.ts`
    - R7 → `expand` · affinity 最高 0.951 (expand) vs 0.951 (down) / 0.903 (up)
        - ↳ 触达 1964 文件 · **core 命中 3⭐**: `v1/room.ts` `lib/QueueManager.ts` `lib/RoutingManager.ts`
- **{
	registerSidebarItem: registerOmnichannelSidebarItem,
	unregisterSidebarItem,
	getSidebarItems: getOmnichannelSidebarItems,
	subscribeToSidebarItems: subscribeToOmnichannelSidebarItems,
}** · 0 步 · ⏹ 衰减
- **LivechatEnterprise** · 4 步 · ⏹ 枯竭
    - R1 → `expand` · affinity 最高 0.791 (expand) vs 0.791 (down) / 0 (up)
        - ↳ 触达 36 文件 · core 命中 0
    - R2 → `expand` · affinity 最高 0.941 (expand) vs 0.77 (down) / 0.941 (up)
        - ↳ 触达 2464 文件 · **core 命中 7⭐**: `src/widget.ts` `v1/room.ts` `lib/QueueManager.ts` `lib/RoutingManager.ts` `routing/AutoSelection.ts` `routing/ManualSelection.ts` `routing/External.ts`
    - R3 → `expand` · affinity 最高 0.681 (expand) vs 0.3 (down) / 0.429 (up)
        - ↳ 触达 21 文件 · core 命中 0
    - R4 → `expand` · affinity 最高 0.619 (expand) vs 0.619 (down) / 0 (up)
        - ↳ 触达 5 文件 · core 命中 0

**agent 实调**：0 calls — (nothing)

## new-26-team — How does the Team feature work in Rocket.Chat?  _[locate]_

**对不对**：scope ✗ 选错 · 召回 2/5 答案文件 · 首次命中 core 第 3 步（seed 没够到，靠 walk）

**语义**：✓ PASS — The candidate correctly identifies the core mechanism: TeamService in the right file, extending ServiceClassInternal, covering team creation, room association, membership management, and statistics — matching the essential pipeline described in the gold answer.

**scope 入口页**（10 页打分 → 选 3）
- Crypto, Random & General-Purpose Packages `0.529`
- Email, Mailer & IMAP Inbox `0.48`
- Omnichannel Server Engine & Livechat Routing `0.476`

**seed 逐页种子**：
- `Crypto, Random & General-Purpose Packages`：→ `streamToBuffer` · 10 候选 — 页内 12 文件 14 候选符号中词面分最高 (0.355)
- `Email, Mailer & IMAP Inbox`：→ `api` · 10 候选 — 页内 12 文件 19 候选符号中词面分最高 (0)
- `Omnichannel Server Engine & Livechat Routing`：→ `applyDepartmentRestrictions` · 10 候选 — 页内 11 文件 17 候选符号中词面分最高 (0)

**walk 游走**（3 seed · 6 步）
- **streamToBuffer** · 2 步 · ⏹ 枯竭
    - R1 → `expand` · affinity 最高 0.331 (expand) vs 0.276 (down) / 0.068 (up)
        - ↳ 触达 36 文件 · core 命中 0
    - R2 → `expand` · affinity 最高 0.489 (expand) vs 0 (down) / 0.489 (up)
        - ↳ 触达 284 文件 · core 命中 0
- **api** · 4 步 · ⏹ 枯竭
    - R1 → `expand` · affinity 最高 0.849 (expand) vs 0.286 (down) / 0.849 (up)
        - ↳ 触达 352 文件 · **core 命中 1⭐**: `team/service.ts`
    - R2 → `expand` · affinity 最高 0.593 (expand) vs 0.502 (down) / 0.321 (up)
        - ↳ 触达 64 文件 · **core 命中 1⭐**: `src/ITeam.ts`
    - R3 → `expand` · affinity 最高 0.755 (expand) vs 0.274 (down) / 0.755 (up)
        - ↳ 触达 110 文件 · core 命中 0
    - R4 → `expand` · affinity 最高 0.879 (expand) vs 0.87 (down) / 0.804 (up)
        - ↳ 触达 138 文件 · core 命中 0
- **applyDepartmentRestrictions** · 0 步 · ⏹ 衰减

**agent 实调**：0 calls — (nothing)
