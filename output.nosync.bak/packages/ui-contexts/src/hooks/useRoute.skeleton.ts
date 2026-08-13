## File: packages/ui-contexts/src/hooks/useRoute.ts

```typescript
import { useContext, useMemo } from 'react';

import type { RouteName, RouteParameters } from '../RouterContext';
import { RouterContext } from '../RouterContext';

type Route = {
	push: (
		parameters?: RouteParameters,
		queryStringParameters?: ((prev: Record<string, string>) => Record<string, string>) | Record<string, string>,
	) => void;
	replace: (
		parameters?: RouteParameters,
		queryStringParameters?: ((prev: Record<string, string>) => Record<string, string>) | Record<string, string>,
	) => void;
};

/** @deprecated prefer `useRouter` */
export const useRoute = (name: RouteName): Route => {
    /* Implementation Hidden */
};

```