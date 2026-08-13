## File: packages/mock-providers/src/MockedUserContext.tsx

```typescript
import { UserContext } from '@rocket.chat/ui-contexts';
import type { ContextType, ReactNode } from 'react';

const userContextValue: ContextType<typeof UserContext> = {
	userId: 'john.doe',
	user: {
		_id: 'john.doe',
		username: 'john.doe',
		name: 'John Doe',
		createdAt: new Date(),
		active: true,
		_updatedAt: new Date(),
		roles: ['admin'],
		type: 'user',
	},
	queryPreference: (<T,>(pref: string, defaultValue: T) => [
		() => () => undefined,
		() => (typeof pref === 'string' ? undefined : defaultValue),
	]) as any,
	querySubscriptions: () => [() => () => undefined, () => []],
	querySubscription: () => [() => () => undefined, () => undefined],
	queryRoom: () => [() => () => undefined, () => undefined],

	logout: () => Promise.resolve(),
	onLogout: () => () => undefined,
};

const createUserContextValue = ({ userPreferences }: { userPreferences?: Record<string, unknown> }): ContextType<typeof UserContext> => {
    /* Implementation Hidden */
};

export const MockedUserContext = ({ userPreferences, children }: { children: ReactNode; userPreferences?: Record<string, unknown> }) => {
    /* Implementation Hidden */
};

```