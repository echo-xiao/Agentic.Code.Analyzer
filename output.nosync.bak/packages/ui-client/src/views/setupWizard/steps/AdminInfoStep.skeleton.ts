## File: packages/ui-client/src/views/setupWizard/steps/AdminInfoStep.tsx

```typescript
import { AdminInfoPage } from '@rocket.chat/onboarding-ui';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import { useSetting, useVerifyPassword, usePasswordPolicy, usePasswordPolicyOptions } from '@rocket.chat/ui-contexts';
import type { ComponentProps } from 'react';
import { useMemo } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';

import { useSetupWizardContext } from '../contexts/SetupWizardContext';

const toRegExp = (username: string): RegExp => new RegExp(`^${escapeRegExp(username).trim()}$`, 'i');
const usernameBlackList = ['all', 'here', 'admin'].map(toRegExp);
const hasBlockedName = (username: string): boolean =>
	!!usernameBlackList.length && usernameBlackList.some((restrictedUsername) => restrictedUsername.test(escapeRegExp(username).trim()));

const AdminInfoStep = () => {
    /* Implementation Hidden */
};

export default AdminInfoStep;

```