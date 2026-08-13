## File: apps/meteor/client/views/omnichannel/components/outboundMessage/components/OutboundMessageWizard/forms/MessageForm/components/TemplateField.tsx

```typescript
import type { IOutboundProviderTemplate, Serialized } from '@rocket.chat/core-typings';
import { Field, FieldError, FieldHint, FieldLabel, FieldRow } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import type { ComponentProps } from 'react';
import { useId } from 'react';
import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { OUTBOUND_DOCS_LINK } from '../../../../../constants';
import TemplateSelect from '../../../../TemplateSelect';
import { cxp } from '../../../utils/cx';
import type { MessageFormData } from '../MessageForm';

type TemplateFieldProps = ComponentProps<typeof Field> & {
	control: Control<MessageFormData>;
	templates: Serialized<IOutboundProviderTemplate>[] | undefined;
	onChange?: (templateId: string) => void;
};

const TemplateField = ({ control, templates, onChange: onChangeExternal, ...props }: TemplateFieldProps) => {
    /* Implementation Hidden */
};

export default TemplateField;

```