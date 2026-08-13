## File: apps/meteor/client/views/omnichannel/components/outboundMessage/components/OutboundMessageWizard/steps/ReviewStep.tsx

```typescript
import { Box, Button, Scrollable } from '@rocket.chat/fuselage';
import { WizardActions, WizardBackButton } from '@rocket.chat/ui-client';
import { useMutation } from '@tanstack/react-query';
import type { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';

import OutboundMessagePreview from '../../OutboundMessagePreview';

type ReviewStepProps = ComponentProps<typeof OutboundMessagePreview> & {
	onSend(): Promise<void>;
};

const ReviewStep = ({ onSend, ...props }: ReviewStepProps) => {
    /* Implementation Hidden */
};

export default ReviewStep;

```