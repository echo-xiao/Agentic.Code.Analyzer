## File: apps/meteor/client/views/admin/users/AdminUserForm.tsx

```typescript
import type { AvatarObject, IRole, IUser, Serialized } from '@rocket.chat/core-typings';
import {
	Field,
	FieldLabel,
	FieldRow,
	FieldError,
	FieldHint,
	TextInput,
	TextAreaInput,
	MultiSelectFiltered,
	Box,
	ToggleSwitch,
	Icon,
	FieldGroup,
	Button,
	Callout,
	Skeleton,
} from '@rocket.chat/fuselage';
import type { SelectOption } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import type { UserCreateParamsPOST } from '@rocket.chat/rest-typings';
import { validateEmail } from '@rocket.chat/tools';
import { CustomFieldsForm, ContextualbarScrollableContent, ContextualbarFooter } from '@rocket.chat/ui-client';
import {
	useAccountsCustomFields,
	useSetting,
	useEndpoint,
	useRouter,
	useToastMessageDispatch,
	useTranslation,
} from '@rocket.chat/ui-contexts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useId, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Trans } from 'react-i18next';

import AdminUserSetRandomPasswordContent from './AdminUserSetRandomPasswordContent';
import AdminUserSetRandomPasswordRadios from './AdminUserSetRandomPasswordRadios';
import PasswordFieldSkeleton from './PasswordFieldSkeleton';
import { useSmtpQuery } from './hooks/useSmtpQuery';
import { useShowVoipExtension } from './useShowVoipExtension';
import { parseCSV } from '../../../../lib/utils/parseCSV';
import UserAvatarEditor from '../../../components/avatar/UserAvatarEditor';
import { useEndpointMutation } from '../../../hooks/useEndpointMutation';
import { useUpdateAvatar } from '../../../hooks/useUpdateAvatar';
import { USER_STATUS_TEXT_MAX_LENGTH, BIO_TEXT_MAX_LENGTH } from '../../../lib/constants';

export type AdminUserFormProps = {
	userData?: Serialized<IUser>;
	onReload: () => void;
	context: string;
	refetchUserFormData?: () => void;
	roleData: { roles: Serialized<IRole>[] } | undefined;
	roleError: Error | null;
};

export type UserFormProps = Omit<
	UserCreateParamsPOST & { avatar: AvatarObject; passwordConfirmation: string; freeSwitchExtension?: string },
	'fields'
>;

const getInitialValue = ({
	data,
	defaultUserRoles,
	isSmtpEnabled,
	isVerificationNeeded,
	isNewUserPage,
}: {
	data?: Serialized<IUser>;
	defaultUserRoles?: IUser['roles'];
	isSmtpEnabled?: boolean;
	isVerificationNeeded?: boolean;
	isNewUserPage?: boolean;
}): UserFormProps => ({
	roles: data?.roles ?? defaultUserRoles,
	name: data?.name ?? '',
	password: '',
	username: data?.username ?? '',
	bio: data?.bio ?? '',
	nickname: data?.nickname ?? '',
	email: (data?.emails?.length && data.emails[0].address) || '',
	verified: isSmtpEnabled && isVerificationNeeded && ((data?.emails?.length && data.emails[0].verified) || false),
	setRandomPassword: isNewUserPage && isSmtpEnabled,
	requirePasswordChange: isNewUserPage && isSmtpEnabled && (data?.requirePasswordChange ?? true),
	customFields: data?.customFields ?? {},
	statusText: data?.statusText ?? '',
	freeSwitchExtension: data?.freeSwitchExtension ?? '',
	...(isNewUserPage && { joinDefaultChannels: true }),
	sendWelcomeEmail: isSmtpEnabled,
	avatar: '' as AvatarObject,
	passwordConfirmation: '',
});

const AdminUserForm = ({ userData, onReload, context, refetchUserFormData, roleData, roleError, ...props }: AdminUserFormProps) => {
    /* Implementation Hidden */
};

export default AdminUserForm;

```