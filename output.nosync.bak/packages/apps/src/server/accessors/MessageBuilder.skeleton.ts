## File: packages/apps/src/server/accessors/MessageBuilder.ts

```typescript
/* eslint-disable @typescript-eslint/no-non-null-assertion -- the builder works under the assumption that "gets" would only happen after the corresponding "sets" */

import type { IMessageBuilder } from '@rocket.chat/apps-engine/definition/accessors';
import type { IMessage, IMessageAttachment } from '@rocket.chat/apps-engine/definition/messages';
import { RocketChatAssociationModel } from '@rocket.chat/apps-engine/definition/metadata';
import type { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import type { IBlock } from '@rocket.chat/apps-engine/definition/uikit';
import { BlockBuilder } from '@rocket.chat/apps-engine/definition/uikit';
import type { IUser } from '@rocket.chat/apps-engine/definition/users';
import type { LayoutBlock } from '@rocket.chat/ui-kit';

export class MessageBuilder implements IMessageBuilder {
	public kind: RocketChatAssociationModel.MESSAGE;

	private msg: IMessage;

	constructor(message?: IMessage) {
        /* Implementation Hidden */
    }

	public setData(data: IMessage): IMessageBuilder {
        /* Implementation Hidden */
    }

	public setUpdateData(data: IMessage, editor: IUser): IMessageBuilder {
        /* Implementation Hidden */
    }

	public setThreadId(threadId: string): IMessageBuilder {
        /* Implementation Hidden */
    }

	public getThreadId(): string {
        /* Implementation Hidden */
    }

	public setRoom(room: IRoom): IMessageBuilder {
        /* Implementation Hidden */
    }

	public getRoom(): IRoom {
        /* Implementation Hidden */
    }

	public setSender(sender: IUser): IMessageBuilder {
        /* Implementation Hidden */
    }

	public getSender(): IUser {
        /* Implementation Hidden */
    }

	public setText(text: string): IMessageBuilder {
        /* Implementation Hidden */
    }

	public getText(): string {
        /* Implementation Hidden */
    }

	public setEmojiAvatar(emoji: string): IMessageBuilder {
        /* Implementation Hidden */
    }

	public getEmojiAvatar(): string {
        /* Implementation Hidden */
    }

	public setAvatarUrl(avatarUrl: string): IMessageBuilder {
        /* Implementation Hidden */
    }

	public getAvatarUrl(): string {
        /* Implementation Hidden */
    }

	public setUsernameAlias(alias: string): IMessageBuilder {
        /* Implementation Hidden */
    }

	public getUsernameAlias(): string {
        /* Implementation Hidden */
    }

	public addAttachment(attachment: IMessageAttachment): IMessageBuilder {
        /* Implementation Hidden */
    }

	public setAttachments(attachments: Array<IMessageAttachment>): IMessageBuilder {
        /* Implementation Hidden */
    }

	public getAttachments(): Array<IMessageAttachment> {
        /* Implementation Hidden */
    }

	public replaceAttachment(position: number, attachment: IMessageAttachment): IMessageBuilder {
        /* Implementation Hidden */
    }

	public removeAttachment(position: number): IMessageBuilder {
        /* Implementation Hidden */
    }

	public setEditor(user: IUser): IMessageBuilder {
        /* Implementation Hidden */
    }

	public getEditor(): IUser {
        /* Implementation Hidden */
    }

	public setGroupable(groupable: boolean): IMessageBuilder {
        /* Implementation Hidden */
    }

	public getGroupable(): boolean {
        /* Implementation Hidden */
    }

	public setParseUrls(parseUrls: boolean): IMessageBuilder {
        /* Implementation Hidden */
    }

	public getParseUrls() {
        /* Implementation Hidden */
    }

	public getMessage(): IMessage {
        /* Implementation Hidden */
    }

	public addBlocks(blocks: BlockBuilder | Array<IBlock | LayoutBlock>) {
        /* Implementation Hidden */
    }

	public setBlocks(blocks: BlockBuilder | Array<IBlock | LayoutBlock>) {
        /* Implementation Hidden */
    }

	public getBlocks(): Array<IBlock | LayoutBlock> {
        /* Implementation Hidden */
    }

	public addCustomField(key: string, value: any): IMessageBuilder {
        /* Implementation Hidden */
    }
}

```