## File: ee/packages/omni-core-ee/src/outbound-communication/validators/canSendMessage.ts

```typescript
import { Authorization } from '@rocket.chat/core-services';
import type { ILivechatDepartment } from '@rocket.chat/core-typings';
import { LivechatDepartment, LivechatDepartmentAgents, Users } from '@rocket.chat/models';
import type { FilterOperators } from 'mongodb';

import { addQueryRestrictionsToDepartmentsModel } from '../../units/addRoleBasedRestrictionsToDepartment';

export async function validateAgentAssignPermissions(userId: string, agentId: string): Promise<void> {
    /* Implementation Hidden */
}

export async function canSendOutboundMessage(userId: string, agentId?: string, departmentId?: string): Promise<void> {
    /* Implementation Hidden */
}

```