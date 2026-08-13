## File: apps/meteor/ee/server/api/v1/omnichannel/lib/units.ts

```typescript
import type { IOmnichannelBusinessUnit, ILivechatUnitMonitor } from '@rocket.chat/core-typings';
import { LivechatUnitMonitors, LivechatUnit } from '@rocket.chat/models';
import { getUnitsFromUser } from '@rocket.chat/omni-core-ee';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import type { FindOptions } from 'mongodb';

export async function findUnitsOfUser({
	text,
	userId,
	pagination: { offset, count, sort },
}: {
	text?: string;
	userId: string;
	pagination: {
		offset: number;
		count: number;
		sort: FindOptions<IOmnichannelBusinessUnit>['sort'];
	};
}): Promise<{
	units: IOmnichannelBusinessUnit[];
	count: number;
	offset: number;
	total: number;
}> {
    /* Implementation Hidden */
}

export async function findUnits({
	text,
	pagination: { offset, count, sort },
}: {
	text?: string;
	pagination: {
		offset: number;
		count: number;
		sort: FindOptions<IOmnichannelBusinessUnit>['sort'];
	};
}): Promise<{
	units: IOmnichannelBusinessUnit[];
	count: number;
	offset: number;
	total: number;
}> {
    /* Implementation Hidden */
}

export async function findUnitMonitors({ unitId }: { unitId: string }): Promise<ILivechatUnitMonitor[]> {
    /* Implementation Hidden */
}

export async function findUnitById({ unitId, userId }: { unitId: string; userId: string }): Promise<IOmnichannelBusinessUnit | null> {
    /* Implementation Hidden */
}

```