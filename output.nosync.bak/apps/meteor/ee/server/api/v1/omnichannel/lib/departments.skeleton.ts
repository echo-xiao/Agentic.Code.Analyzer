## File: apps/meteor/ee/server/api/v1/omnichannel/lib/departments.ts

```typescript
import { LivechatDepartment, LivechatDepartmentAgents, LivechatUnit } from '@rocket.chat/models';

import { helperLogger } from '../../../../../app/livechat-enterprise/server/lib/logger';

export const getDepartmentsWhichUserCanAccess = async (userId: string, includeDisabled = false): Promise<string[]> => {
    /* Implementation Hidden */
};

export const hasAccessToDepartment = async (userId: string, departmentId: string): Promise<boolean> => {
    /* Implementation Hidden */
};

```