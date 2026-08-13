## File: apps/meteor/client/views/room/hooks/useMessageListNavigation.ts

```typescript
import { createFocusManager, useFocusManager } from '@react-aria/focus';
import type { RefCallback } from 'react';
import { useCallback } from 'react';

const isListItem = (node: EventTarget) =>
	(node as HTMLElement).getAttribute('role') === 'listitem' || (node as HTMLElement).getAttribute('role') === 'link';
const isMessageToolbarAction = (node: EventTarget) => (node as HTMLElement).parentElement?.getAttribute('role') === 'toolbar';
const isSystemMessage = (node: EventTarget) => (node as HTMLElement).classList.contains('rcx-message-system');
const isThreadMessage = (node: EventTarget) => (node as HTMLElement).classList.contains('rcx-message-thread');

/**
 * Custom hook to provide the room navigation by keyboard.
 * @param ref - A ref to the message list DOM element.
 */
export const useMessageListNavigation = (): { messageListRef: RefCallback<HTMLElement> } => {
    /* Implementation Hidden */
};

```