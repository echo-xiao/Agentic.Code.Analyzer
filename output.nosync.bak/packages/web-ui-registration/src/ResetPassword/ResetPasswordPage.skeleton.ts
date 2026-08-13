## File: packages/web-ui-registration/src/ResetPassword/ResetPasswordPage.tsx

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { Button, FieldGroup, Field, FieldLabel, ButtonGroup, PasswordInput, FieldRow, FieldError } from '@rocket.chat/fuselage';
import { Form, FormContainer, FormFooter, FormHeader, FormSubtitle, FormTitle } from '@rocket.chat/layout';
import { PasswordVerifier, useValidatePassword } from '@rocket.chat/ui-client';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import {
	useSetting,
	useRouter,
	useRouteParameter,
	useUser,
	useMethod,
	useTranslation,
	useLoginWithToken,
	useEndpoint,
} from '@rocket.chat/ui-contexts';
import { useEffect, useId, useRef } from 'react';
import { useForm } from 'react-hook-form';

import HorizontalTemplate from '../template/HorizontalTemplate';

const getChangePasswordReason = ({
	requirePasswordChange,
	requirePasswordChangeReason = requirePasswordChange ? 'You_need_to_change_your_password' : 'Please_enter_your_new_password_below',
}: Pick<IUser, 'requirePasswordChange' | 'requirePasswordChangeReason'> = {}) => requirePasswordChangeReason as TranslationKey;

const ResetPasswordPage = () => {
    /* Implementation Hidden */
};

export default ResetPasswordPage;

```