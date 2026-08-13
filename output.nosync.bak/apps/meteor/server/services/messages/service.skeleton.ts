## File: apps/meteor/server/services/messages/service.ts

```typescript
import { AppEvents, Apps } from '@rocket.chat/apps';
import type { IMessageService } from '@rocket.chat/core-services';
import { Authorization, ServiceClassInternal } from '@rocket.chat/core-services';
import { isEditedMessage } from '@rocket.chat/core-typings';
import type { MessageUrl, IMessage, MessageTypesValues, IUser, IRoom, AtLeast } from '@rocket.chat/core-typings';
import { Messages, Rooms } from '@rocket.chat/models';

import { OEmbed } from './hooks/AfterSaveOEmbed';
import { notifyOnRoomChangedById, notifyOnMessageChange } from '../../../app/lib/server/lib/notifyListener';
import { notifyUsersOnSystemMessage } from '../../../app/lib/server/lib/notifyUsersOnMessage';
import { executeSendMessage } from '../../../app/lib/server/methods/sendMessage';
import { executeSetReaction } from '../../../app/reactions/server/setReaction';
import { settings } from '../../../app/settings/server';
import { getUserAvatarURL } from '../../../app/utils/server/getUserAvatarURL';
import { BeforeSaveCannedResponse } from '../../../ee/server/hooks/messages/BeforeSaveCannedResponse';
import { FederationMatrixInvalidConfigurationError } from '../federation/utils';
import { FederationActions } from './hooks/BeforeFederationActions';
import { BeforeSaveBadWords } from './hooks/BeforeSaveBadWords';
import { BeforeSaveCheckMAC } from './hooks/BeforeSaveCheckMAC';
import { BeforeSaveJumpToMessage } from './hooks/BeforeSaveJumpToMessage';
import { BeforeSaveMarkdownParser } from './hooks/BeforeSaveMarkdownParser';
import { mentionServer } from './hooks/BeforeSaveMentions';
import { BeforeSavePreventMention } from './hooks/BeforeSavePreventMention';
import { BeforeSaveSpotify } from './hooks/BeforeSaveSpotify';
import { closeUnclosedCodeBlock } from '../../../lib/utils/closeUnclosedCodeBlock';
import { deleteMessage } from '../../lib/messages/deleteMessage';
import { parseUrlsInMessage } from '../../lib/messages/parseUrlsInMessage';
import { sendMessage } from '../../lib/messages/sendMessage';
import { updateMessage } from '../../lib/messages/updateMessage';
import { shouldBreakInVersion } from '../../lib/shouldBreakInVersion';

const disableMarkdownParser = ['yes', 'true'].includes(String(process.env.DISABLE_MESSAGE_PARSER).toLowerCase());

export class MessageService extends ServiceClassInternal implements IMessageService {
	protected name = 'message';

	private preventMention: BeforeSavePreventMention;

	private badWords: BeforeSaveBadWords;

	private spotify: BeforeSaveSpotify;

	private jumpToMessage: BeforeSaveJumpToMessage;

	private cannedResponse: BeforeSaveCannedResponse;

	private markdownParser: BeforeSaveMarkdownParser;

	private checkMAC: BeforeSaveCheckMAC;

	override async created() {
        /* Implementation Hidden */
    }

	private async configureBadWords() {
        /* Implementation Hidden */
    }

	async sendMessage({ fromId, rid, msg }: { fromId: string; rid: string; msg: string }): Promise<IMessage> {
        /* Implementation Hidden */
    }

	async saveMessageFromFederation({
		fromId,
		rid,
		federation_event_id,
		msg,
		e2e_content,
		file,
		files,
		attachments,
		thread,
		ts,
	}: {
		fromId: string;
		rid: string;
		federation_event_id: string;
		msg?: string;
		e2e_content?: {
			algorithm: 'm.megolm.v1.aes-sha2';
			ciphertext: string;
		};
		file?: IMessage['file'];
		files?: IMessage['files'];
		attachments?: IMessage['attachments'];
		thread?: { tmid: string; tshow: boolean };
		ts: Date;
	}): Promise<IMessage> {
        /* Implementation Hidden */
    }

	async sendMessageWithValidation(user: IUser, message: Partial<IMessage>, room: Partial<IRoom>, upsert = false): Promise<IMessage> {
        /* Implementation Hidden */
    }

	async deleteMessage(user: IUser, message: IMessage): Promise<void> {
        /* Implementation Hidden */
    }

	async updateMessage(message: IMessage, user: IUser, originalMsg?: IMessage, previewUrls?: string[]): Promise<void> {
        /* Implementation Hidden */
    }

	async reactToMessage(userId: string, reaction: string, messageId: IMessage['_id'], shouldReact?: boolean): Promise<void> {
        /* Implementation Hidden */
    }

	async saveSystemMessageAndNotifyUser<T = IMessage>(
		type: MessageTypesValues,
		rid: string,
		messageText: string,
		owner: Pick<IUser, '_id' | 'username' | 'name'>,
		extraData?: Partial<T>,
	): Promise<IMessage> {
        /* Implementation Hidden */
    }

	async saveSystemMessage<T = IMessage>(
		type: MessageTypesValues,
		rid: string,
		message: string,
		owner: Pick<IUser, '_id' | 'username' | 'name'>,
		extraData?: Partial<T>,
	): Promise<IMessage> {
        /* Implementation Hidden */
    }

	async beforeSave({
		message,
		room,
		user,
		previewUrls,
		parseUrls = true,
	}: {
		message: IMessage;
		room: IRoom;
		user: Pick<IUser, '_id' | 'username' | 'name' | 'emails' | 'language'>;
		previewUrls?: string[];
		parseUrls?: boolean;
	}): Promise<IMessage> {
        /* Implementation Hidden */
    }

	// The actions made on this event should be asynchronous
	// That means, caller should not expect to receive updated message
	// after calling
	async afterSave({ message }: { message: IMessage }): Promise<void> {
        /* Implementation Hidden */
    }

	private getMarkdownConfig() {
        /* Implementation Hidden */
    }

	private isEditedOrOld(message: IMessage): boolean {
        /* Implementation Hidden */
    }

	// joinDiscussionOnMessage
	// private async joinDiscussionOnMessage({ message, room, user }: { message: IMessage; room: IRoom; user: IUser }) {
	// 	// abort if room is not a discussion
	// 	if (!room.prid) {
	// 		return;
	// 	}

	// 	// check if user already joined the discussion
	// 	const sub = await Subscriptions.findOneByRoomIdAndUserId(room._id, message.u._id, {
	// 		projection: { _id: 1 },
	// 	});

	// 	if (sub) {
	// 		return;
	// 	}

	// 	await Room.join({ room, user });
	// }

	async beforeReacted(message: IMessage, room: AtLeast<IRoom, 'federated'>) {
        /* Implementation Hidden */
    }

	async beforeDelete(message: IMessage, room: IRoom) {
        /* Implementation Hidden */
    }

	async parseOEmbedUrl(url: string): Promise<{
		urlPreview: MessageUrl;
		foundMeta: boolean;
	}> {
        /* Implementation Hidden */
    }
}

```