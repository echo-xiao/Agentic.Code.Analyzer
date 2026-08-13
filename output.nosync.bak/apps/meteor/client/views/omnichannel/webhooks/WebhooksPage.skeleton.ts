## File: apps/meteor/client/views/omnichannel/webhooks/WebhooksPage.tsx

```typescript
import type { SettingValue } from '@rocket.chat/core-typings';
import type { SelectOption } from '@rocket.chat/fuselage';
import {
	Box,
	FieldGroup,
	Field,
	FieldRow,
	TextInput,
	MultiSelect,
	Button,
	ButtonGroup,
	NumberInput,
	FieldLabel,
} from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { ExternalLink, Page, PageHeader, PageScrollableContentWithShadow } from '@rocket.chat/ui-client';
import { useToastMessageDispatch, useTranslation, useEndpoint } from '@rocket.chat/ui-contexts';
import { useMutation } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import { links } from '../../../lib/links';

type WebhooksPageProps = {
	settings: Record<string, SettingValue>;
};

type SendOnOptions =
	| 'Livechat_webhook_on_start'
	| 'Livechat_webhook_on_close'
	| 'Livechat_webhook_on_chat_taken'
	| 'Livechat_webhook_on_chat_queued'
	| 'Livechat_webhook_on_forward'
	| 'Livechat_webhook_on_offline_msg'
	| 'Livechat_webhook_on_visitor_message'
	| 'Livechat_webhook_on_agent_message';

type WebhooksPageFormData = {
	Livechat_webhookUrl: string;
	Livechat_secret_token: string;
	Livechat_http_timeout: string;
	sendOn: SendOnOptions[];
};

const reduceSendOptions = (options: Record<string, SettingValue>) =>
	Object.entries(options).reduce<string[]>((acc, [key, val]) => {
		if (val) {
			acc = [...acc, key];
		}
		return acc;
	}, []);

const INTEGRATION_URL = links.webhooks;

const getInitialValues = ({
	Livechat_webhookUrl,
	Livechat_secret_token,
	Livechat_webhook_on_start,
	Livechat_webhook_on_close,
	Livechat_webhook_on_chat_taken,
	Livechat_webhook_on_chat_queued,
	Livechat_webhook_on_forward,
	Livechat_webhook_on_offline_msg,
	Livechat_webhook_on_visitor_message,
	Livechat_webhook_on_agent_message,
	Livechat_http_timeout,
}: WebhooksPageProps['settings']): WebhooksPageFormData => {
    /* Implementation Hidden */
};

const WebhooksPage = ({ settings }: WebhooksPageProps) => {
    /* Implementation Hidden */
};

export default WebhooksPage;

```