## File: apps/meteor/server/api/lib/emoji-custom.ts

```typescript
import type { IEmojiCustom } from '@rocket.chat/core-typings';
import { EmojiCustom } from '@rocket.chat/models';
import type { Filter, FindOptions } from 'mongodb';

export async function findEmojisCustom({
	query = {},
	pagination: { offset, count, sort },
}: {
	query: Filter<IEmojiCustom>;
	pagination: { offset: number; count: number; sort: FindOptions<IEmojiCustom>['sort'] };
}): Promise<{
	emojis: IEmojiCustom[];
	count: number;
	offset: any;
	total: number;
}> {
    /* Implementation Hidden */
}

```