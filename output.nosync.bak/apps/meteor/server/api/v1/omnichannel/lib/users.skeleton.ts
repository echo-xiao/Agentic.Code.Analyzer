## File: apps/meteor/server/api/v1/omnichannel/lib/users.ts

```typescript
import type { ILivechatAgent, IRole } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import type { FilterOperators } from 'mongodb';

/**
 * @param {IRole['_id']} role the role id
 * @param {string} text
 * @param {any} pagination
 */
async function findUsers({
	role,
	text,
	onlyAvailable = false,
	excludeId,
	showIdleAgents = true,
	pagination: { offset, count, sort },
}: {
	role: IRole['_id'];
	text?: string;
	onlyAvailable?: boolean;
	excludeId?: string;
	showIdleAgents?: boolean;
	pagination: { offset: number; count: number; sort: any };
}): Promise<{ users: ILivechatAgent[]; count: number; offset: number; total: number }> {
    /* Implementation Hidden */
}
export async function findAgents({
	text,
	onlyAvailable = false,
	excludeId,
	showIdleAgents = true,
	pagination: { offset, count, sort },
}: {
	text?: string;
	onlyAvailable: boolean;
	excludeId?: string;
	showIdleAgents?: boolean;
	pagination: { offset: number; count: number; sort: any };
}): Promise<ReturnType<typeof findUsers>> {
    /* Implementation Hidden */
}

export async function findManagers({
	text,
	pagination: { offset, count, sort },
}: {
	text?: string;
	pagination: { offset: number; count: number; sort: any };
}): Promise<ReturnType<typeof findUsers>> {
    /* Implementation Hidden */
}

```