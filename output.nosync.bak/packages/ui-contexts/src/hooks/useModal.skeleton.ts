## File: packages/ui-contexts/src/hooks/useModal.ts

```typescript
import { useContext } from 'react';

import type { ModalContextValue } from '../ModalContext';
import { ModalContext } from '../ModalContext';

/**
 * Consider using useCurrentModal to get the current modal
 */
export const useModal = (): ModalContextValue['modal'] => {
    /* Implementation Hidden */
};

```