## File: apps/meteor/app/livechat/server/lib/conditionalLockAgent.ts

```typescript
import { Users } from '@rocket.chat/models';

import { hasRoleAsync } from '../../../../server/lib/authorization/hasRole';
import { settings } from '../../../settings/server';

type LockResult = {
	acquired: boolean;
	required: boolean;
	unlock: () => Promise<void>;
};

export async function conditionalLockAgent(agentId: string): Promise<LockResult> {
    /* Implementation Hidden */
}

```