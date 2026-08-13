## File: apps/meteor/server/api/v1/omnichannel/lib/businessHours.ts

```typescript
import type { ILivechatBusinessHour } from '@rocket.chat/core-typings';

import { businessHourManager } from '../../../../../app/livechat/server/business-hour';

export async function findLivechatBusinessHour(id?: string, type?: string): Promise<Record<string, ILivechatBusinessHour>> {
    /* Implementation Hidden */
}

```