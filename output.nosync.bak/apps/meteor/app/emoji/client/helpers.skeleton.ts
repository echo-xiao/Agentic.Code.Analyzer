## File: apps/meteor/app/emoji/client/helpers.ts

```typescript
import { escapeRegExp } from '@rocket.chat/string-helpers';
import type { TranslationKey } from '@rocket.chat/ui-contexts';

import type { EmojiCategory, EmojiItem } from '.';
import { emoji, emojiEmitter } from './lib';

export const CUSTOM_CATEGORY = 'rocket';

type RowItem = Array<EmojiItem & { category: string }>;
type RowDivider = { category: string; i18n: TranslationKey };
type LoadMoreItem = { loadMore: true };
export type EmojiPickerItem = RowItem | RowDivider | LoadMoreItem;

export type CategoriesIndexes = { key: string; index: number }[];

export const isRowDivider = (item: EmojiPickerItem): item is RowDivider => 'i18n' in item;
export const isLoadMore = (item: EmojiPickerItem): item is LoadMoreItem => 'loadMore' in item;

export const createEmojiListByCategorySubscription = (
	customItemsLimit: number,
	actualTone: number,
	recentEmojis: string[],
	setRecentEmojis: (emojis: string[]) => void,
	setQuickReactions: () => void,
): [subscribe: (onStoreChange: () => void) => () => void, getSnapshot: () => ReturnType<typeof createPickerEmojis>] => {
    /* Implementation Hidden */
};

export const createPickerEmojis = (
	customItemsLimit: number,
	actualTone: number,
	recentEmojis: string[],
	setRecentEmojis: (emojis: string[]) => void,
): [EmojiPickerItem[], CategoriesIndexes] => {
    /* Implementation Hidden */
};

export const createEmojiList = (
	customItemsLimit: number,
	category: string,
	actualTone: number | null,
	recentEmojis: string[],
	setRecentEmojis: (emojis: string[]) => void,
): (RowItem | LoadMoreItem)[] => {
    /* Implementation Hidden */
};

export const getCategoriesList = () => {
    /* Implementation Hidden */
};

export const getEmojisBySearchTerm = (
	searchTerm: string,
	actualTone: number,
	recentEmojis: string[],
	setRecentEmojis: (emojis: string[]) => void,
) => {
    /* Implementation Hidden */
};

export const removeFromRecent = (emoji: string, recentEmojis: string[], setRecentEmojis?: (emojis: string[]) => void) => {
    /* Implementation Hidden */
};

// There's no need to dispatchUpdate here. This helper is called before the list is generated.
// This means that the recent list will always be up to date by the time it is used.
export const updateRecent = (recentList: string[]) => {
    /* Implementation Hidden */
};

export const replaceEmojiInRecent = ({ oldEmoji, newEmoji }: { oldEmoji: string; newEmoji: string }) => {
    /* Implementation Hidden */
};

const getEmojiRender = (emojiName: string) => {
    /* Implementation Hidden */
};

export const getFrequentEmoji = (frequentEmoji: string[]) => {
    /* Implementation Hidden */
};

```