## File: apps/meteor/client/views/account/profile/AccountProfileForm.tsx

```typescript
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { UserStatus } from '@rocket.chat/core-typings';
import { css } from '@rocket.chat/css-in-js';
import type { SelectOption } from '@rocket.chat/fuselage';
import { Box, Button, Divider, Icon, InputBox, Margins } from '@rocket.chat/fuselage';
import {
	Field,
	FieldGroup,
	FieldLabel,
	FieldRow,
	FieldError,
	FieldHint,
	TextInput,
	TextAreaInput,
	Select,
} from '@rocket.chat/fuselage-forms';
import { validateEmail } from '@rocket.chat/tools';
import { CustomFieldsForm } from '@rocket.chat/ui-client';
import {
	useAccountsCustomFields,
	useToastMessageDispatch,
	useTranslation,
	useEndpoint,
	useUser,
	useLayout,
} from '@rocket.chat/ui-contexts';
import { useMutation } from '@tanstack/react-query';
import type { AllHTMLAttributes, ChangeEvent } from 'react';
import { useCallback, useEffect, useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import type { AccountProfileFormValues } from './getProfileInitialValues';
import { useAccountProfileSettings } from './useAccountProfileSettings';
import { getUserEmailAddress } from '../../../../lib/getUserEmailAddress';
import UserStatusMenu from '../../../components/UserStatusMenu';
import UserAvatarEditor from '../../../components/avatar/UserAvatarEditor';
import { useUpdateAvatar } from '../../../hooks/useUpdateAvatar';
import { USER_STATUS_TEXT_MAX_LENGTH, BIO_TEXT_MAX_LENGTH } from '../../../lib/constants';
import { STATUS_DURATION_OPTIONS, validateStatusExpiration } from '../../../lib/statusDurations';

const AccountProfileForm = (props: AllHTMLAttributes<HTMLFormElement>) => {
    /* Implementation Hidden */
};

export default AccountProfileForm;

```