## File: apps/meteor/client/views/omnichannel/components/outboundMessage/components/OutboundMessageWizard/forms/RecipientForm/components/SenderField.tsx

```typescript
import type { Serialized, IOutboundProviderMetadata } from '@rocket.chat/core-typings';
import { Field, FieldError, FieldLabel, FieldRow } from '@rocket.chat/fuselage';
import { useId } from 'react';
import type { ComponentProps } from 'react';
import { useController, type Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import SenderSelect from '../../../../SenderSelect';
import type { RecipientFormData } from '../RecipientForm';

type SenderFieldProps = ComponentProps<typeof Field> & {
	control: Control<RecipientFormData>;
	provider?: Serialized<IOutboundProviderMetadata>;
	disabled?: boolean;
	isLoading: boolean;
};

const SenderField = ({ control, provider, disabled = false, isLoading = false, ...props }: SenderFieldProps) => {
    /* Implementation Hidden */
};

export default SenderField;

```