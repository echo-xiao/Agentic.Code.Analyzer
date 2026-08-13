## File: packages/apps/tests/test-data/bridges/messageBridge.ts

```typescript
import type { IMessage, Reaction } from '@rocket.chat/apps-engine/definition/messages';
import type { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import type { IUser } from '@rocket.chat/apps-engine/definition/users';

import { MessageBridge } from '../../../src/server/bridges';
import type { ITypingDescriptor } from '../../../src/server/bridges/MessageBridge';

export class TestsMessageBridge extends MessageBridge {
	public create(message: IMessage, appId: string): Promise<string> {
        /* Implementation Hidden */
    }

	public getById(messageId: string, appId: string): Promise<IMessage> {
        /* Implementation Hidden */
    }

	public update(message: IMessage, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public notifyUser(user: IUser, message: IMessage, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public notifyRoom(room: IRoom, message: IMessage, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public delete(message: IMessage, user: IUser, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public typing(options: ITypingDescriptor): Promise<void> {
        /* Implementation Hidden */
    }

	public addReaction(_messageId: string, _userId: string, _reaction: Reaction): Promise<void> {
        /* Implementation Hidden */
    }

	public removeReaction(_messageId: string, _userId: string, _reaction: Reaction): Promise<void> {
        /* Implementation Hidden */
    }
}

```