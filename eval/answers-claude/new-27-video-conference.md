# How does video conferencing work?

## Answer

Video conferencing in Rocket.Chat is managed by `VideoConfService`, which extends `ServiceClassInternal` and handles conference creation, participant management, call status tracking, and integration with external video providers via the Apps Engine.

### 1. VideoConfService (Service Layer)

**`apps/meteor/server/services/video-conference/service.ts`, line 68:**
```ts
export class VideoConfService extends ServiceClassInternal implements IVideoConfService {
    protected name = 'video-conference';
```

### 2. Conference Creation

**`create()` method (line 72):**
```ts
public async create(
    { type, rid, createdBy, providerName, ...data }: VideoConferenceCreateData,
    useAppUser = true,
): Promise<VideoConferenceInstructions> {
```

The creation flow:
1. **Room validation** (line 77): Looks up room by ID, projecting `t`, `uids`, `name`, `fname`.
2. **User validation** (line 85): Loads the creating user by ID.
3. **Type routing** (lines 90-103):
   - `type === 'direct'` -> `this.startDirect(providerName, user, room, data)` -- 1:1 video calls
   - `type === 'livechat'` -> `this.startLivechat(providerName, user, rid)` -- omnichannel video
   - Otherwise -> group/conference call flow

For direct calls, validates room compatibility via `isRoomCompatibleWithVideoConfRinging()` (checks room type and member count).

### 3. Conference Types

The system supports multiple conference types:

- **`IDirectVideoConference`** -- direct 1:1 calls between two users, supports ringing
- **`IGroupVideoConference`** -- group calls in channels/groups
- **`ILivechatVideoConference`** -- video calls in omnichannel rooms
- **`IVoIPVideoConference`** -- VoIP-based video calls

Type guards: `isDirectVideoConference()`, `isGroupVideoConference()`, `isLivechatVideoConference()`.

### 4. Video Conference Data Model

Conference documents are stored in the `VideoConference` collection:

```ts
interface VideoConference {
    _id: string;
    type: 'direct' | 'videoconference' | 'livechat';
    rid: string;              // room ID
    users: IVideoConferenceUser[];  // participants
    status: VideoConferenceStatus;  // started, calling, ended, etc.
    createdBy: { _id, username, name };
    createdAt: Date;
    providerName: string;     // e.g., provider from Apps
    url?: string;             // external call URL
    // ... more fields
}
```

`VideoConferenceStatus` includes: `started`, `calling`, `ended`, `declined`, `expired`.

### 5. Provider Integration (Apps Engine)

Video conferencing providers are implemented as Rocket.Chat Apps:

**`apps/meteor/server/lib/videoConfProviders.ts`:**
Manages registered video conference providers. Providers implement the `IVideoConfProvider` interface from the Apps Engine.

**Provider interaction flow:**
1. `VideoConfService` gets the provider manager via `Apps.self?.getManager()?.getVideoConfProviders()`
2. Calls provider methods: `generateUrl()`, `isFullyConfigured()`, `getCapabilities()`
3. The provider returns a URL for the video conference
4. RC stores the URL and sends it as a message/notification

### 6. Participant Management

The service handles:
- **Join** -- adds user to conference `users` array, updates participant count
- **Decline** -- marks direct call as declined
- **End** -- sets status to `ended`, calculates duration

### 7. Call Notifications

**Push notifications** for direct calls:
- Uses `Push` module and `PushNotification` for mobile alerts
- Ring notifications sent to the receiving user
- Configurable via user preferences via `getUserPreference()`

**Message-based tracking:**
- A system message is created in the room when a call starts
- The message is updated with participant count and status changes
- Uses `sendMessage()` and `Messages.updateOne()` for message management

### 8. Call Status Updates

**`notifyOnMessageChange()`:**
Used to propagate call status changes to the room in real-time.

**UiKit blocks:**
Conference messages use `UiKit` blocks for interactive UI (join button, participant list, etc.).

### 9. Statistics

**`getStatistics()`:**
Returns video conference usage stats for the admin panel:
- Total calls by type
- Active calls
- Average duration
- Provider usage

Uses `updateCounter()` from `apps/meteor/app/statistics/server/functions/updateStatsCounter.ts`.

### 10. Capabilities

**`getCapabilities()`:**
Returns provider capabilities:
```ts
interface VideoConferenceCapabilities {
    mic?: boolean;
    cam?: boolean;
    title?: boolean;
}
```

### Key Files
| File | Role |
|------|------|
| `apps/meteor/server/services/video-conference/service.ts` | `VideoConfService` -- main service with create, join, end, etc. |
| `packages/core-services/src/types/IVideoConfService.ts` | `IVideoConfService` interface definition |
| `packages/core-typings/src/VideoConference.ts` | Video conference type definitions |
| `apps/meteor/server/lib/videoConfProviders.ts` | Provider registry for video conference apps |
| `apps/meteor/server/lib/videoConfTypes.ts` | Conference type definitions and helpers |
| `apps/meteor/server/lib/isRoomCompatibleWithVideoConfRinging.ts` | Room compatibility check for ringing |
| `packages/models/src/models/VideoConference.ts` | VideoConference MongoDB model |
| `apps/meteor/app/push/server/push.ts` | Push notification integration |
| `apps/meteor/app/push-notifications/server/lib/PushNotification.ts` | Push notification helper |
| `apps/meteor/lib/videoConference/constants.ts` | Constants including `availabilityErrors` |

### Key Symbols
- `VideoConfService` -- `ServiceClassInternal`, name = `'video-conference'`
- `VideoConfService.create(data, useAppUser)` -- creates a video conference
- `VideoConfService.startDirect(providerName, user, room, data)` -- starts a direct 1:1 call
- `VideoConfService.startLivechat(providerName, user, rid)` -- starts an omnichannel call
- `VideoConferenceCreateData` -- `{ type, rid, createdBy, providerName, ...data }`
- `VideoConferenceStatus` -- enum: started, calling, ended, declined, expired
- `IDirectVideoConference` / `IGroupVideoConference` / `ILivechatVideoConference` -- conference types
- `VideoConferenceCapabilities` -- `{ mic?, cam?, title? }`
- `videoConfProviders` -- provider registry
- `videoConfTypes` -- conference type definitions
- `isRoomCompatibleWithVideoConfRinging()` -- checks if a room supports call ringing
