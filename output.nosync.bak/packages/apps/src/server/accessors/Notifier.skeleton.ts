## File: packages/apps/src/server/accessors/Notifier.ts

```typescript
import type { IMessageBuilder, INotifier } from '@rocket.chat/apps-engine/definition/accessors';
import type { ITypingOptions } from '@rocket.chat/apps-engine/definition/accessors/INotifier';
import { TypingScope } from '@rocket.chat/apps-engine/definition/accessors/INotifier';
import type { IMessage } from '@rocket.chat/apps-engine/definition/messages';
import type { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import type { IUser } from '@rocket.chat/apps-engine/definition/users';

import type { MessageBridge, UserBridge } from '../bridges';
import { MessageBuilder } from './MessageBuilder';

export class Notifier implements INotifier {
	constructor(
		private readonly userBridge: UserBridge,
		private readonly msgBridge: MessageBridge,
		private readonly appId: string,
	) {
        /* Implementation Hidden */
    }

	public async notifyUser(user: IUser, message: IMessage): Promise<void> {
        /* Implementation Hidden */
    }

	public async notifyRoom(room: IRoom, message: IMessage): Promise<void> {
        /* Implementation Hidden */
    }

	public async typing(options: ITypingOptions): Promise<() => Promise<void>> {
        /* Implementation Hidden */
    }

	public getMessageBuilder(): IMessageBuilder {
        /* Implementation Hidden */
    }
}

```