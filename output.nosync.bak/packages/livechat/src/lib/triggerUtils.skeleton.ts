## File: packages/livechat/src/lib/triggerUtils.ts

```typescript
import type { ILivechatAgent, ILivechatTrigger, ILivechatTriggerAction, ILivechatTriggerType, Serialized } from '@rocket.chat/core-typings';

import { Livechat } from '../api';
import { processUnread } from './main';
import type { Agent } from '../definitions/agents';
import { upsert } from '../helpers/upsert';
import store from '../store';

type AgentPromise = { username: string } | Serialized<ILivechatAgent> | null;

let agentPromise: Promise<AgentPromise> | null = null;

const agentCacheExpiry = 3600000;

const isAgentWithInfo = (agent: any): agent is Serialized<ILivechatAgent> => !agent.hiddenInfo;

const getNextAgentFromQueue = async () => {
    /* Implementation Hidden */
};

export const getAgent = async (triggerAction: ILivechatTriggerAction): Promise<AgentPromise> => {
    /* Implementation Hidden */
};

export const upsertMessage = async (message: Record<string, unknown>) => {
    /* Implementation Hidden */
};

export const removeMessage = async (messageId: string) => {
    /* Implementation Hidden */
};

export const removeTriggerMessage = async (messageId: string) => {
    /* Implementation Hidden */
};

export const hasTriggerCondition = (conditionName: ILivechatTriggerType) => (trigger: ILivechatTrigger) => {
	return trigger.conditions.some((condition) => condition.name === conditionName);
};

export const isInIframe = () => window.self !== window.top;

export const requestTriggerMessages = async ({
	triggerId,
	token,
	metadata = {},
	fallbackMessage,
}: {
	triggerId: string;
	token: string;
	metadata: Record<string, string>;
	fallbackMessage?: string;
}) => {
    /* Implementation Hidden */
};

```