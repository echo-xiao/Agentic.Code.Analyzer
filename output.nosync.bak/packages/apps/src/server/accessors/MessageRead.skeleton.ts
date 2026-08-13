## File: packages/apps/src/server/accessors/MessageRead.ts

```typescript
import type { IMessageRead } from '@rocket.chat/apps-engine/definition/accessors';
import type { IMessage } from '@rocket.chat/apps-engine/definition/messages';
import type { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import type { IUser } from '@rocket.chat/apps-engine/definition/users';

import type { MessageBridge } from '../bridges/MessageBridge';

export class MessageRead implements IMessageRead {
	constructor(
		private messageBridge: MessageBridge,
		private appId: string,
	) {
        /* Implementation Hidden */
    }

	public getById(id: string): Promise<IMessage> {
        /* Implementation Hidden */
    }

	public async getSenderUser(messageId: string): Promise<IUser> {
        /* Implementation Hidden */
    }

	public async getRoom(messageId: string): Promise<IRoom> {
        /* Implementation Hidden */
    }
}

```