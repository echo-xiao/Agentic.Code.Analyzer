## File: packages/ui-client/src/views/setupWizard/steps/RegisterServerStep.tsx

```typescript
import { RegisterServerPage, RegisterOfflinePage } from '@rocket.chat/onboarding-ui';
import { useEndpoint, useMethod, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';

import { useInvalidateLicense } from '../../../hooks';
import { links } from '../../../lib/links';
import { useSetupWizardContext } from '../contexts/SetupWizardContext';

const SERVER_OPTIONS = {
	REGISTERED: 'REGISTERED',
	OFFLINE: 'OFFLINE',
};

const RegisterServerStep = () => {
    /* Implementation Hidden */
};

export default RegisterServerStep;

```