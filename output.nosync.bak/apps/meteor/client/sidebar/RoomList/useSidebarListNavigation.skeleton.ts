## File: apps/meteor/client/sidebar/RoomList/useSidebarListNavigation.ts

```typescript
import { useFocusManager } from '@react-aria/focus';
import { useCallback } from 'react';

const isListItem = (node: EventTarget) => (node as HTMLElement).classList.contains('rcx-sidebar-v2-item');
const isCollapseGroup = (node: EventTarget) => (node as HTMLElement).classList.contains('rcx-sidebar-v2-collapse-group__bar');
const isListItemMenu = (node: EventTarget) => (node as HTMLElement).classList.contains('rcx-sidebar-v2-item__menu');

/**
 * Custom hook to provide the sidebar navigation by keyboard.
 * @returns ref - A ref to the message list DOM element.
 */
export const useSidebarListNavigation = () => {
    /* Implementation Hidden */
};

```