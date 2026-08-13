## File: packages/ui-contexts/src/hooks/useCurrentModal.ts

```typescript
import { useContext } from 'react';

import type { ModalContextValue } from '../ModalContext';
import { ModalContext } from '../ModalContext';

/**
 * Similar to useModal this hook return the current modal from the context value
 */
export const useCurrentModal = (): ModalContextValue['currentModal']['component'] => {
    /* Implementation Hidden */
};

```