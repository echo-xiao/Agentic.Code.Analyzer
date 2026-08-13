## File: ee/packages/media-calls/src/server/getCallRoleForUser.ts

```typescript
import type { IMediaCall, IUser } from '@rocket.chat/core-typings';
import type { CallRole } from '@rocket.chat/media-signaling';

export function getCallRoleForUser(call: IMediaCall, uid: IUser['_id']): CallRole | null {
    /* Implementation Hidden */
}

```