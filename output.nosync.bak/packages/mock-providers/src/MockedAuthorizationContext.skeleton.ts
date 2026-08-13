## File: packages/mock-providers/src/MockedAuthorizationContext.tsx

```typescript
import { AuthorizationContext } from '@rocket.chat/ui-contexts';
import type { ContextType, ReactNode } from 'react';

const dummyRolesMap: ReturnType<ContextType<typeof AuthorizationContext>['getRoles']> = new Map();

export const MockedAuthorizationContext = ({
	permissions = [],
	roles = [],
	children,
}: {
	permissions: string[];
	roles?: string[];
	children: ReactNode;
}) => {
    /* Implementation Hidden */
};

```