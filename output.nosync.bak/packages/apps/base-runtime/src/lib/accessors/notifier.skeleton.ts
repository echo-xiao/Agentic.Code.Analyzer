## File: packages/apps/base-runtime/src/lib/accessors/notifier.ts

```typescript
import type { IMessageBuilder, INotifier } from '@rocket.chat/apps-engine/definition/accessors';
import type { ITypingOptions } from '@rocket.chat/apps-engine/definition/accessors/INotifier';
import { TypingScope } from '@rocket.chat/apps-engine/definition/accessors/INotifier';
import type { IMessage } from '@rocket.chat/apps-engine/definition/messages';
import type { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import type { IUser } from '@rocket.chat/apps-engine/definition/users';

import { MessageBuilder } from './builders/MessageBuilder';
import { AppObjectRegistry } from '../../AppObjectRegistry';
import type * as Messenger from '../messenger';
import { formatErrorResponse } from './formatResponseErrorHandler';

export class Notifier implements INotifier {
	private senderFn: typeof Messenger.sendRequest;

	constructor(senderFn: typeof Messenger.sendRequest) {
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

	private async callMessageBridge(method: string, params: Array<unknown>): Promise<void> {
        /* Implementation Hidden */
    }

	private async getAppUser(): Promise<IUser | undefined> {
        /* Implementation Hidden */
    }
}

```