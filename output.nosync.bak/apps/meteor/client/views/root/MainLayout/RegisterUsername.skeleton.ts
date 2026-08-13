## File: apps/meteor/client/views/root/MainLayout/RegisterUsername.tsx

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { TextInput, ButtonGroup, Button, FieldGroup, Field, FieldLabel, FieldRow, FieldError, Box } from '@rocket.chat/fuselage';
import { VerticalWizardLayout, Form, FormContainer, FormFooter, FormHeader, FormSubtitle, FormTitle } from '@rocket.chat/layout';
import { CustomFieldsForm } from '@rocket.chat/ui-client';
import {
	useSetting,
	useTranslation,
	useLogout,
	useEndpoint,
	useUserId,
	useToastMessageDispatch,
	useAssetWithDarkModePath,
	useAccountsCustomFields,
} from '@rocket.chat/ui-contexts';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useId } from 'react';
import { useForm } from 'react-hook-form';

import MarkdownText from '../../../components/MarkdownText';

type RegisterUsernamePayload = {
	username: Exclude<IUser['username'], undefined>;
} & IUser['customFields'];

const RegisterUsername = () => {
    /* Implementation Hidden */
};

export default RegisterUsername;

```