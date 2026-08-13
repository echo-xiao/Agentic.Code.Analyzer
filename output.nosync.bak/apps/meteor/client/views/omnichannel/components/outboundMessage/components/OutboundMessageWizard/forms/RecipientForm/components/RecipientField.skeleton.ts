## File: apps/meteor/client/views/omnichannel/components/outboundMessage/components/OutboundMessageWizard/forms/RecipientForm/components/RecipientField.tsx

```typescript
import type { Serialized, ILivechatContact } from '@rocket.chat/core-typings';
import { Field, FieldError, FieldLabel, FieldRow } from '@rocket.chat/fuselage';
import { useId } from 'react';
import type { ComponentProps } from 'react';
import { useController, type Control } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';

import RecipientSelect from '../../../../RecipientSelect';
import type { RecipientFormData } from '../RecipientForm';

type RecipientFieldProps = ComponentProps<typeof Field> & {
	control: Control<RecipientFormData>;
	contact?: Omit<Serialized<ILivechatContact>, 'contactManager'>;
	type: 'phone' | 'email';
	disabled?: boolean;
	isLoading: boolean;
};

const RecipientField = ({ control, contact, type, disabled = false, isLoading = false, ...props }: RecipientFieldProps) => {
    /* Implementation Hidden */
};

export default RecipientField;

```