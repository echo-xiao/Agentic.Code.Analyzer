## File: packages/ui-client/src/views/setupWizard/providers/SetupWizardProvider.tsx

```typescript
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { validateEmail } from '@rocket.chat/tools';
import {
	useToastMessageDispatch,
	useSessionDispatch,
	useLoginWithPassword,
	useSettingSetValue,
	useSettingsDispatch,
	useMethod,
	useEndpoint,
	useTranslation,
} from '@rocket.chat/ui-contexts';
import { useQueryClient } from '@tanstack/react-query';
import type { ContextType, ReactNode } from 'react';
import { useCallback, useMemo, useState } from 'react';

import { useInvalidateLicense } from '../../../hooks';
import { clientCallbacks } from '../../../lib';
import { SetupWizardContext } from '../contexts/SetupWizardContext';
import { useParameters } from '../hooks/useParameters';
import { useStepRouting } from '../hooks/useStepRouting';

const initialData: ContextType<typeof SetupWizardContext>['setupWizardData'] = {
	organizationData: {
		organizationName: '',
		organizationIndustry: '',
		organizationSize: '',
		country: '',
	},
	serverData: {
		agreement: false,
		email: '',
		updates: false,
	},
	registrationData: { cloudEmail: '', device_code: '', user_code: '' },
};

type HandleRegisterServer = (params: { email: string; resend?: boolean }) => Promise<void>;

type SetupWizardProviderProps = {
	children: ReactNode;
};

const SetupWizardProvider = ({ children }: SetupWizardProviderProps) => {
    /* Implementation Hidden */
};

export default SetupWizardProvider;

```