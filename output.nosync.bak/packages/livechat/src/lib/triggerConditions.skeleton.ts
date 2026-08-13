## File: packages/livechat/src/lib/triggerConditions.ts

```typescript
import type { ILivechatTriggerCondition } from '@rocket.chat/core-typings';

import store from '../store';
import Triggers from './triggers';

export const pageUrlCondition = (condition: ILivechatTriggerCondition) => {
    /* Implementation Hidden */
};

export const timeOnSiteCondition = (condition: ILivechatTriggerCondition) => {
    /* Implementation Hidden */
};

export const chatOpenedCondition = () => {
    /* Implementation Hidden */
};

export const visitorRegisteredCondition = () => {
    /* Implementation Hidden */
};

export const conditions = {
	'page-url': pageUrlCondition,
	'time-on-site': timeOnSiteCondition,
	'chat-opened-by-visitor': chatOpenedCondition,
	'after-guest-registration': visitorRegisteredCondition,
};

```