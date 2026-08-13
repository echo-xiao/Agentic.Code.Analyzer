## File: apps/meteor/app/importer/server/classes/converters/MessageConverter.ts

```typescript
import type { IImportMessageRecord, IMessage as IDBMessage, IImportMessage, IImportMessageReaction } from '@rocket.chat/core-typings';
import { Rooms } from '@rocket.chat/models';
import { removeEmpty } from '@rocket.chat/tools';
import limax from 'limax';

import type { UserIdentification, MentionedChannel } from './ConverterCache';
import { RecordConverter } from './RecordConverter';
import { insertMessage } from '../../../../../server/lib/messages/insertMessage';
import type { IConversionCallbacks } from '../../definitions/IConversionCallbacks';

export type MessageConversionCallbacks = IConversionCallbacks & { afterImportAllMessagesFn?: (roomIds: string[]) => Promise<void> };

type MessageObject = Record<string, any>;

type MentionedUser = {
	_id: string;
	username: string;
	name?: string;
};

type IMessageReaction = {
	name: string;
	usernames: string[];
};

type IMessageReactions = Record<string, IMessageReaction>;

export class MessageConverter extends RecordConverter<IImportMessageRecord> {
	private rids: string[] = [];

	override async convertData({ afterImportAllMessagesFn, ...callbacks }: MessageConversionCallbacks = {}): Promise<void> {
        /* Implementation Hidden */
    }

	protected async resetLastMessages(): Promise<void> {
        /* Implementation Hidden */
    }

	protected async insertMessage(data: IImportMessage): Promise<void> {
        /* Implementation Hidden */
    }

	protected override async convertRecord(record: IImportMessageRecord): Promise<boolean> {
        /* Implementation Hidden */
    }

	protected async buildMessageObject(data: IImportMessage, rid: string, creator: UserIdentification): Promise<MessageObject> {
        /* Implementation Hidden */
    }

	protected async convertMessageChannels(message: IImportMessage): Promise<MentionedChannel[] | undefined> {
        /* Implementation Hidden */
    }

	protected async convertMessageMentions(message: IImportMessage): Promise<MentionedUser[] | undefined> {
        /* Implementation Hidden */
    }

	protected async convertMessageReactions(
		importedReactions: Record<string, IImportMessageReaction>,
	): Promise<undefined | IMessageReactions> {
        /* Implementation Hidden */
    }

	protected async convertMessageReplies(replies: string[]): Promise<string[]> {
        /* Implementation Hidden */
    }

	protected async getMentionedChannelData(importId: string): Promise<MentionedChannel | undefined> {
        /* Implementation Hidden */
    }

	protected override getDataType(): 'message' {
        /* Implementation Hidden */
    }
}

```