## File: apps/meteor/client/views/omnichannel/components/outboundMessage/components/OutboundMessageWizard/forms/RecipientForm/components/ChannelField.tsx

```typescript
import type { Serialized, ILivechatContact } from '@rocket.chat/core-typings';
import { Field, FieldError, FieldHint, FieldLabel, FieldRow } from '@rocket.chat/fuselage';
import { useId, useMemo } from 'react';
import type { ComponentProps } from 'react';
import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useTimeFromNow } from '../../../../../../../../../hooks/useTimeFromNow';
import { findLastChatFromChannel } from '../../../../../utils/findLastChatFromChannel';
import AutoCompleteOutboundProvider from '../../../../AutoCompleteOutboundProvider';
import RetryButton from '../../../components/RetryButton';
import { cxp } from '../../../utils/cx';
import type { RecipientFormData } from '../RecipientForm';

type ProviderFieldProps = ComponentProps<typeof Field> & {
	control: Control<RecipientFormData>;
	contact?: Omit<Serialized<ILivechatContact>, 'contactManager'>;
	disabled?: boolean;
	isError: boolean;
	isFetching: boolean;
	onRetry: () => void;
};

const ProviderField = ({
	control,
	contact,
	disabled = false,
	isError = false,
	isFetching = false,
	onRetry,
	...props
}: ProviderFieldProps) => {
    /* Implementation Hidden */
};

export default ProviderField;

```