## File: apps/meteor/client/views/omnichannel/components/outboundMessage/components/OutboundMessageWizard/steps/MessageStep.tsx

```typescript
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useWizardContext, WizardActions, WizardBackButton, WizardNextButton } from '@rocket.chat/ui-client';
import type { ComponentProps } from 'react';

import type { MessageFormSubmitPayload } from '../forms/MessageForm';
import MessageForm from '../forms/MessageForm';

type MessageStepProps = Omit<ComponentProps<typeof MessageForm>, 'onSubmit'> & {
	onSubmit(values: MessageFormSubmitPayload): void;
};

const MessageStep = ({ contact, templates, defaultValues, onSubmit }: MessageStepProps) => {
    /* Implementation Hidden */
};

export default MessageStep;

```