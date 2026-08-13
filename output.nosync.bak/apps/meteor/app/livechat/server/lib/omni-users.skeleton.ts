## File: apps/meteor/app/livechat/server/lib/omni-users.ts

```typescript
import { api } from '@rocket.chat/core-services';
import type { UserStatus, IUser } from '@rocket.chat/core-typings';
import { LivechatDepartment, LivechatDepartmentAgents, LivechatRooms, Users } from '@rocket.chat/models';
import { removeEmpty } from '@rocket.chat/tools';

import { updateDepartmentAgents } from './Helper';
import { afterAgentAdded, afterRemoveAgent } from './hooks';
import { callbacks } from '../../../../server/lib/callbacks';
import { addUserRolesAsync } from '../../../../server/lib/roles/addUserRoles';
import { removeUserFromRolesAsync } from '../../../../server/lib/roles/removeUserFromRoles';
import { settings } from '../../../settings/server';

export async function notifyAgentStatusChanged(userId: string, status?: UserStatus) {
    /* Implementation Hidden */
}

export async function addManager(username: string) {
    /* Implementation Hidden */
}

export async function addAgent(username: string) {
    /* Implementation Hidden */
}

export async function removeAgent(id: IUser['_id']) {
    /* Implementation Hidden */
}

export async function removeManager(id: IUser['_id']) {
    /* Implementation Hidden */
}

export async function saveAgentInfo(_id: string, agentData: any, agentDepartments: string[]) {
    /* Implementation Hidden */
}

```