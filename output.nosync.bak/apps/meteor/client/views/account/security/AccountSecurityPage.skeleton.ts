## File: apps/meteor/client/views/account/security/AccountSecurityPage.tsx

```typescript
import { Box, Accordion, AccordionItem, ButtonGroup, Button, Callout } from '@rocket.chat/fuselage';
import { Page, PageHeader, PageScrollableContentWithShadow, PageFooter } from '@rocket.chat/ui-client';
import { useSetting, useTranslation, useUser } from '@rocket.chat/ui-contexts';
import { useId } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import ChangePassword from './ChangePassword';
import EndToEnd from './EndToEnd';
import TwoFactorEmail from './TwoFactorEmail';
import TwoFactorTOTP from './TwoFactorTOTP';
import { useRequire2faSetup } from '../../hooks/useRequire2faSetup';

const passwordDefaultValues = { password: '', confirmationPassword: '' };

const AccountSecurityPage = () => {
    /* Implementation Hidden */
};

export default AccountSecurityPage;

```