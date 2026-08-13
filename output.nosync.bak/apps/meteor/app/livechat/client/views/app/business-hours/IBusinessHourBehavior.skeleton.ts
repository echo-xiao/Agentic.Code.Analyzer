## File: apps/meteor/app/livechat/client/views/app/business-hours/IBusinessHourBehavior.ts

```typescript
import type { ILivechatBusinessHour } from '@rocket.chat/core-typings';

export interface IBusinessHourBehavior {
	getView(): string;
	showCustomTemplate(businessHourData: ILivechatBusinessHour): boolean;
	showBackButton(): boolean;
}

```