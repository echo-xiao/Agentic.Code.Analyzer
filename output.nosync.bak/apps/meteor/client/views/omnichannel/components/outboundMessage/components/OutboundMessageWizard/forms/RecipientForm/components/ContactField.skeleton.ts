## File: apps/meteor/client/views/omnichannel/components/outboundMessage/components/OutboundMessageWizard/forms/RecipientForm/components/ContactField.tsx

```typescript
import { Box, Field, FieldError, FieldLabel, FieldRow, Option, OptionContent, OptionDescription } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import { useId } from 'react';
import type { ComponentProps } from 'react';
import { useController, type Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { formatPhoneNumber } from '../../../../../../../../../lib/formatPhoneNumber';
import AutoCompleteContact from '../../../../../../AutoCompleteContact';
import RetryButton from '../../../components/RetryButton';
import type { RecipientFormData } from '../RecipientForm';

type ContactFieldProps = ComponentProps<typeof Field> & {
	control: Control<RecipientFormData>;
	isError: boolean;
	isFetching: boolean;
	onRetry: () => void;
};

type RenderFnType = Required<ComponentProps<typeof AutoCompleteContact>>['renderItem'];

const ContactField = ({ control, isError = false, isFetching = false, onRetry, ...props }: ContactFieldProps) => {
    /* Implementation Hidden */
};

export default ContactField;

```