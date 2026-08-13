## File: packages/ui-client/src/views/setupWizard/steps/CloudAccountConfirmation.tsx

```typescript
import { AwaitingConfirmationPage } from '@rocket.chat/onboarding-ui';
import { useToastMessageDispatch, useSettingSetValue, useEndpoint } from '@rocket.chat/ui-contexts';
import { useEffect, useCallback } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';

import { useSetupWizardContext } from '../contexts/SetupWizardContext';

const setIntervalTime = (interval?: number): number => (interval ? interval * 1000 : 0);

const CloudAccountConfirmation = () => {
    /* Implementation Hidden */
};

export default CloudAccountConfirmation;

```