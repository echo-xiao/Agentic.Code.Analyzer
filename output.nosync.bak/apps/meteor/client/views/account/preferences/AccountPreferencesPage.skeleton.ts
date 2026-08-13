## File: apps/meteor/client/views/account/preferences/AccountPreferencesPage.tsx

```typescript
import { ButtonGroup, Button, Box, Accordion } from '@rocket.chat/fuselage';
import { Page, PageHeader, PageScrollableContentWithShadow, PageFooter } from '@rocket.chat/ui-client';
import { useToastMessageDispatch, useSetting, useTranslation, useEndpoint } from '@rocket.chat/ui-contexts';
import { useMutation } from '@tanstack/react-query';
import { useId } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import PreferencesGlobalSection from './PreferencesGlobalSection';
import PreferencesHighlightsSection from './PreferencesHighlightsSection';
import PreferencesLocalizationSection from './PreferencesLocalizationSection';
import PreferencesMessagesSection from './PreferencesMessagesSection';
import PreferencesMyDataSection from './PreferencesMyDataSection';
import PreferencesNotificationsSection from './PreferencesNotificationsSection';
import PreferencesSoundSection from './PreferencesSoundSection';
import PreferencesUserPresenceSection from './PreferencesUserPresenceSection';
import type { AccountPreferencesData } from './useAccountPreferencesValues';
import { useAccountPreferencesValues } from './useAccountPreferencesValues';
import { getDirtyFields } from '../../../lib/getDirtyFields';

const AccountPreferencesPage = () => {
    /* Implementation Hidden */
};

export default AccountPreferencesPage;

```