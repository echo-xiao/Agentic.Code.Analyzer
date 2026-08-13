## File: packages/fuselage-ui-kit/src/contexts/AppIdContext.tsx

```typescript
import type { ReactNode } from 'react';
import { createContext, useContext, useDebugValue } from 'react';

import { UiKitContext } from './UiKitContext';

const AppIdContext = createContext<string | undefined>(undefined);

export type AppIdProviderProps = {
	children: ReactNode;
	appId?: string;
};

export const AppIdProvider = ({ children, appId }: AppIdProviderProps) => {
    /* Implementation Hidden */
};

export const useAppId = () => {
    /* Implementation Hidden */
};

```