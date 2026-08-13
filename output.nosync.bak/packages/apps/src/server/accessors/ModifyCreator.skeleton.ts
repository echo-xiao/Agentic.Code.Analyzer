## File: packages/apps/src/server/accessors/ModifyCreator.ts

```typescript
import type {
	IDiscussionBuilder,
	ILivechatCreator,
	ILivechatMessageBuilder,
	IMessageBuilder,
	IModifyCreator,
	IRoomBuilder,
	IUploadCreator,
	IUserBuilder,
	IVideoConferenceBuilder,
} from '@rocket.chat/apps-engine/definition/accessors';
import type { IContactCreator } from '@rocket.chat/apps-engine/definition/accessors/IContactCreator';
import type { IEmailCreator } from '@rocket.chat/apps-engine/definition/accessors/IEmailCreator';
import type { ILivechatMessage } from '@rocket.chat/apps-engine/definition/livechat/ILivechatMessage';
import type { IMessage } from '@rocket.chat/apps-engine/definition/messages';
import { RocketChatAssociationModel } from '@rocket.chat/apps-engine/definition/metadata';
import type { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import { RoomType } from '@rocket.chat/apps-engine/definition/rooms';
import { BlockBuilder } from '@rocket.chat/apps-engine/definition/uikit';
import type { IBotUser } from '@rocket.chat/apps-engine/definition/users/IBotUser';
import { UserType } from '@rocket.chat/apps-engine/definition/users/UserType';
import type { AppVideoConference } from '@rocket.chat/apps-engine/definition/videoConferences';

import { ContactCreator } from './ContactCreator';
import { DiscussionBuilder } from './DiscussionBuilder';
import { EmailCreator } from './EmailCreator';
import { LivechatCreator } from './LivechatCreator';
import { LivechatMessageBuilder } from './LivechatMessageBuilder';
import { MessageBuilder } from './MessageBuilder';
import { RoomBuilder } from './RoomBuilder';
import { UploadCreator } from './UploadCreator';
import { UserBuilder } from './UserBuilder';
import { VideoConferenceBuilder } from './VideoConferenceBuilder';
import type { AppBridges } from '../bridges';
import { UIHelper } from '../misc/UIHelper';

export class ModifyCreator implements IModifyCreator {
	private livechatCreator: LivechatCreator;

	private uploadCreator: UploadCreator;

	private emailCreator: EmailCreator;

	private contactCreator: ContactCreator;

	constructor(
		private readonly bridges: AppBridges,
		private readonly appId: string,
	) {
        /* Implementation Hidden */
    }

	public getLivechatCreator(): ILivechatCreator {
        /* Implementation Hidden */
    }

	public getUploadCreator(): IUploadCreator {
        /* Implementation Hidden */
    }

	public getEmailCreator(): IEmailCreator {
        /* Implementation Hidden */
    }

	public getContactCreator(): IContactCreator {
        /* Implementation Hidden */
    }

	/**
	 * @deprecated please prefer the rocket.chat/ui-kit components
	 */
	public getBlockBuilder(): BlockBuilder {
        /* Implementation Hidden */
    }

	public startMessage(data?: IMessage): IMessageBuilder {
        /* Implementation Hidden */
    }

	public startLivechatMessage(data?: ILivechatMessage): ILivechatMessageBuilder {
        /* Implementation Hidden */
    }

	public startRoom(data?: IRoom): IRoomBuilder {
        /* Implementation Hidden */
    }

	public startDiscussion(data?: Partial<IRoom>): IDiscussionBuilder {
        /* Implementation Hidden */
    }

	public startVideoConference(data?: Partial<AppVideoConference>): IVideoConferenceBuilder {
        /* Implementation Hidden */
    }

	public startBotUser(data?: Partial<IBotUser>): IUserBuilder {
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

	private _finishLivechatMessage(builder: ILivechatMessageBuilder): Promise<string> {
        /* Implementation Hidden */
    }

	private _finishRoom(builder: IRoomBuilder): Promise<string> {
        /* Implementation Hidden */
    }

	private _finishDiscussion(builder: IDiscussionBuilder): Promise<string> {
        /* Implementation Hidden */
    }

	private _finishVideoConference(builder: IVideoConferenceBuilder): Promise<string> {
        /* Implementation Hidden */
    }

	private _finishUser(builder: IUserBuilder): Promise<string> {
        /* Implementation Hidden */
    }
}

```