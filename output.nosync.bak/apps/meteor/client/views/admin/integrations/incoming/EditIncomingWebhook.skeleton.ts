## File: apps/meteor/client/views/admin/integrations/incoming/EditIncomingWebhook.tsx

```typescript
import type { IIncomingIntegration, Serialized } from '@rocket.chat/core-typings';
import { Button, ButtonGroup, Tabs, TabsItem } from '@rocket.chat/fuselage';
import { GenericModal, Page, PageHeader, PageScrollableContentWithShadow, PageFooter } from '@rocket.chat/ui-client';
import { useSetModal, useTranslation, useRouter, useRouteParameter } from '@rocket.chat/ui-contexts';
import { useId, useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import IncomingWebhookForm from './IncomingWebhookForm';
import { useCreateIntegration } from '../hooks/useCreateIntegration';
import { useDeleteIntegration } from '../hooks/useDeleteIntegration';
import { useUpdateIntegration } from '../hooks/useUpdateIntegration';

export type EditIncomingWebhookFormData = {
	enabled: boolean;
	channel: string;
	username: string;
	name: string;
	alias: string;
	avatar: string;
	emoji: string;
	scriptEnabled: boolean;
	scriptEngine: 'isolated-vm';
	overrideDestinationChannelEnabled: boolean;
	script: string;
};

const getInitialValue = (webhookData: Serialized<IIncomingIntegration> | undefined): EditIncomingWebhookFormData => ({
	enabled: webhookData?.enabled ?? true,
	channel: webhookData?.channel.join(', ') ?? '',
	username: webhookData?.username ?? '',
	name: webhookData?.name ?? '',
	alias: webhookData?.alias ?? '',
	avatar: webhookData?.avatar ?? '',
	emoji: webhookData?.emoji ?? '',
	scriptEnabled: webhookData?.scriptEnabled ?? false,
	scriptEngine: webhookData?.scriptEngine ?? 'isolated-vm',
	overrideDestinationChannelEnabled: webhookData?.overrideDestinationChannelEnabled ?? false,
	script: webhookData?.script ?? '',
});

const INCOMING_TYPE = 'webhook-incoming';

export type EditIncomingWebhookProps = {
	webhookData?: Serialized<IIncomingIntegration>;
};

const EditIncomingWebhook = ({ webhookData }: EditIncomingWebhookProps) => {
    /* Implementation Hidden */
};

export default EditIncomingWebhook;

```