## File: apps/meteor/server/api/v1/omnichannel/lib/triggers.ts

```typescript
import type { ILivechatTrigger } from '@rocket.chat/core-typings';
import { LivechatTrigger } from '@rocket.chat/models';
import type { PaginatedResult } from '@rocket.chat/rest-typings';

export async function findTriggers({
	pagination: { offset, count, sort },
}: {
	pagination: { offset: number; count: number; sort: Record<string, number> };
}): Promise<PaginatedResult<{ triggers: Array<ILivechatTrigger> }>> {
    /* Implementation Hidden */
}

export async function findTriggerById({ triggerId }: { triggerId: string }): Promise<ILivechatTrigger | null> {
    /* Implementation Hidden */
}

export async function deleteTrigger({ triggerId }: { triggerId: string }): Promise<void> {
    /* Implementation Hidden */
}

```