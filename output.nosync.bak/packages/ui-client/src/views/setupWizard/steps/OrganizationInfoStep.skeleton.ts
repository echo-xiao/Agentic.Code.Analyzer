## File: packages/ui-client/src/views/setupWizard/steps/OrganizationInfoStep.tsx

```typescript
import type { ISetting } from '@rocket.chat/core-typings';
import { OrganizationInfoPage } from '@rocket.chat/onboarding-ui';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useRole } from '@rocket.chat/ui-contexts';
import type { TFunction } from 'i18next';
import type { ComponentProps } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';

import { useSetupWizardContext } from '../contexts/SetupWizardContext';

const getSettingOptions = (
	settings: Array<ISetting> | undefined,
	settingId: ISetting['_id'],
	t: TFunction,
): Array<[key: string, text: string]> => {
    /* Implementation Hidden */
};

const OrganizationInfoStep = () => {
    /* Implementation Hidden */
};

export default OrganizationInfoStep;

```