## File: apps/meteor/client/views/omnichannel/appearance/AppearancePage.tsx

```typescript
import type { ISetting, Serialized } from '@rocket.chat/core-typings';
import { ButtonGroup, Button, Box } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { Page, PageHeader, PageScrollableContentWithShadow, PageFooter } from '@rocket.chat/ui-client';
import { useToastMessageDispatch, useEndpoint } from '@rocket.chat/ui-contexts';
import { useId } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import AppearanceForm from './AppearanceForm';

type LivechatAppearanceSettings = {
	Livechat_title: string;
	Livechat_title_color: string;
	Livechat_show_agent_info: boolean;
	Livechat_show_agent_email: boolean;
	Livechat_display_offline_form: boolean;
	Livechat_offline_form_unavailable: string;
	Livechat_offline_message: string;
	Livechat_offline_title: string;
	Livechat_offline_title_color: string;
	Livechat_offline_email: string;
	Livechat_offline_success_message: string;
	Livechat_registration_form: boolean;
	Livechat_name_field_registration_form: boolean;
	Livechat_email_field_registration_form: boolean;
	Livechat_registration_form_message: string;
	Livechat_conversation_finished_message: string;
	Livechat_conversation_finished_text: string;
	Livechat_enable_message_character_limit: boolean;
	Livechat_message_character_limit: number;
	Omnichannel_allow_visitors_to_close_conversation: boolean;
};

type AppearanceSettings = Partial<LivechatAppearanceSettings>;

const reduceAppearance = (settings: Serialized<ISetting>[]): AppearanceSettings =>
	settings.reduce<Partial<LivechatAppearanceSettings>>((acc, { _id, value }) => {
		acc = { ...acc, [_id]: value };
		return acc;
	}, {});

export type AppearancePageProps = { settings: Serialized<ISetting>[] };

const AppearancePage = ({ settings }: AppearancePageProps) => {
    /* Implementation Hidden */
};

export default AppearancePage;

```