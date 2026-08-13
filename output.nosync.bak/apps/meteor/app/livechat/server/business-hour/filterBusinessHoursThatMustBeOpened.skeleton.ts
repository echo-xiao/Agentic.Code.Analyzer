## File: apps/meteor/app/livechat/server/business-hour/filterBusinessHoursThatMustBeOpened.ts

```typescript
import type { ILivechatBusinessHour } from '@rocket.chat/core-typings';
import moment from 'moment';

export const filterBusinessHoursThatMustBeOpened = async (
	businessHours: Omit<ILivechatBusinessHour, '_updatedAt'>[],
): Promise<Pick<ILivechatBusinessHour, '_id' | 'type'>[]> => {
    /* Implementation Hidden */
};

```