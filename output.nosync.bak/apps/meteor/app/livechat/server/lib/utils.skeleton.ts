## File: apps/meteor/app/livechat/server/lib/utils.ts

```typescript
import { ILivechatAgentStatus } from '@rocket.chat/core-typings';
import type { ILivechatAgent, IUser } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';
import type { Filter } from 'mongodb';

import { RoutingManager } from './RoutingManager';
import type { AKeyOf } from './localTypes';
import { callbacks } from '../../../../server/lib/callbacks';
import { notifyOnUserChange } from '../../../lib/server/lib/notifyListener';
import { businessHourManager } from '../business-hour';

export function showConnecting() {
    /* Implementation Hidden */
}

export async function setUserStatusLivechat(userId: string, status: ILivechatAgentStatus) {
    /* Implementation Hidden */
}

export async function setUserStatusLivechatIf(
	userId: string,
	status: ILivechatAgentStatus,
	condition?: Filter<IUser>,
	fields?: AKeyOf<ILivechatAgent>,
) {
    /* Implementation Hidden */
}

export async function allowAgentChangeServiceStatus(statusLivechat: ILivechatAgentStatus, agentId: string) {
    /* Implementation Hidden */
}

```