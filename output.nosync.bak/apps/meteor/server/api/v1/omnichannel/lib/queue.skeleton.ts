## File: apps/meteor/server/api/v1/omnichannel/lib/queue.ts

```typescript
import { LivechatRooms } from '@rocket.chat/models';
import type { PaginatedResult } from '@rocket.chat/rest-typings';

export async function findQueueMetrics({
	agentId,
	includeOfflineAgents,
	departmentId,
	pagination: { offset, count, sort },
}: {
	agentId?: string;
	includeOfflineAgents?: boolean;
	departmentId?: string;
	pagination: { offset: number; count: number; sort: Record<string, number> };
}): Promise<
	PaginatedResult<{
		queue: Array<{
			_id: string;
			user: { _id: string; userId: string; username: string; status: string };
			department: { _id: string; name: string };
			chats: number;
		}>;
	}>
> {
    /* Implementation Hidden */
}

```