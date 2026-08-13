## File: apps/meteor/client/views/admin/emailInbox/EmailInboxForm.tsx

```typescript
import type { IEmailInboxPayload } from '@rocket.chat/core-typings';
import {
	Accordion,
	AccordionItem,
	Button,
	ButtonGroup,
	TextInput,
	TextAreaInput,
	Field,
	ToggleSwitch,
	FieldGroup,
	Box,
	Margins,
	NumberInput,
	PasswordInput,
	FieldLabel,
	FieldRow,
	FieldError,
	FieldHint,
} from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { validateEmail } from '@rocket.chat/tools';
import { GenericModal, PageScrollableContentWithShadow } from '@rocket.chat/ui-client';
import { useSetModal, useToastMessageDispatch, useRoute, useEndpoint } from '@rocket.chat/ui-contexts';
import { useId, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import AutoCompleteDepartment from '../../omnichannel/components/AutoCompleteDepartment';

type EmailInboxFormData = {
	active: boolean;
	name: string;
	email: string;
	description?: string;
	senderInfo?: string;
	department?: string;
	smtpServer: string;
	smtpPort: string;
	smtpUsername: string;
	smtpPassword: string;
	smtpSecure: boolean;
	imapServer: string;
	imapPort: string;
	imapUsername: string;
	imapPassword: string;
	imapSecure: boolean;
	imapRetries: string;
};

export type EmailInboxFormProps = {
	inboxData?: IEmailInboxPayload;
};

const EmailInboxForm = ({ inboxData }: EmailInboxFormProps) => {
    /* Implementation Hidden */
};

export default EmailInboxForm;

```