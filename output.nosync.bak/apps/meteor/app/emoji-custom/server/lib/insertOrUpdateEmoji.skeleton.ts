## File: apps/meteor/app/emoji-custom/server/lib/insertOrUpdateEmoji.ts

```typescript
import { api } from '@rocket.chat/core-services';
import { EmojiCustom } from '@rocket.chat/models';
import limax from 'limax';
import { Meteor } from 'meteor/meteor';

import { trim } from '../../../../lib/utils/stringUtils';
import { hasPermissionAsync } from '../../../../server/lib/authorization/hasPermission';
import { RocketChatFileEmojiCustomInstance } from '../startup/emoji-custom';

export type EmojiData = {
	_id?: string;
	name: string;
	aliases?: string;
	extension: string;
	previousName?: string;
	previousExtension?: string;
	newFile?: boolean;
};

type EmojiDataWithParsedAliases = Omit<EmojiData, 'aliases' | '_id'> & { _id: string; aliases: string[] };

export async function insertOrUpdateEmoji(userId: string | null, emojiData: EmojiData): Promise<EmojiDataWithParsedAliases> {
    /* Implementation Hidden */
}

```