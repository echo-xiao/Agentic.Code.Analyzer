## File: apps/meteor/client/views/room/contexts/ComposerPopupContext.ts

```typescript
import type { Optional } from '@rocket.chat/core-typings';
import type { ReactNode } from 'react';
import { useContext, createContext } from 'react';

export type ComposerPopupOption<T extends { _id: string; sort?: number } = { _id: string; sort?: number }> = {
	title?: string;
	getItemsFromLocal?: (filter: any) => Promise<T[]>;
	getItemsFromServer?: (filter: any) => Promise<T[]>;
	blurOnSelectItem?: boolean;
	closeOnEsc?: boolean;

	trigger?: string;
	triggerAnywhere?: boolean;
	triggerLength?: number;

	suffix?: string;
	prefix?: string;

	matchSelectorRegex?: RegExp;
	preview?: boolean;

	getValue: (item: T) => string;

	renderItem?: ({ item }: { item: T }) => ReactNode;
	disabled?: boolean;
};

export type ComposerPopupContextValue = ComposerPopupOption[];

export const ComposerPopupContext = createContext<ComposerPopupContextValue | undefined>(undefined);

export const createMessageBoxPopupConfig = <T extends { _id: string; sort?: number }>(
	partial: Optional<ComposerPopupOption<T>, 'getValue'>,
): ComposerPopupOption<T> => {
    /* Implementation Hidden */
};

export const useComposerPopupOptions = () => {
    /* Implementation Hidden */
};

```