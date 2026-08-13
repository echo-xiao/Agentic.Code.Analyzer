## File: apps/meteor/client/views/omnichannel/components/outboundMessage/components/OutboundMessageWizard/OutboundMessageWizard.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useToastBarDispatch } from '@rocket.chat/fuselage-toastbar';
import { Wizard, useWizard, WizardContent, WizardTabs } from '@rocket.chat/ui-client';
import { usePermission } from '@rocket.chat/ui-contexts';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useLayoutEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';

import OutboundMessageWizardErrorState from './components/OutboundMessageWizardErrorState';
import OutboubdMessageWizardSkeleton from './components/OutboundMessageWizardSkeleton';
import type { SubmitPayload } from './forms';
import { ReviewStep, MessageStep, RecipientStep, RepliesStep } from './steps';
import GenericError from '../../../../../../components/GenericError';
import { useEndpointMutation } from '../../../../../../hooks/useEndpointMutation';
import { useHasLicenseModule } from '../../../../../../hooks/useHasLicenseModule';
import { formatPhoneNumber } from '../../../../../../lib/formatPhoneNumber';
import { omnichannelQueryKeys } from '../../../../../../lib/queryKeys';
import { useOmnichannelEnabled } from '../../../../hooks/useOmnichannelEnabled';
import useOutboundProvidersList from '../../hooks/useOutboundProvidersList';
import { useOutboundMessageUpsellModal } from '../../modals';
import { formatOutboundMessagePayload, isMessageStepValid, isRecipientStepValid, isRepliesStepValid } from '../../utils/outbound-message';

type OutboundMessageWizardProps = {
	defaultValues?: Partial<Pick<SubmitPayload, 'contactId' | 'providerId' | 'recipient' | 'sender'>>;
	onSuccess?(): void;
	onError?(): void;
};

const OutboundMessageWizard = ({ defaultValues = {}, onSuccess, onError }: OutboundMessageWizardProps) => {
    /* Implementation Hidden */
};

export default OutboundMessageWizard;

```