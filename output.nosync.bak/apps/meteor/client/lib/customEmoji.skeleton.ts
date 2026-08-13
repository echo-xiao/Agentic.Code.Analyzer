## File: apps/meteor/client/lib/customEmoji.ts

```typescript
import type { IEmoji } from '@rocket.chat/core-typings';
import { escapeRegExp } from '@rocket.chat/string-helpers';

import { emoji, removeFromRecent, replaceEmojiInRecent } from '../../app/emoji/client';
import { getURL } from '../../app/utils/client';

const isSetNotNull = (fn: () => unknown) => {
    /* Implementation Hidden */
};

export const updateEmojiCustom = (emojiData: IEmoji) => {
    /* Implementation Hidden */
};

export const deleteEmojiCustom = (emojiData: IEmoji) => {
    /* Implementation Hidden */
};

const getEmojiUrlFromName = (name: string, extension: string, etag?: string) => {
    /* Implementation Hidden */
};

export const customRender = (html: string) => {
    /* Implementation Hidden */
};

```