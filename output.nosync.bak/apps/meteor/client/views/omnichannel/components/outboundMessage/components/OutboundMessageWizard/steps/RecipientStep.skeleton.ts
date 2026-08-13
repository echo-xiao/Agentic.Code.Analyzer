## File: apps/meteor/client/views/omnichannel/components/outboundMessage/components/OutboundMessageWizard/steps/RecipientStep.tsx

```typescript
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useWizardContext, WizardActions, WizardNextButton } from '@rocket.chat/ui-client';

import type { RecipientFormData, RecipientFormSubmitPayload } from '../forms/RecipientForm';
import RecipientForm from '../forms/RecipientForm';

type RecipientStepProps = {
	defaultValues?: Partial<RecipientFormData>;
	onDirty?: () => void;
	onSubmit(values: RecipientFormSubmitPayload): void;
};

const RecipientStep = ({ defaultValues, onDirty, onSubmit }: RecipientStepProps) => {
    /* Implementation Hidden */
};

export default RecipientStep;

```