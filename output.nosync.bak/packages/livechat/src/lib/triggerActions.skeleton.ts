## File: packages/livechat/src/lib/triggerActions.ts

```typescript
import type { ILivechatSendMessageAction, ILivechatTriggerCondition, ILivechatUseExternalServiceAction } from '@rocket.chat/core-typings';
import { route } from 'preact-router';

import store from '../store';
import { normalizeAgent } from './api';
import { parentCall } from './parentCall';
import { createToken } from './random';
import { getAgent, removeMessage, requestTriggerMessages, upsertMessage } from './triggerUtils';
import Triggers from './triggers';

export const sendMessageAction = async (_: string, action: ILivechatSendMessageAction, condition: ILivechatTriggerCondition) => {
    /* Implementation Hidden */
};

export const sendMessageExternalServiceAction = async (
	triggerId: string,
	action: ILivechatUseExternalServiceAction,
	condition: ILivechatTriggerCondition,
) => {
    /* Implementation Hidden */
};

export const actions = {
	'send-message': sendMessageAction,
	'use-external-service': sendMessageExternalServiceAction,
};

```