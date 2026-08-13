## File: apps/meteor/server/lib/moderation/reportMessage.ts

```typescript
import { Apps, AppEvents } from '@rocket.chat/apps';
import type { IMessage, IUser } from '@rocket.chat/core-typings';
import { Messages, ModerationReports, Rooms, Users } from '@rocket.chat/models';

import { canAccessRoomAsync } from '../authorization/canAccessRoom';

export const reportMessage = async (messageId: IMessage['_id'], description: string, uid: IUser['_id']) => {
    /* Implementation Hidden */
};

```