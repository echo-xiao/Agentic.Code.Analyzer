## File: packages/models/src/models/NotificationQueue.ts

```typescript
import type { INotification, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { INotificationQueueModel } from '@rocket.chat/model-typings';
import type { Collection, Db, Document, IndexDescription, UpdateResult } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class NotificationQueueRaw extends BaseRaw<INotification> implements INotificationQueueModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<INotification>>) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	unsetSendingById(_id: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setErrorById(_id: string, error: any): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	clearScheduleByUserId(uid: string): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	async clearQueueByUserId(uid: string): Promise<number | undefined> {
        /* Implementation Hidden */
    }

	async findNextInQueueOrExpired(expired: Date): Promise<INotification | null> {
        /* Implementation Hidden */
    }
}

```