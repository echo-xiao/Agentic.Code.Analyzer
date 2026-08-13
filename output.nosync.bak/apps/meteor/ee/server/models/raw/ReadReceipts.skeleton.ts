## File: apps/meteor/ee/server/models/raw/ReadReceipts.ts

```typescript
import type { IReadReceipt } from '@rocket.chat/core-typings';
import type { IReadReceiptsModel } from '@rocket.chat/model-typings';
import { BaseRaw } from '@rocket.chat/models';
import type { FindCursor, Db, IndexDescription, DeleteResult } from 'mongodb';

export class ReadReceiptsRaw extends BaseRaw<IReadReceipt> implements IReadReceiptsModel {
	constructor(db: Db) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	findByMessageId(messageId: string): FindCursor<IReadReceipt> {
        /* Implementation Hidden */
    }

	removeByUserId(userId: string): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	removeByRoomId(roomId: string): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	removeByRoomIds(roomIds: string[]): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	removeByMessageId(messageId: string): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	removeByMessageIds(messageIds: string[]): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	findOlderThan(date: Date): FindCursor<IReadReceipt> {
        /* Implementation Hidden */
    }
}

```