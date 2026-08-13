## File: apps/meteor/client/views/account/profile/AccountProfilePage.tsx

```typescript
import { ButtonGroup, Button, Box } from '@rocket.chat/fuselage';
import { SHA256 } from '@rocket.chat/sha256';
import { Page, PageFooter, PageHeader, PageScrollableContentWithShadow } from '@rocket.chat/ui-client';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import {
	useSetModal,
	useToastMessageDispatch,
	useUser,
	useLogout,
	useEndpoint,
	useTranslation,
	useSetting,
	useLayout,
} from '@rocket.chat/ui-contexts';
import { useId, useState, useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import AccountProfileForm from './AccountProfileForm';
import ActionConfirmModal from './ActionConfirmModal';
import { getProfileInitialValues } from './getProfileInitialValues';
import ConfirmOwnerChangeModal from '../../../components/ConfirmOwnerChangeModal';
import { useAllowPasswordChange } from '../security/useAllowPasswordChange';

// TODO: enforce useMutation
const AccountProfilePage = () => {
    /* Implementation Hidden */
};

export default AccountProfilePage;

```