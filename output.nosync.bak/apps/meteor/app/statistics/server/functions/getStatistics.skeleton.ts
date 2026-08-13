## File: apps/meteor/app/statistics/server/functions/getStatistics.ts

```typescript
import type { IStats } from '@rocket.chat/core-typings';
import { Statistics } from '@rocket.chat/models';
import type { FindOptions, SchemaMember } from 'mongodb';

import { hasPermissionAsync } from '../../../../server/lib/authorization/hasPermission';

type GetStatisticsParams = {
	userId: string;
	query?: Record<string, any>;
	pagination: {
		offset: number;
		count?: number;
		sort?: FindOptions<IStats>['sort'];
		fields?: SchemaMember<IStats, number | boolean>;
	};
};

type GetStatisticsReturn = { statistics: IStats[]; count: number; offset: number; total: number };

export async function getStatistics({
	userId,
	query = {},
	pagination: { offset, count, sort, fields },
}: GetStatisticsParams): Promise<GetStatisticsReturn> {
    /* Implementation Hidden */
}

```