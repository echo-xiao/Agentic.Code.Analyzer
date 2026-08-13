## File: apps/meteor/client/views/admin/integrations/incoming/IncomingWebhookForm.tsx

```typescript
import type { IIncomingIntegration, Serialized } from '@rocket.chat/core-typings';
import type { SelectOption } from '@rocket.chat/fuselage';
import {
	FieldError,
	IconButton,
	Accordion,
	AccordionItem,
	Field,
	TextInput,
	Box,
	ToggleSwitch,
	Icon,
	TextAreaInput,
	FieldGroup,
	Select,
	FieldLabel,
	FieldRow,
	FieldHint,
} from '@rocket.chat/fuselage';
import { useAbsoluteUrl } from '@rocket.chat/ui-contexts';
import DOMPurify from 'dompurify';
import { useId, useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';

import type { EditIncomingWebhookFormData } from './EditIncomingWebhook';
import useClipboardWithToast from '../../../../hooks/useClipboardWithToast';
import { useHighlightedCode } from '../../../../hooks/useHighlightedCode';
import { useExampleData } from '../hooks/useExampleIncomingData';

export type IncomingWebhookFormProps = { webhookData?: Serialized<IIncomingIntegration> };

const IncomingWebhookForm = ({ webhookData }: IncomingWebhookFormProps) => {
    /* Implementation Hidden */
};

export default IncomingWebhookForm;

```