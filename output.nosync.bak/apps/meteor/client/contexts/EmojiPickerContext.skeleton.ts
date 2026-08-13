## File: apps/meteor/client/contexts/EmojiPickerContext.ts

```typescript
import { createContext, useContext } from 'react';

import type { EmojiPickerItem, CategoriesIndexes } from '../../app/emoji/client';

type EmojiPickerContextValue = {
	open: (ref: Element, callback: (emoji: string) => void) => void;
	isOpen: boolean;
	close: () => void;
	emojiToPreview: { emoji: string; name: string } | null;
	handlePreview: (emoji: string, name: string) => void;
	handleRemovePreview: () => void;
	addRecentEmoji: (emoji: string) => void;
	emojiListByCategory: EmojiPickerItem[];
	recentEmojis: string[];
	setRecentEmojis: (emoji: string[]) => void;
	actualTone: number;
	currentCategory: string;
	setCurrentCategory: (category: string) => void;
	customItemsLimit: number;
	setCustomItemsLimit: (limit: number) => void;
	setActualTone: (tone: number) => void;
	quickReactions: { emoji: string; image: string }[];
	categoriesIndexes: CategoriesIndexes;
};

export const EmojiPickerContext = createContext<EmojiPickerContextValue | undefined>(undefined);
const useEmojiPickerContext = (): EmojiPickerContextValue => {
    /* Implementation Hidden */
};

export const useEmojiPicker = () => ({
	open: useEmojiPickerContext().open,
	isOpen: useEmojiPickerContext().isOpen,
	close: useEmojiPickerContext().close,
});

export const usePreviewEmoji = () => ({
	emojiToPreview: useEmojiPickerContext().emojiToPreview,
	handlePreview: useEmojiPickerContext().handlePreview,
	handleRemovePreview: useEmojiPickerContext().handleRemovePreview,
});

export const useEmojiPickerData = () => {
    /* Implementation Hidden */
};

```