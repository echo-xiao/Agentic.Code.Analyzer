## File: apps/meteor/ee/server/local-services/message-reads/service.ts

```typescript
import { ServiceClassInternal, api } from '@rocket.chat/core-services';
import { Messages, MessageReads, Subscriptions } from '@rocket.chat/models';

import { MAX_ROOM_SIZE_CHECK_INDIVIDUAL_READ_RECEIPTS } from '../../lib/constants';
import { ReadReceipt } from '../../lib/message-read-receipt/ReadReceipt';
import type { IMessageReadsService } from '../../sdk/types/IMessageReadsService';

export class MessageReadsService extends ServiceClassInternal implements IMessageReadsService {
	protected name = 'message-reads';

	async readThread(userId: string, tmid: string): Promise<void> {
        /* Implementation Hidden */
    }
}

```