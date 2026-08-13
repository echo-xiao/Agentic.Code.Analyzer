## File: packages/ui-client/src/hooks/useDocumentTitle.ts

```typescript
import { Emitter } from '@rocket.chat/emitter';
import { useCallback, useEffect, useSyncExternalStore } from 'react';

const ee = new Emitter<{
	change: void;
}>();

const titles = new Set<{
	title?: string;
	refocus?: boolean;
}>();

const useReactiveDocumentTitle = (): string =>
	useSyncExternalStore(
		useCallback((callback: () => void) => ee.on('change', callback), []),
		(): string =>
			Array.from(titles)
				.reverse()
				.map(({ title }) => title)
				.join(' - '),
	);

const useReactiveDocumentTitleKey = (): string =>
	useSyncExternalStore(
		useCallback((callback: () => void) => ee.on('change', callback), []),
		(): string =>
			Array.from(titles)
				.filter(({ refocus }) => refocus)
				.map(({ title }) => title)
				.join(' - '),
	);

export const useDocumentTitle = (documentTitle?: string, refocus = true) => {
    /* Implementation Hidden */
};

```