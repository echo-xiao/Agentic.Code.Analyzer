## File: packages/models/src/dummy/ReadReceipts.ts

```typescript
import type { IReadReceipt } from '@rocket.chat/core-typings';
import type { IReadReceiptsModel } from '@rocket.chat/model-typings';
import type { FindCursor, DeleteResult } from 'mongodb';

import { BaseDummy } from './BaseDummy';

export class ReadReceiptsDummy extends BaseDummy<IReadReceipt> implements IReadReceiptsModel {
	constructor() {
        /* Implementation Hidden */
    }

	findByMessageId(_messageId: string): FindCursor<IReadReceipt> {
        /* Implementation Hidden */
    }

	removeByUserId(_userId: string): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	removeByRoomId(_roomId: string): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	removeByRoomIds(_roomIds: string[]): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	removeByMessageId(_messageId: string): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	removeByMessageIds(_messageIds: string[]): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	findOlderThan(_date: Date): FindCursor<IReadReceipt> {
        /* Implementation Hidden */
    }
}

```