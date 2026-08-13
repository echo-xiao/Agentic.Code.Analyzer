## File: apps/meteor/client/views/omnichannel/components/outboundMessage/components/OutboundMessageWizard/forms/MessageForm/MessageForm.tsx

```typescript
import type { IOutboundProviderTemplate, Serialized, ILivechatContact } from '@rocket.chat/core-typings';
import { Box, Button, FieldGroup, Scrollable } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useToastBarDispatch } from '@rocket.chat/fuselage-toastbar';
import type { ReactNode } from 'react';
import { useId, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import TemplateField from './components/TemplateField';
import TemplatePlaceholderField from './components/TemplatePlaceholderField';
import TemplatePreviewForm from './components/TemplatePreviewField';
import type { TemplateParameters } from '../../../../types/template';
import { extractParameterMetadata } from '../../../../utils/template';
import Form from '../../components/OutboundMessageForm';
import { FormFetchError } from '../../utils/errors';

export type MessageFormData = {
	templateId: string;
	templateParameters: TemplateParameters;
};

export type MessageFormSubmitPayload = {
	templateId: string;
	template: IOutboundProviderTemplate;
	templateParameters: TemplateParameters;
};

type MessageFormProps = {
	contact?: Omit<Serialized<ILivechatContact>, 'contactManager'>;
	templates?: IOutboundProviderTemplate[];
	onSubmit(values: MessageFormSubmitPayload): void;
	renderActions?(state: { isSubmitting: boolean }): ReactNode;
	defaultValues?: {
		templateId?: string;
		templateParameters?: TemplateParameters;
	};
};

const MessageForm = (props: MessageFormProps) => {
    /* Implementation Hidden */
};

MessageForm.displayName = 'MessageForm';

export default MessageForm;

```