## File: apps/meteor/app/apps/server/bridges/messages.ts

```typescript
import type { IAppServerOrchestrator, IAppsMessage, IAppsUser } from '@rocket.chat/apps';
import type { ITypingDescriptor } from '@rocket.chat/apps/dist/server/bridges/MessageBridge';
import { MessageBridge } from '@rocket.chat/apps/dist/server/bridges/MessageBridge';
import type { Reaction } from '@rocket.chat/apps-engine/definition/messages';
import type { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import { api } from '@rocket.chat/core-services';
import type { IMessage } from '@rocket.chat/core-typings';
import { Users, Subscriptions } from '@rocket.chat/models';

import { deleteMessage } from '../../../../server/lib/messages/deleteMessage';
import { updateMessage } from '../../../../server/lib/messages/updateMessage';
import { executeSendMessage } from '../../../lib/server/methods/sendMessage';
import notifications from '../../../notifications/server/lib/Notifications';
import { executeSetReaction } from '../../../reactions/server/setReaction';

export class AppMessageBridge extends MessageBridge {
	constructor(private readonly orch: IAppServerOrchestrator) {
        /* Implementation Hidden */
    }

	protected async create(message: IAppsMessage, appId: string): Promise<string> {
        /* Implementation Hidden */
    }

	protected async getById(messageId: string, appId: string): Promise<IAppsMessage> {
        /* Implementation Hidden */
    }

	protected async update(message: IAppsMessage, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	protected async delete(message: IAppsMessage, user: IAppsUser, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	protected async notifyUser(user: IAppsUser, message: IAppsMessage, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	protected async notifyRoom(room: IRoom, message: IAppsMessage, appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	protected async typing({ scope, id, username, isTyping }: ITypingDescriptor): Promise<void> {
        /* Implementation Hidden */
    }

	private isValidReaction(reaction: Reaction): boolean {
        /* Implementation Hidden */
    }

	protected async addReaction(messageId: string, userId: string, reaction: Reaction): Promise<void> {
        /* Implementation Hidden */
    }

	protected async removeReaction(messageId: string, userId: string, reaction: Reaction): Promise<void> {
        /* Implementation Hidden */
    }
}

```