## File: apps/meteor/client/navbar/NavBarSearch/hooks/useSearchNavigation.ts

```typescript
import { useFocusManager } from '@react-aria/focus';
import type { OverlayTriggerState } from '@react-stately/overlays';
import type { KeyboardEvent } from 'react';
import { useCallback } from 'react';

export const isOption = (node: Element) => node.getAttribute('role') === 'option';

export const useListboxNavigation = (state: OverlayTriggerState) => {
    /* Implementation Hidden */
};

export const useSearchInputNavigation = (state: OverlayTriggerState) => {
    /* Implementation Hidden */
};

```