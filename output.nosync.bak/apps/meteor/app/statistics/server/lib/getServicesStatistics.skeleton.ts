## File: apps/meteor/app/statistics/server/lib/getServicesStatistics.ts

```typescript
import { Users } from '@rocket.chat/models';
import { MongoInternals } from 'meteor/mongo';

import { readSecondaryPreferred } from '../../../../server/database/readSecondaryPreferred';
import { settings } from '../../../settings/server';

const { db } = MongoInternals.defaultRemoteCollectionDriver().mongo;

async function getCustomOAuthServices(): Promise<
	Record<
		string,
		{
			enabled: boolean;
			mergeRoles: boolean;
			users: number;
		}
	>
> {
    /* Implementation Hidden */
}

export async function getServicesStatistics(): Promise<Record<string, unknown>> {
    /* Implementation Hidden */
}

```