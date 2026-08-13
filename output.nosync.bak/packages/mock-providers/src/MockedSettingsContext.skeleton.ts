## File: packages/mock-providers/src/MockedSettingsContext.tsx

```typescript
import type { ISetting } from '@rocket.chat/core-typings';
import { SettingsContext } from '@rocket.chat/ui-contexts';
import type { ContextType, ReactNode } from 'react';

const settingContextValue: ContextType<typeof SettingsContext> = {
	hasPrivateAccess: true,
	querySetting: (_id: string) => [() => () => undefined, () => undefined],
	querySettings: () => [() => () => undefined, () => []],
	dispatch: async () => undefined,
};

const createSettingContextValue = ({ settings }: { settings?: Record<string, ISetting['value']> }): ContextType<typeof SettingsContext> => {
    /* Implementation Hidden */
};

export const MockedSettingsContext = ({ settings, children }: { children: ReactNode; settings?: Record<string, ISetting['value']> }) => {
    /* Implementation Hidden */
};

```