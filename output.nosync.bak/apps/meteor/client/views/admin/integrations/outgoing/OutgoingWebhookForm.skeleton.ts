## File: apps/meteor/client/views/admin/integrations/outgoing/OutgoingWebhookForm.tsx

```typescript
import type { IOutgoingIntegration } from '@rocket.chat/core-typings';
import type { SelectOption } from '@rocket.chat/fuselage';
import {
	FieldError,
	AccordionItem,
	FieldHint,
	FieldLabel,
	FieldRow,
	Field,
	TextInput,
	Box,
	ToggleSwitch,
	Icon,
	TextAreaInput,
	FieldGroup,
	Select,
	Accordion,
	NumberInput,
} from '@rocket.chat/fuselage';
import DOMPurify from 'dompurify';
import { useId, useMemo } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';

import { outgoingEvents } from '../../../../../app/integrations/lib/outgoingEvents';
import { useHighlightedCode } from '../../../../hooks/useHighlightedCode';
import { useExampleData } from '../hooks/useExampleIncomingData';

type EditOutgoingWebhookPayload = Pick<
	IOutgoingIntegration,
	| 'enabled'
	| 'impersonateUser'
	| 'event'
	| 'urls'
	| 'token'
	| 'triggerWords'
	| 'targetRoom'
	| 'channel'
	| 'username'
	| 'name'
	| 'alias'
	| 'avatar'
	| 'emoji'
	| 'scriptEnabled'
	| 'scriptEngine'
	| 'script'
	| 'retryFailedCalls'
	| 'retryCount'
	| 'retryDelay'
	| 'triggerWordAnywhere'
	| 'runOnEdits'
>;

const OutgoingWebhookForm = () => {
    /* Implementation Hidden */
};

export default OutgoingWebhookForm;

```