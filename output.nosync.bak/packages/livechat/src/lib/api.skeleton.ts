## File: packages/livechat/src/lib/api.ts

```typescript
import type { IOmnichannelAgent, Serialized } from '@rocket.chat/core-typings';
import i18next from 'i18next';

import { getDateFnsLocale } from './locale';

export const normalizeAgent = (agentData: Serialized<IOmnichannelAgent>) =>
	agentData && { name: agentData.name, username: agentData.username, status: agentData.status };

export const normalizeQueueAlert = async (queueInfo: any) => {
    /* Implementation Hidden */
};

```