## File: packages/apps/base-runtime/src/lib/accessors/modify/ModifyUpdater.ts

```typescript
import { UIHelper } from '@rocket.chat/apps/dist/server/misc/UIHelper';
import type { ILivechatUpdater } from '@rocket.chat/apps-engine/definition/accessors/ILivechatUpdater';
import type { IMessageBuilder } from '@rocket.chat/apps-engine/definition/accessors/IMessageBuilder';
import type { IMessageUpdater } from '@rocket.chat/apps-engine/definition/accessors/IMessageUpdater';
import type { IModifyUpdater } from '@rocket.chat/apps-engine/definition/accessors/IModifyUpdater';
import type { IRoomBuilder } from '@rocket.chat/apps-engine/definition/accessors/IRoomBuilder';
import type { IUserUpdater } from '@rocket.chat/apps-engine/definition/accessors/IUserUpdater';
import type { IMessage } from '@rocket.chat/apps-engine/definition/messages/IMessage';
import { RocketChatAssociationModel } from '@rocket.chat/apps-engine/definition/metadata/RocketChatAssociations';
import type { IRoom } from '@rocket.chat/apps-engine/definition/rooms/IRoom';
import { RoomType } from '@rocket.chat/apps-engine/definition/rooms/RoomType.js';
import type { IUser } from '@rocket.chat/apps-engine/definition/users/IUser';

import { AppObjectRegistry } from '../../../AppObjectRegistry';
import type * as Messenger from '../../messenger';
import { MessageBuilder } from '../builders/MessageBuilder';
import { RoomBuilder } from '../builders/RoomBuilder';
import { formatErrorResponse } from '../formatResponseErrorHandler';

export class ModifyUpdater implements IModifyUpdater {
	private readonly livechatUpdater: ILivechatUpdater;

	private readonly userUpdater: IUserUpdater;

	private readonly messageUpdater: IMessageUpdater;

	constructor(private readonly senderFn: typeof Messenger.sendRequest) {
        /* Implementation Hidden */
    }

	private proxify<T extends ILivechatUpdater | IUserUpdater | IMessageUpdater>(
		target: 'getLivechatUpdater' | 'getUserUpdater' | 'getMessageUpdater',
	): T {
        /* Implementation Hidden */
    }

	public getLivechatUpdater(): ILivechatUpdater {
        /* Implementation Hidden */
    }

	public getUserUpdater(): IUserUpdater {
        /* Implementation Hidden */
    }

	public getMessageUpdater(): IMessageUpdater {
        /* Implementation Hidden */
    }

	public async message(messageId: string, editor: IUser): Promise<IMessageBuilder> {
        /* Implementation Hidden */
    }

	public async room(roomId: string, _updater: IUser): Promise<IRoomBuilder> {
        /* Implementation Hidden */
    }

	public finish(builder: IMessageBuilder | IRoomBuilder): Promise<void> {
        /* Implementation Hidden */
    }

	private async _finishMessage(builder: MessageBuilder): Promise<void> {
        /* Implementation Hidden */
    }

	private async _finishRoom(builder: RoomBuilder): Promise<void> {
        /* Implementation Hidden */
    }
}

```