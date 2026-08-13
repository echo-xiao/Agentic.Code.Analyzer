## File: apps/meteor/app/livechat-enterprise/client/views/business-hours/Multiple.ts

```typescript
import type { ILivechatBusinessHour } from '@rocket.chat/core-typings';
import { LivechatBusinessHourTypes } from '@rocket.chat/core-typings';

import type { IBusinessHourBehavior } from '../../../../livechat/client/views/app/business-hours/IBusinessHourBehavior';

export class MultipleBusinessHoursBehavior implements IBusinessHourBehavior {
	getView(): string {
        /* Implementation Hidden */
    }

	showCustomTemplate(businessHourData: ILivechatBusinessHour): boolean {
        /* Implementation Hidden */
    }

	showBackButton(): boolean {
        /* Implementation Hidden */
    }
}

```