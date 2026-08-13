## File: packages/ui-contexts/src/SessionContext.ts

```typescript
import { createContext } from 'react';

export type SessionContextValue = {
	query: (name: string) => [subscribe: (onStoreChange: () => void) => () => void, getSnapshot: () => unknown];
	dispatch: (name: string, value: unknown) => void;
};

export const SessionContext = createContext<SessionContextValue>({
	query: () => [() => (): void => undefined, (): undefined => undefined],
	dispatch: (): void => undefined,
});

```