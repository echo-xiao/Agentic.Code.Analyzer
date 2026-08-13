## File: apps/meteor/client/views/room/composer/hooks/useComposerBoxPopup.ts

```typescript
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import type { UseQueryResult } from '@tanstack/react-query';
import type { MutableRefObject } from 'react';
import { useEffect, useCallback, useState, useRef } from 'react';

import { useComposerBoxPopupQueries } from './useComposerBoxPopupQueries';
import { useChat } from '../../contexts/ChatContext';
import type { ComposerPopupOption } from '../../contexts/ComposerPopupContext';

type ComposerBoxPopupImperativeCommands<T> = MutableRefObject<
	| {
			getFilter?: () => string;
			select?: (s: T) => void;
	  }
	| undefined
>;

type ComposerBoxPopupOptions<T extends { _id: string; sort?: number | undefined }> = ComposerPopupOption<T>;

type ComposerBoxPopupResult<T extends { _id: string; sort?: number }> =
	| {
			option: ComposerPopupOption<T>;
			items: UseQueryResult<T[]>[];
			focused: T | undefined;
			select: (item: T) => void;
			callbackRef: (node: HTMLElement) => void;
			commandsRef: ComposerBoxPopupImperativeCommands<T>;
			suspended: boolean;
			filter: unknown;
			clear: () => void;
			update: () => void;
	  }
	| {
			option: undefined;
			items: undefined;
			focused: undefined;
			callbackRef: (node: HTMLElement) => void;
			select: undefined;
			commandsRef: ComposerBoxPopupImperativeCommands<T>;
			suspended: undefined;
			filter: unknown;
			clear: () => void;
			update: () => void;
	  };

const keys = {
	TAB: 9,
	ENTER: 13,
	ESC: 27,
	ARROW_UP: 38,
	ARROW_DOWN: 40,
} as const;

export const useComposerBoxPopup = <T extends { _id: string; sort?: number }>(
	options: ComposerBoxPopupOptions<T>[],
): ComposerBoxPopupResult<T> => {
    /* Implementation Hidden */
};

```