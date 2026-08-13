## File: apps/meteor/app/livechat/server/lib/tracking.ts

```typescript
import { Message } from '@rocket.chat/core-services';
import { Users } from '@rocket.chat/models';

import { livechatLogger } from './logger';
import { settings } from '../../../settings/server';

type PageInfo = { title: string; location: { href: string }; change: string };

export async function savePageHistory(token: string, roomId: string | undefined, pageInfo: PageInfo) {
    /* Implementation Hidden */
}

```