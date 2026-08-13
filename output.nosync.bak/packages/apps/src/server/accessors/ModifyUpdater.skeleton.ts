## File: packages/apps/src/server/accessors/ModifyUpdater.ts

```typescript
import type {
	ILivechatUpdater,
	IMessageBuilder,
	IMessageUpdater,
	IModifyUpdater,
	IRoomBuilder,
} from '@rocket.chat/apps-engine/definition/accessors';
import type { IUserUpdater } from '@rocket.chat/apps-engine/definition/accessors/IUserUpdater';
import { RocketChatAssociationModel } from '@rocket.chat/apps-engine/definition/metadata';
import { RoomType } from '@rocket.chat/apps-engine/definition/rooms';
import type { IUser } from '@rocket.chat/apps-engine/definition/users';

import { LivechatUpdater } from './LivechatUpdater';
import { MessageBuilder } from './MessageBuilder';
import { MessageUpdater } from './MessageUpdater';
import { RoomBuilder } from './RoomBuilder';
import { UserUpdater } from './UserUpdater';
import type { AppBridges } from '../bridges';
import { UIHelper } from '../misc/UIHelper';

export class ModifyUpdater implements IModifyUpdater {
	private livechatUpdater: ILivechatUpdater;

	private userUpdater: IUserUpdater;

	private messageUpdater: IMessageUpdater;

	constructor(
		private readonly bridges: AppBridges,
		private readonly appId: string,
	) {
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

	public async message(messageId: string, _updater: IUser): Promise<IMessageBuilder> {
        /* Implementation Hidden */
    }

	public async room(roomId: string, _updater: IUser): Promise<IRoomBuilder> {
        /* Implementation Hidden */
    }

	public finish(builder: IMessageBuilder | IRoomBuilder): Promise<void> {
        /* Implementation Hidden */
    }

	private _finishMessage(builder: IMessageBuilder): Promise<void> {
        /* Implementation Hidden */
    }

	private _finishRoom(builder: IRoomBuilder): Promise<void> {
        /* Implementation Hidden */
    }
}

```