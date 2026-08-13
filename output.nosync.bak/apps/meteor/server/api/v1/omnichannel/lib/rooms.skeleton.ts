## File: apps/meteor/server/api/v1/omnichannel/lib/rooms.ts

```typescript
import type { ILivechatDepartment, IOmnichannelRoom } from '@rocket.chat/core-typings';
import { LivechatRooms, LivechatDepartment } from '@rocket.chat/models';
import type { PaginatedResult } from '@rocket.chat/rest-typings';

import { callbacks } from '../../../../lib/callbacks';

export async function findRooms({
	agents,
	roomName,
	departmentId,
	open,
	createdAt,
	closedAt,
	tags,
	customFields,
	onhold,
	queued,
	units,
	query,
	options: { offset, count, fields, sort },
	callerId,
}: {
	agents?: Array<string>;
	roomName?: string;
	departmentId?: string;
	open?: boolean;
	createdAt?: {
		start?: string | undefined;
		end?: string | undefined;
	};
	closedAt?: {
		start?: string | undefined;
		end?: string | undefined;
	};
	tags?: Array<string>;
	customFields?: Record<string, string>;
	onhold?: string | boolean;
	queued?: string | boolean;
	units?: Array<string>;
	query?: Record<string, any>;
	options: { offset: number; count: number; fields: Record<string, number>; sort: Record<string, number> };
	callerId: string;
}): Promise<PaginatedResult<{ rooms: Array<IOmnichannelRoom> }>> {
    /* Implementation Hidden */
}

```