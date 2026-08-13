## File: apps/meteor/ee/server/models/raw/ServiceLevelAgreements.ts

```typescript
import type { IOmnichannelServiceLevelAgreements } from '@rocket.chat/core-typings';
import type { IOmnichannelServiceLevelAgreementsModel } from '@rocket.chat/model-typings/src';
import { BaseRaw } from '@rocket.chat/models';
import type { Db, IndexDescription } from 'mongodb';

export class ServiceLevelAgreements extends BaseRaw<IOmnichannelServiceLevelAgreements> implements IOmnichannelServiceLevelAgreementsModel {
	constructor(db: Db) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	findDuplicate(
		_id: string | null,
		name: string,
		dueTimeInMinutes: number,
	): Promise<Pick<IOmnichannelServiceLevelAgreements, '_id'> | null> {
        /* Implementation Hidden */
    }

	findOneByIdOrName(_idOrName: string, options = {}): Promise<IOmnichannelServiceLevelAgreements | null> {
        /* Implementation Hidden */
    }

	async createOrUpdatePriority(
		{ name, description, dueTimeInMinutes }: Pick<IOmnichannelServiceLevelAgreements, 'name' | 'description' | 'dueTimeInMinutes'>,
		_id: string | null,
	): Promise<Omit<IOmnichannelServiceLevelAgreements, '_updatedAt'>> {
        /* Implementation Hidden */
    }
}

```