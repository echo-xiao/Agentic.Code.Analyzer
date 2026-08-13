## File: packages/apps/src/server/accessors/LivechatMessageBuilder.ts

```typescript
import type { ILivechatMessageBuilder, IMessageBuilder } from '@rocket.chat/apps-engine/definition/accessors';
import type { ILivechatMessage } from '@rocket.chat/apps-engine/definition/livechat/ILivechatMessage';
import type { IVisitor } from '@rocket.chat/apps-engine/definition/livechat/IVisitor';
import type { IMessage, IMessageAttachment } from '@rocket.chat/apps-engine/definition/messages';
import { RocketChatAssociationModel } from '@rocket.chat/apps-engine/definition/metadata';
import type { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import { RoomType } from '@rocket.chat/apps-engine/definition/rooms';
import type { IUser } from '@rocket.chat/apps-engine/definition/users';

import { MessageBuilder } from './MessageBuilder';

export class LivechatMessageBuilder implements ILivechatMessageBuilder {
	public kind: RocketChatAssociationModel.LIVECHAT_MESSAGE;

	private msg: ILivechatMessage;

	constructor(message?: ILivechatMessage) {
        /* Implementation Hidden */
    }

	public setData(data: ILivechatMessage): ILivechatMessageBuilder {
        /* Implementation Hidden */
    }

	public setRoom(room: IRoom): ILivechatMessageBuilder {
        /* Implementation Hidden */
    }

	public getRoom(): IRoom {
        /* Implementation Hidden */
    }

	public setSender(sender: IUser): ILivechatMessageBuilder {
        /* Implementation Hidden */
    }

	public getSender(): IUser {
        /* Implementation Hidden */
    }

	public setText(text: string): ILivechatMessageBuilder {
        /* Implementation Hidden */
    }

	public getText(): string {
        /* Implementation Hidden */
    }

	public setEmojiAvatar(emoji: string): ILivechatMessageBuilder {
        /* Implementation Hidden */
    }

	public getEmojiAvatar(): string {
        /* Implementation Hidden */
    }

	public setAvatarUrl(avatarUrl: string): ILivechatMessageBuilder {
        /* Implementation Hidden */
    }

	public getAvatarUrl(): string {
        /* Implementation Hidden */
    }

	public setUsernameAlias(alias: string): ILivechatMessageBuilder {
        /* Implementation Hidden */
    }

	public getUsernameAlias(): string {
        /* Implementation Hidden */
    }

	public addAttachment(attachment: IMessageAttachment): ILivechatMessageBuilder {
        /* Implementation Hidden */
    }

	public setAttachments(attachments: Array<IMessageAttachment>): ILivechatMessageBuilder {
        /* Implementation Hidden */
    }

	public getAttachments(): Array<IMessageAttachment> {
        /* Implementation Hidden */
    }

	public replaceAttachment(position: number, attachment: IMessageAttachment): ILivechatMessageBuilder {
        /* Implementation Hidden */
    }

	public removeAttachment(position: number): ILivechatMessageBuilder {
        /* Implementation Hidden */
    }

	public setEditor(user: IUser): ILivechatMessageBuilder {
        /* Implementation Hidden */
    }

	public getEditor(): IUser {
        /* Implementation Hidden */
    }

	public setGroupable(groupable: boolean): ILivechatMessageBuilder {
        /* Implementation Hidden */
    }

	public getGroupable(): boolean {
        /* Implementation Hidden */
    }

	public setParseUrls(parseUrls: boolean): ILivechatMessageBuilder {
        /* Implementation Hidden */
    }

	public getParseUrls(): boolean {
        /* Implementation Hidden */
    }

	public setToken(token: string): ILivechatMessageBuilder {
        /* Implementation Hidden */
    }

	public getToken(): string {
        /* Implementation Hidden */
    }

	public setVisitor(visitor: IVisitor): ILivechatMessageBuilder {
        /* Implementation Hidden */
    }

	public getVisitor(): IVisitor {
        /* Implementation Hidden */
    }

	public getMessage(): ILivechatMessage {
        /* Implementation Hidden */
    }

	public getMessageBuilder(): IMessageBuilder {
        /* Implementation Hidden */
    }
}

```