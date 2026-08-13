## File: apps/meteor/server/api/v1/omnichannel/lib/agents.ts

```typescript
import type { ILivechatDepartmentAgents } from '@rocket.chat/core-typings';
import { LivechatDepartmentAgents } from '@rocket.chat/models';

export async function findAgentDepartments({
	enabledDepartmentsOnly,
	agentId,
}: {
	enabledDepartmentsOnly?: boolean;
	agentId: string;
}): Promise<{ departments: (ILivechatDepartmentAgents & { departmentName: string })[] }> {
    /* Implementation Hidden */
}

```