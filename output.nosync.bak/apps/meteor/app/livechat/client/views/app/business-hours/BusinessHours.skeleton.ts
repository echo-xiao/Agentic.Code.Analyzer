## File: apps/meteor/app/livechat/client/views/app/business-hours/BusinessHours.ts

```typescript
import type { ILivechatBusinessHour } from '@rocket.chat/core-typings';

import type { IBusinessHourBehavior } from './IBusinessHourBehavior';
import { SingleBusinessHourBehavior } from './Single';

class BusinessHoursManager {
	private behavior: IBusinessHourBehavior;

	constructor(businessHour: IBusinessHourBehavior) {
        /* Implementation Hidden */
    }

	setBusinessHourBehavior(businessHour: IBusinessHourBehavior): void {
        /* Implementation Hidden */
    }

	registerBusinessHourBehavior(behavior: IBusinessHourBehavior): void {
        /* Implementation Hidden */
    }

	getTemplate(): string {
        /* Implementation Hidden */
    }

	showCustomTemplate(businessHourData: ILivechatBusinessHour): boolean {
        /* Implementation Hidden */
    }

	showBackButton(): boolean {
        /* Implementation Hidden */
    }
}

export const businessHourManager = new BusinessHoursManager(new SingleBusinessHourBehavior());

```