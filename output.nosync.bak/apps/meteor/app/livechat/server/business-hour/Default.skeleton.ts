## File: apps/meteor/app/livechat/server/business-hour/Default.ts

```typescript
import type { ILivechatBusinessHour } from '@rocket.chat/core-typings';
import { LivechatBusinessHourTypes } from '@rocket.chat/core-typings';
import moment from 'moment-timezone';

import type { IBusinessHourType } from './AbstractBusinessHour';
import { AbstractBusinessHourType } from './AbstractBusinessHour';

interface IExtraProperties {
	timezoneName?: string;
}

export class DefaultBusinessHour extends AbstractBusinessHourType implements IBusinessHourType {
	name = LivechatBusinessHourTypes.DEFAULT;

	getBusinessHour(): Promise<ILivechatBusinessHour | null> {
        /* Implementation Hidden */
    }

	async saveBusinessHour(businessHour: ILivechatBusinessHour & IExtraProperties): Promise<ILivechatBusinessHour> {
        /* Implementation Hidden */
    }

	removeBusinessHourById(): Promise<void> {
        /* Implementation Hidden */
    }
}

```