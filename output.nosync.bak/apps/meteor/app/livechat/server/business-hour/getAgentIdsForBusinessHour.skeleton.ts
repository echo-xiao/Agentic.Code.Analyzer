## File: apps/meteor/app/livechat/server/business-hour/getAgentIdsForBusinessHour.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { LivechatDepartment, LivechatDepartmentAgents, Users } from '@rocket.chat/models';

const getAllAgentIdsWithoutDepartment = async (): Promise<string[]> => {
    /* Implementation Hidden */
};

const getAllAgentIdsWithDepartmentNotConnectedToBusinessHour = async (): Promise<string[]> => {
    /* Implementation Hidden */
};

export const getAgentIdsForBusinessHour = async (): Promise<IUser['_id'][]> => {
    /* Implementation Hidden */
};

```