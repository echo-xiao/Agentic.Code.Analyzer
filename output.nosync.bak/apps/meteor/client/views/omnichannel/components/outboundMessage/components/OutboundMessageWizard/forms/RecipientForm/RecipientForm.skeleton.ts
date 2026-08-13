## File: apps/meteor/client/views/omnichannel/components/outboundMessage/components/OutboundMessageWizard/forms/RecipientForm/RecipientForm.tsx

```typescript
import type { IOutboundProviderMetadata, Serialized, ILivechatContact } from '@rocket.chat/core-typings';
import { Box, Button, FieldGroup, Scrollable } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useToastBarDispatch } from '@rocket.chat/fuselage-toastbar';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useEffect, useId, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import ChannelField from './components/ChannelField';
import ContactField from './components/ContactField';
import RecipientField from './components/RecipientField';
import SenderField from './components/SenderField';
import { omnichannelQueryKeys } from '../../../../../../../../lib/queryKeys';
import Form from '../../components/OutboundMessageForm';
import { ContactNotFoundError, ProviderNotFoundError } from '../../utils/errors';

export type RecipientFormData = {
	contactId: string;
	providerId: string;
	recipient: string;
	sender: string;
};

export type RecipientFormSubmitPayload = {
	contactId: string;
	contact: Serialized<ILivechatContact>;
	providerId: string;
	provider: IOutboundProviderMetadata;
	recipient: string;
	sender: string;
};

type RecipientFormProps = {
	defaultValues?: Partial<RecipientFormData>;
	onDirty?(): void;
	onSubmit(values: RecipientFormSubmitPayload): void;
	renderActions?(state: { isSubmitting: boolean }): ReactNode;
};

const RecipientForm = (props: RecipientFormProps) => {
    /* Implementation Hidden */
};

export default RecipientForm;

```