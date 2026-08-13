## File: apps/meteor/client/views/omnichannel/components/outboundMessage/components/OutboundMessageWizard/forms/MessageForm/components/TemplatePlaceholderField.tsx

```typescript
import type { ILivechatContact, Serialized } from '@rocket.chat/core-typings';
import { Field, FieldError, FieldLabel, FieldRow } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';
import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import type { TemplateParameter, TemplateParameterMetadata } from '../../../../../types/template';
import TemplatePlaceholderInput from '../../../../TemplatePlaceholderSelector';
import type { MessageFormData } from '../MessageForm';

type TemplatePlaceholderFieldProps = ComponentProps<typeof Field> & {
	control: Control<MessageFormData>;
	metadata: TemplateParameterMetadata;
	contact?: Omit<Serialized<ILivechatContact>, 'contactManager'>;
};

const TemplatePlaceholderField = ({ control, metadata, contact, ...props }: TemplatePlaceholderFieldProps) => {
    /* Implementation Hidden */
};

export default TemplatePlaceholderField;

```