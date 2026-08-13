## File: packages/models/src/models/Banners.ts

```typescript
import type { IBanner, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import { BannerPlatform } from '@rocket.chat/core-typings';
import type { IBannersModel } from '@rocket.chat/model-typings';
import type { Collection, FindCursor, Db, FindOptions, IndexDescription, InsertOneResult, UpdateResult } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class BannersRaw extends BaseRaw<IBanner> implements IBannersModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IBanner>>) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	create(doc: IBanner): Promise<InsertOneResult<IBanner>> {
        /* Implementation Hidden */
    }

	findActiveByRoleOrId(roles: string[], platform: BannerPlatform, bannerId?: string, options?: FindOptions<IBanner>): FindCursor<IBanner> {
        /* Implementation Hidden */
    }

	disable(bannerId: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	createOrUpdate(banner: IBanner): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	findByIds(bannerIds: string[]): FindCursor<IBanner> {
        /* Implementation Hidden */
    }
}

```