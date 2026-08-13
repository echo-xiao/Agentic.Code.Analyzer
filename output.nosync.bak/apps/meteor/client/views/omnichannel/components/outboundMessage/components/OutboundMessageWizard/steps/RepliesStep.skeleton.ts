## File: apps/meteor/client/views/omnichannel/components/outboundMessage/components/OutboundMessageWizard/steps/RepliesStep.tsx

```typescript
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useWizardContext, WizardActions, WizardBackButton, WizardNextButton } from '@rocket.chat/ui-client';

import type { RepliesFormData, RepliesFormSubmitPayload } from '../forms/RepliesForm';
import RepliesForm from '../forms/RepliesForm';

type RepliesStepProps = {
	defaultValues?: Partial<RepliesFormData>;
	onSubmit(values: RepliesFormSubmitPayload): void;
};

const RepliesStep = ({ defaultValues, onSubmit }: RepliesStepProps) => {
    /* Implementation Hidden */
};

export default RepliesStep;

```