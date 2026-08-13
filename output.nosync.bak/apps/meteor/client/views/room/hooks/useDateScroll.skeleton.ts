## File: apps/meteor/client/views/room/hooks/useDateScroll.ts

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { css } from '@rocket.chat/css-in-js';
import { useDebouncedCallback, useSafely } from '@rocket.chat/fuselage-hooks';
import type { CSSProperties, MutableRefObject } from 'react';
import { useRef, useState } from 'react';

import { useDateListController } from '../providers/DateListProvider';

type useDateScrollReturn = {
	handleDateScroll: (topMessage: IMessage | undefined, offset: number) => void;
	bubbleRef: MutableRefObject<HTMLElement | null>;
	listStyle?: ReturnType<typeof css>;
} & BubbleDateProps;

export type BubbleDateProps = {
	bubbleDate: string | undefined;
	bubbleDateClassName?: ReturnType<typeof css>;
	showBubble: boolean;
	bubbleDateStyle?: CSSProperties;
};

// The threshold in pixels to consider a date divider as "visible" when scrolling.
// The divider being a few pixels above the top of the viewport is safe, as it is always contained inside a message
const DATE_DIVIDER_VISIBILITY_THRESHOLD = 100;

type Matched = [date: string, divider: HTMLElement | undefined, style: { [key: string]: string | number }, showDivider: boolean] | [];

export const useDateScroll = (margin = 8): useDateScrollReturn => {
    /* Implementation Hidden */
};

```