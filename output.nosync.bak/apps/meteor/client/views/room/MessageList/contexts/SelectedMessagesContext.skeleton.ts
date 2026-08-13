## File: apps/meteor/client/views/room/MessageList/contexts/SelectedMessagesContext.tsx

```typescript
import type { SyntheticEvent } from 'react';
import { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from 'react';

import { selectedMessageStore } from '../../providers/SelectedMessagesProvider';

type SelectMessageContextValue = {
	selectedMessageStore: typeof selectedMessageStore;
};

export const SelectedMessageContext = createContext({
	selectedMessageStore,
} as SelectMessageContextValue);

export const useIsSelectedMessage = (mid: string, omit?: boolean): boolean => {
    /* Implementation Hidden */
};

export const useIsSelecting = (): boolean => {
    /* Implementation Hidden */
};

export const useToggleSelect = (mid: string): ((event?: SyntheticEvent<HTMLElement>) => void) => {
    /* Implementation Hidden */
};

export const useToggleSelectAll = (): (() => void) => {
    /* Implementation Hidden */
};

export const useClearSelection = (): (() => void) => {
    /* Implementation Hidden */
};

export const useCountSelected = (): number => {
    /* Implementation Hidden */
};

export const useAvailableMessagesCount = () => {
    /* Implementation Hidden */
};

```