## File: packages/web-ui-registration/src/LoginForm.tsx

```typescript
import {
	FieldGroup,
	TextInput,
	Field,
	FieldLabel,
	FieldRow,
	FieldError,
	FieldLink,
	PasswordInput,
	ButtonGroup,
	Button,
	Callout,
} from '@rocket.chat/fuselage';
import { Form, FormContainer, FormFooter, FormHeader, FormTitle, ActionLink } from '@rocket.chat/layout';
import { useDocumentTitle } from '@rocket.chat/ui-client';
import { useLoginWithPassword, useSetting } from '@rocket.chat/ui-contexts';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useId, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';

import EmailConfirmationForm from './EmailConfirmationForm';
import LoginServices from './LoginServices';
import type { DispatchLoginRouter } from './hooks/useLoginRouter';

const LOGIN_SUBMIT_ERRORS = {
	'error-user-is-not-activated': {
		type: 'warning',
		i18n: 'registration.page.registration.waitActivationWarning',
	},
	'error-app-user-is-not-allowed-to-login': {
		type: 'danger',
		i18n: 'registration.page.login.errors.AppUserNotAllowedToLogin',
	},
	'error-login-blocked-for-ip': {
		type: 'danger',
		i18n: 'registration.page.login.errors.loginBlockedForIp',
	},
	'error-login-blocked-for-user': {
		type: 'danger',
		i18n: 'registration.page.login.errors.loginBlockedForUser',
	},
	'error-license-user-limit-reached': {
		type: 'warning',
		i18n: 'registration.page.login.errors.licenseUserLimitReached',
	},
	'error-invalid-email': {
		type: 'danger',
		i18n: 'registration.page.login.errors.invalidEmail',
	},
} as const;

export type LoginErrors = keyof typeof LOGIN_SUBMIT_ERRORS | 'totp-canceled' | string;

export type LoginErrorState = [error: LoginErrors, message?: string] | undefined;

export const LoginForm = ({ setLoginRoute }: { setLoginRoute: DispatchLoginRouter }) => {
    /* Implementation Hidden */
};

export default LoginForm;

```