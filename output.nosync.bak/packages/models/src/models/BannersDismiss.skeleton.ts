## File: packages/models/src/models/BannersDismiss.ts

```typescript
import type { IBannerDismiss, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { IBannersDismissModel } from '@rocket.chat/model-typings';
import type { Collection, FindCursor, Db, FindOptions, IndexDescription } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class BannersDismissRaw extends BaseRaw<IBannerDismiss> implements IBannersDismissModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IBannerDismiss>>) {
        /* Implementation Hidden */
    }

	override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	findByUserIdAndBannerId(userId: string, bannerIds: string[]): FindCursor<IBannerDismiss>;

	findByUserIdAndBannerId(userId: string, bannerIds: string[], options: FindOptions<IBannerDismiss>): FindCursor<IBannerDismiss>;

	findByUserIdAndBannerId<P extends Document>(
		userId: string,
		bannerIds: string[],
		options: FindOptions<P extends IBannerDismiss ? IBannerDismiss : P>,
	): FindCursor<P>;

	findByUserIdAndBannerId<P extends Document>(
		userId: string,
		bannerIds: string[],
		options?: undefined | FindOptions<IBannerDismiss> | FindOptions<P extends IBannerDismiss ? IBannerDismiss : P>,
	): FindCursor<P> | FindCursor<IBannerDismiss> {
        /* Implementation Hidden */
    }
}

```