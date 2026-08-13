## File: apps/meteor/ee/server/api/v1/omnichannel/lib/monitors.ts

```typescript
import type { ILivechatMonitor, IUser } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';
import type { PaginatedResult } from '@rocket.chat/rest-typings';
import { escapeRegExp } from '@rocket.chat/string-helpers';

export async function findMonitors({
	text,
	pagination: { offset, count, sort },
}: {
	text?: string;
	pagination: {
		offset: number;
		count: number;
		sort: {
			[key: string]: 1 | -1;
		};
	};
}): Promise<PaginatedResult<{ monitors: ILivechatMonitor[] }>> {
    /* Implementation Hidden */
}

export async function findMonitorByUsername({ username }: { username: string }): Promise<IUser> {
    /* Implementation Hidden */
}

```