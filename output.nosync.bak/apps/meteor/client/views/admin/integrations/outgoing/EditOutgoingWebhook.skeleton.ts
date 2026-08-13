## File: apps/meteor/client/views/admin/integrations/outgoing/EditOutgoingWebhook.tsx

```typescript
import type { IOutgoingIntegration, OutgoingIntegrationEvent, Serialized } from '@rocket.chat/core-typings';
import { Button, ButtonGroup, Tabs, TabsItem } from '@rocket.chat/fuselage';
import { GenericModal, Page, PageHeader, PageScrollableContentWithShadow, PageFooter } from '@rocket.chat/ui-client';
import { useSetModal, useTranslation, useRouter, useRouteParameter } from '@rocket.chat/ui-contexts';
import { useId, useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import OutgoingWebhookForm from './OutgoingWebhookForm';
import { triggerWordsToArray, triggerWordsToString } from '../helpers/triggerWords';
import { useCreateIntegration } from '../hooks/useCreateIntegration';
import { useDeleteIntegration } from '../hooks/useDeleteIntegration';
import { useUpdateIntegration } from '../hooks/useUpdateIntegration';

type EditOutgoingWebhookFormData = {
	enabled: boolean;
	impersonateUser: boolean;
	event: OutgoingIntegrationEvent;
	urls: string;
	token: string;
	triggerWords: string;
	targetRoom: string;
	channel: string;
	username: string;
	name: string;
	alias: string;
	avatar: string;
	emoji: string;
	scriptEnabled: boolean;
	scriptEngine: 'isolated-vm';
	script: string;
	retryFailedCalls: boolean;
	retryCount: number;
	retryDelay: string;
	triggerWordAnywhere: boolean;
	runOnEdits: boolean;
};

const getInitialValue = (webhookData: Serialized<IOutgoingIntegration> | undefined, defaultToken: string): EditOutgoingWebhookFormData => ({
	enabled: webhookData?.enabled ?? true,
	impersonateUser: webhookData?.impersonateUser ?? false,
	event: webhookData?.event ?? 'sendMessage',
	urls: webhookData?.urls?.join('\n') ?? '',
	token: webhookData?.token ?? defaultToken,
	triggerWords: triggerWordsToString(webhookData?.triggerWords) ?? '',
	targetRoom: webhookData?.targetRoom ?? '',
	channel: webhookData?.channel.join(', ') ?? '',
	username: webhookData?.username ?? '',
	name: webhookData?.name ?? '',
	alias: webhookData?.alias ?? '',
	avatar: webhookData?.avatar ?? '',
	emoji: webhookData?.emoji ?? '',
	scriptEnabled: webhookData?.scriptEnabled ?? false,
	scriptEngine: webhookData?.scriptEngine ?? 'isolated-vm',
	script: webhookData?.script ?? '',
	retryFailedCalls: webhookData?.retryFailedCalls ?? true,
	retryCount: webhookData?.retryCount ?? 6,
	retryDelay: webhookData?.retryDelay ?? 'powers-of-ten',
	triggerWordAnywhere: webhookData?.triggerWordAnywhere ?? false,
	runOnEdits: webhookData?.runOnEdits ?? true,
});

const OUTGOING_TYPE = 'webhook-outgoing';

export type EditOutgoingWebhookProps = {
	webhookData?: Serialized<IOutgoingIntegration>;
};

const EditOutgoingWebhook = ({ webhookData }: EditOutgoingWebhookProps) => {
    /* Implementation Hidden */
};

export default EditOutgoingWebhook;

```