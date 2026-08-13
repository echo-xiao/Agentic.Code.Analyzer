## File: apps/meteor/ee/app/livechat-enterprise/server/hooks/manageDepartmentUnit.ts

```typescript
import type { ILivechatDepartment } from '@rocket.chat/core-typings';
import { LivechatDepartment, LivechatUnit } from '@rocket.chat/models';
import { getUnitsFromUser } from '@rocket.chat/omni-core-ee';

import { hasAnyRoleAsync } from '../../../../../server/lib/authorization/hasRole';
import { callbacks } from '../../../../../server/lib/callbacks';

export const manageDepartmentUnit = async ({ userId, departmentId, unitId }: { userId: string; departmentId: string; unitId: string }) => {
    /* Implementation Hidden */
};

callbacks.add('livechat.manageDepartmentUnit', manageDepartmentUnit, callbacks.priority.HIGH, 'livechat-manage-department-unit');

```