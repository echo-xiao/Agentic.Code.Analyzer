## File: packages/ui-client/src/components/Wizard/useWizardSteps.ts

```typescript
import { useCallback, useRef, useSyncExternalStore } from 'react';

import type StepNode from './lib/StepNode';
import type StepsLinkedList from './lib/StepsLinkedList';

/**
 * Custom hook to manage the state of wizard steps.
 * It uses a linked list to store the steps and provides a way to subscribe to changes.
 *
 * @param list - The linked list containing the steps.
 * @returns The current state of the steps.
 */
export const useWizardSteps = (list: StepsLinkedList) => {
    /* Implementation Hidden */
};

```