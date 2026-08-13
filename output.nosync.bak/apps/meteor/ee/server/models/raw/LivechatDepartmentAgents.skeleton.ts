## File: apps/meteor/ee/server/models/raw/LivechatDepartmentAgents.ts

```typescript
import type { ILivechatDepartmentAgents } from '@rocket.chat/core-typings';
import { LivechatDepartmentAgentsRaw } from '@rocket.chat/models';

export class LivechatDepartmentAgents extends LivechatDepartmentAgentsRaw {
	override findAgentsByAgentIdAndBusinessHourId(agentId: string, businessHourId: string): Promise<ILivechatDepartmentAgents[]> {
        /* Implementation Hidden */
    }
}

```