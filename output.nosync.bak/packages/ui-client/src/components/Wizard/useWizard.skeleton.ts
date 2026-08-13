## File: packages/ui-client/src/components/Wizard/useWizard.ts

```typescript
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useMemo, useState } from 'react';

import type { WizardAPI } from './WizardContext';
import type { StepMetadata } from './lib/StepNode';
import type StepNode from './lib/StepNode';
import StepsLinkedList from './lib/StepsLinkedList';

type UseWizardProps = {
	steps: StepMetadata[];
};

/**
 * Custom hook to manage the state and navigation of a wizard.
 * It provides methods to register steps, navigate between them, and manage their state.
 *
 * @param props - The properties for the wizard.
 * @returns The API for managing the wizard state and navigation.
 */
export const useWizard = ({ steps: stepsMetadata }: UseWizardProps): WizardAPI => {
    /* Implementation Hidden */
};

```