## File: apps/meteor/app/livechat/server/lib/service-status.ts

```typescript
import type { ILivechatAgent, ILivechatDepartment, SelectedAgent } from '@rocket.chat/core-typings';
import { Users, LivechatDepartmentAgents, LivechatDepartment } from '@rocket.chat/models';
import type { FindCursor } from 'mongodb';

import { checkOnlineForDepartment, getOnlineForDepartment } from './departmentsLib';
import { livechatLogger } from './logger';
import { settings } from '../../../settings/server';

export async function getOnlineAgents(department?: string, agent?: SelectedAgent | null): Promise<FindCursor<ILivechatAgent> | undefined> {
    /* Implementation Hidden */
}

export async function online(department?: string, skipNoAgentSetting = false, skipFallbackCheck = false): Promise<boolean> {
    /* Implementation Hidden */
}

export async function checkOnlineAgents(department?: string, agent?: { agentId: string }, skipFallbackCheck = false): Promise<boolean> {
    /* Implementation Hidden */
}

async function countBotAgents(department?: string) {
    /* Implementation Hidden */
}

```