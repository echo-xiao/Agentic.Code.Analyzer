## File: apps/meteor/app/emoji-custom/server/lib/uploadEmojiCustom.ts

```typescript
import { api, Media } from '@rocket.chat/core-services';
import { EmojiCustom } from '@rocket.chat/models';
import { Random } from '@rocket.chat/random';
import limax from 'limax';
import { Meteor } from 'meteor/meteor';
import sharp from 'sharp';

import type { EmojiData } from './insertOrUpdateEmoji';
import { hasPermissionAsync } from '../../../../server/lib/authorization/hasPermission';
import { RocketChatFile } from '../../../file/server';
import { RocketChatFileEmojiCustomInstance } from '../startup/emoji-custom';

const getFile = async (file: Buffer, extension: string) => {
    /* Implementation Hidden */
};

export type EmojiDataWithAliases = Omit<EmojiData, 'aliases'> & { aliases?: string | string[] };

export async function uploadEmojiCustom(
	userId: string | null,
	binaryContent: string,
	contentType: string,
	emojiData: EmojiDataWithAliases,
) {
    /* Implementation Hidden */
}

export async function uploadEmojiCustomWithBuffer(
	userId: string | null,
	buffer: Buffer,
	contentType: string,
	emojiData: EmojiDataWithAliases,
): Promise<void> {
    /* Implementation Hidden */
}

```