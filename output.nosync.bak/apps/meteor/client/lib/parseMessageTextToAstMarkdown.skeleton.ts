## File: apps/meteor/client/lib/parseMessageTextToAstMarkdown.ts

```typescript
import type { IMessage, ITranslatedMessage, MessageAttachment } from '@rocket.chat/core-typings';
import {
	isFileAttachment,
	isE2EEMessage,
	isQuoteAttachment,
	isTranslatedAttachment,
	isTranslatedMessage,
	isEncryptedMessageAttachment,
} from '@rocket.chat/core-typings';
import type { Options, Root } from '@rocket.chat/message-parser';
import { parse } from '@rocket.chat/message-parser';

import type { AutoTranslateOptions } from '../views/room/MessageList/hooks/useAutoTranslate';
import { isParsedMessage } from '../views/room/MessageList/lib/isParsedMessage';

type WithRequiredProperty<Type, Key extends keyof Type> = Omit<Type, Key> & {
	[Property in Key]-?: Type[Property];
};

export type MessageWithMdEnforced<TMessage extends IMessage & Partial<ITranslatedMessage> = IMessage & Partial<ITranslatedMessage>> =
	WithRequiredProperty<TMessage, 'md'> & {
		/** The exact source text `md` was parsed from (translation-aware), so its `fallback` offsets can be sliced. */
		mdSource?: string;
	};
/**
 * Removes null values for known properties values.
 * Adds a property `md` to the message with the parsed message if is not provided.
 * if has `attachments` property, but attachment is missing `md` property, it will be added.
 * if translation is enabled and message contains `translations` property, it will be replaced by the parsed message.
 * @param message The message to be parsed.
 * @param parseOptions The options to be used in the parser.
 * @param autoTranslateOptions The auto translate options to be used in the parser.
 * @returns message normalized.
 */
export const parseMessageTextToAstMarkdown = <
	TMessage extends IMessage & Partial<ITranslatedMessage> = IMessage & Partial<ITranslatedMessage>,
>(
	message: TMessage,
	parseOptions: Options,
	autoTranslateOptions: AutoTranslateOptions,
): MessageWithMdEnforced => {
    /* Implementation Hidden */
};

export const parseMessageAttachment = <T extends MessageAttachment>(
	attachment: T,
	parseOptions: Options,
	autoTranslateOptions: { autoTranslateLanguage?: string; translated: boolean },
): T => {
    /* Implementation Hidden */
};

export const parseMessageAttachments = <T extends MessageAttachment>(
	attachments: T[],
	parseOptions: Options,
	autoTranslateOptions: { autoTranslateLanguage?: string; translated: boolean },
): T[] => attachments.map((attachment) => parseMessageAttachment(attachment, parseOptions, autoTranslateOptions));

const isNotNullOrUndefined = (value: unknown): boolean => value !== null && value !== undefined;

// In a previous version of the app, some values were being set to null.
// This is a workaround to remove those null values.
// A migration script should be created to remove this code.
export const removePossibleNullMessageValues = <TMessage extends IMessage = IMessage>({
	editedBy,
	editedAt,
	emoji,
	avatar,
	alias,
	customFields,
	groupable,
	attachments,
	reactions,
	...message
}: any): TMessage => ({
	...message,
	...(isNotNullOrUndefined(editedBy) && { editedBy }),
	...(isNotNullOrUndefined(editedAt) && { editedAt }),
	...(isNotNullOrUndefined(emoji) && { emoji }),
	...(isNotNullOrUndefined(avatar) && { avatar }),
	...(isNotNullOrUndefined(alias) && { alias }),
	...(isNotNullOrUndefined(customFields) && { customFields }),
	...(isNotNullOrUndefined(groupable) && { groupable }),
	...(isNotNullOrUndefined(attachments) && { attachments }),
	...(isNotNullOrUndefined(reactions) && { reactions }),
});

const textToMessageToken = (textOrRoot: string | Root, parseOptions: Options): Root => {
    /* Implementation Hidden */
};

```