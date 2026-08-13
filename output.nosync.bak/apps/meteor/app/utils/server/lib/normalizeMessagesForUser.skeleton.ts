## File: apps/meteor/app/utils/server/lib/normalizeMessagesForUser.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';

import { settings } from '../../../settings/server';

const filterStarred = <T extends IMessage = IMessage>(message: T, uid?: string): T => {
    /* Implementation Hidden */
};

// TODO: we should let clients get user names on demand instead of doing this

function getNameOfUsername(users: Map<string, string>, username: string): string {
    /* Implementation Hidden */
}

export const normalizeMessagesForUser = async <T extends IMessage = IMessage>(messages: T[], uid?: string): Promise<T[]> => {
    /* Implementation Hidden */
};

```