## File: packages/models/src/models/OAuthApps.ts

```typescript
import type { IOAuthApps, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { IOAuthAppsModel } from '@rocket.chat/model-typings';
import type { Db, Collection, FindOptions, IndexDescription } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class OAuthAppsRaw extends BaseRaw<IOAuthApps> implements IOAuthAppsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IOAuthApps>>) {
        /* Implementation Hidden */
    }

	override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	findOneAuthAppByIdOrClientId(
		props: { clientId: string } | { appId: string } | { _id: string },
		options?: FindOptions<IOAuthApps>,
	): Promise<IOAuthApps | null> {
        /* Implementation Hidden */
    }

	findOneActiveByClientId(clientId: string, options?: FindOptions<IOAuthApps>): Promise<IOAuthApps | null> {
        /* Implementation Hidden */
    }

	updateById(
		_id: IOAuthApps['_id'],
		data: Partial<Pick<IOAuthApps, 'name' | 'active' | 'redirectUri' | '_updatedBy'>>,
	): Promise<IOAuthApps | null> {
        /* Implementation Hidden */
    }

	findOneActiveByClientIdAndClientSecret(
		clientId: string,
		clientSecret: string,
		options?: FindOptions<IOAuthApps>,
	): Promise<IOAuthApps | null> {
        /* Implementation Hidden */
    }
}

```