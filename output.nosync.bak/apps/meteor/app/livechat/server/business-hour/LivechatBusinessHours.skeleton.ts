## File: apps/meteor/app/livechat/server/business-hour/LivechatBusinessHours.ts

```typescript
import type { ILivechatBusinessHour } from '@rocket.chat/core-typings';
import { LivechatBusinessHourTypes } from '@rocket.chat/core-typings';
import moment from 'moment-timezone';
import { ObjectId } from 'mongodb';

export const createDefaultBusinessHourRow = (): Omit<ILivechatBusinessHour, '_updatedAt'> => {
    /* Implementation Hidden */
};

```