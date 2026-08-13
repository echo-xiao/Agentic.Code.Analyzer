## File: apps/meteor/client/hooks/useRouterScrollToHash.ts

```typescript
import { usePrefersReducedMotion } from '@rocket.chat/fuselage-hooks';
import type { RouterContextValue } from '@rocket.chat/ui-contexts';
import { useEffect, useRef, useSyncExternalStore } from 'react';

/**
 * Scrolls to the element matching the current URL hash on route changes.
 *
 * @see docs/anchor-navigation.md
 */
export const useRouterScrollToHash = (router: RouterContextValue) => {
    /* Implementation Hidden */
};

```