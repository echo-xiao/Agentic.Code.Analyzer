## File: packages/apps/base-runtime/src/lib/accessors/modify/ModifyCreator.ts

```typescript
import { randomBytes } from 'node:crypto';

import { UIHelper } from '@rocket.chat/apps/dist/server/misc/UIHelper';
import type { IContactCreator } from '@rocket.chat/apps-engine/definition/accessors/IContactCreator';
import type { IDiscussionBuilder } from '@rocket.chat/apps-engine/definition/accessors/IDiscussionBuilder';
import type { IEmailCreator } from '@rocket.chat/apps-engine/definition/accessors/IEmailCreator';
import type { ILivechatCreator } from '@rocket.chat/apps-engine/definition/accessors/ILivechatCreator';
import type { ILivechatMessageBuilder } from '@rocket.chat/apps-engine/definition/accessors/ILivechatMessageBuilder';
import type { IMessageBuilder } from '@rocket.chat/apps-engine/definition/accessors/IMessageBuilder';
import type { IModifyCreator } from '@rocket.chat/apps-engine/definition/accessors/IModifyCreator';
import type { IRoomBuilder } from '@rocket.chat/apps-engine/definition/accessors/IRoomBuilder';
import type { IUploadCreator } from '@rocket.chat/apps-engine/definition/accessors/IUploadCreator';
import type { IUserBuilder } from '@rocket.chat/apps-engine/definition/accessors/IUserBuilder';
import type { IVideoConferenceBuilder } from '@rocket.chat/apps-engine/definition/accessors/IVideoConferenceBuilder';
import type { IMessage } from '@rocket.chat/apps-engine/definition/messages/IMessage';
import { RocketChatAssociationModel } from '@rocket.chat/apps-engine/definition/metadata/RocketChatAssociations';
import type { IRoom } from '@rocket.chat/apps-engine/definition/rooms/IRoom';
import { RoomType } from '@rocket.chat/apps-engine/definition/rooms/RoomType';
import type { IBotUser } from '@rocket.chat/apps-engine/definition/users/IBotUser';
import type { IUser } from '@rocket.chat/apps-engine/definition/users/IUser';
import { UserType } from '@rocket.chat/apps-engine/definition/users/UserType';

import { AppObjectRegistry } from '../../../AppObjectRegistry';
import type * as Messenger from '../../messenger';
import { BlockBuilder } from '../builders/BlockBuilder';
import { DiscussionBuilder } from '../builders/DiscussionBuilder';
import type { ILivechatMessage } from '../builders/LivechatMessageBuilder';
import { LivechatMessageBuilder } from '../builders/LivechatMessageBuilder';
import { MessageBuilder } from '../builders/MessageBuilder';
import { RoomBuilder } from '../builders/RoomBuilder';
import { UserBuilder } from '../builders/UserBuilder';
import type { AppVideoConference } from '../builders/VideoConferenceBuilder';
import { VideoConferenceBuilder } from '../builders/VideoConferenceBuilder';
import { formatErrorResponse } from '../formatResponseErrorHandler';

export class ModifyCreator implements IModifyCreator {
	constructor(private readonly senderFn: typeof Messenger.sendRequest) {
        /* Implementation Hidden */
    }

	getLivechatCreator(): ILivechatCreator {
        /* Implementation Hidden */
    }

	getUploadCreator(): IUploadCreator {
        /* Implementation Hidden */
    }

	getEmailCreator(): IEmailCreator {
        /* Implementation Hidden */
    }

	getContactCreator(): IContactCreator {
        /* Implementation Hidden */
    }

	getBlockBuilder() {
        /* Implementation Hidden */
    }

	startMessage(data?: IMessage) {
        /* Implementation Hidden */
    }

	startLivechatMessage(data?: ILivechatMessage) {
        /* Implementation Hidden */
    }

	startRoom(data?: IRoom) {
        /* Implementation Hidden */
    }

	startDiscussion(data?: Partial<IRoom>) {
        /* Implementation Hidden */
    }

	startVideoConference(data?: Partial<AppVideoConference>) {
        /* Implementation Hidden */
    }

	startBotUser(data?: Partial<IBotUser>) {
        /* Implementation Hidden */
    }

	public finish(
		builder: IMessageBuilder | ILivechatMessageBuilder | IRoomBuilder | IDiscussionBuilder | IVideoConferenceBuilder | IUserBuilder,
	): Promise<string> {
        /* Implementation Hidden */
    }

	private async _finishMessage(builder: IMessageBuilder): Promise<string> {
        /* Implementation Hidden */
    }

	private async _finishLivechatMessage(builder: ILivechatMessageBuilder): Promise<string> {
        /* Implementation Hidden */
    }

	private async _finishRoom(builder: IRoomBuilder): Promise<string> {
        /* Implementation Hidden */
    }

	private async _finishDiscussion(builder: DiscussionBuilder): Promise<string> {
        /* Implementation Hidden */
    }

	private async _finishVideoConference(builder: IVideoConferenceBuilder): Promise<string> {
        /* Implementation Hidden */
    }

	private async _finishUser(builder: IUserBuilder): Promise<string> {
        /* Implementation Hidden */
    }
}

```