## File: packages/mock-providers/src/MockedRouterContext.tsx

```typescript
import { RouterContext } from '@rocket.chat/ui-contexts';
import type { ContextType, ReactNode } from 'react';

export const MockedRouterContext = ({ children, router }: { children: ReactNode; router?: Partial<ContextType<typeof RouterContext>> }) => {
    /* Implementation Hidden */
};

```