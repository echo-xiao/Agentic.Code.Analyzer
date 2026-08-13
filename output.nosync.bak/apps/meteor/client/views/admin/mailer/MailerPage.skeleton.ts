## File: apps/meteor/client/views/admin/mailer/MailerPage.tsx

```typescript
import {
	TextInput,
	TextAreaInput,
	Field,
	FieldGroup,
	FieldLabel,
	FieldRow,
	FieldError,
	FieldHint,
	CheckBox,
	Button,
	ButtonGroup,
	Box,
} from '@rocket.chat/fuselage';
import { validateEmail } from '@rocket.chat/tools';
import { Page, PageHeader, PageScrollableContentWithShadow, PageFooter } from '@rocket.chat/ui-client';
import { useEndpoint, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useMutation } from '@tanstack/react-query';
import { useId } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';

import { isJSON } from '../../../../lib/utils/isJSON';

type SendEmailFormValue = {
	fromEmail: string;
	subject: string;
	emailBody: string;
	dryRun: boolean;
	query?: string;
};

const initialData = { fromEmail: '', query: '', dryRun: false, subject: '', emailBody: '' };

const MailerPage = () => {
    /* Implementation Hidden */
};

export default MailerPage;

```