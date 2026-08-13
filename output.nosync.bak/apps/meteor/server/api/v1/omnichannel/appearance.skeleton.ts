## File: apps/meteor/server/api/v1/omnichannel/appearance.ts

```typescript
import type { ISettingSelectOption } from '@rocket.chat/core-typings';
import { Settings } from '@rocket.chat/models';
import { isPOSTLivechatAppearanceParams } from '@rocket.chat/rest-typings';
import { isTruthy } from '@rocket.chat/tools';

import { API } from '../..';
import { findAppearance } from './lib/appearance';
import { notifyOnSettingChangedById } from '../../../../app/lib/server/lib/notifyListener';
import { updateAuditedByUser } from '../../../settings/lib/auditedSettingUpdates';

API.v1.addRoute(
	'livechat/appearance',
	{
		authRequired: true,
		permissionsRequired: ['view-livechat-manager'],
		validateParams: {
			POST: isPOSTLivechatAppearanceParams,
		},
	},
	{
		async get() {
			const { appearance } = await findAppearance();

			return API.v1.success({
				appearance,
			});
		},
		async post() {
			const settings = this.bodyParams;

			const validSettingList = [
				'Livechat_title',
				'Livechat_title_color',
				'Livechat_enable_message_character_limit',
				'Livechat_message_character_limit',
				'Livechat_show_agent_info',
				'Livechat_show_agent_email',
				'Livechat_display_offline_form',
				'Livechat_offline_form_unavailable',
				'Livechat_offline_message',
				'Livechat_offline_success_message',
				'Livechat_offline_title',
				'Livechat_offline_title_color',
				'Livechat_offline_email',
				'Livechat_conversation_finished_message',
				'Livechat_conversation_finished_text',
				'Livechat_registration_form',
				'Livechat_name_field_registration_form',
				'Livechat_email_field_registration_form',
				'Livechat_registration_form_message',
				'Livechat_hide_watermark',
				'Livechat_background',
				'Livechat_widget_position',
				'Livechat_hide_system_messages',
				'Omnichannel_allow_visitors_to_close_conversation',
				'Livechat_hide_expand_chat',
			];

			const valid = settings.every((setting) => validSettingList.includes(setting._id));

			if (!valid) {
				throw new Error('invalid-setting');
			}

			const dbSettings = await Settings.findByIds(validSettingList, { projection: { _id: 1, value: 1, type: 1, values: 1 } })
				.map((dbSetting) => {
					const setting = settings.find(({ _id }) => _id === dbSetting._id);
					if (!setting || dbSetting.value === setting.value) {
						return;
					}

					if (dbSetting.type === 'multiSelect' && (!Array.isArray(setting.value) || !validateValues(setting.value, dbSetting.values))) {
						return;
					}

					switch (dbSetting?.type) {
						case 'boolean':
							return {
								_id: dbSetting._id,
								value: setting.value === 'true' || setting.value === true,
							};
						case 'int':
							return {
								_id: dbSetting._id,
								value: coerceInt(setting.value),
							};
						default:
							return {
								_id: dbSetting._id,
								value: setting?.value,
							};
					}
				})
				.toArray();

			const eligibleSettings = dbSettings.filter(isTruthy);

			const auditSettingOperation = updateAuditedByUser({
				_id: this.userId,
				username: this.user.username,
				ip: this.requestIp,
				useragent: this.request.headers.get('user-agent') || '',
			});

			const promises = eligibleSettings.map(({ _id, value }) => auditSettingOperation(Settings.updateValueById, _id, value));
			(await Promise.all(promises)).forEach((value, index) => {
				if (value?.modifiedCount) {
					void notifyOnSettingChangedById(eligibleSettings[index]._id);
				}
			});

			return API.v1.success();
		},
	},
);

function validateValues(values: string[], allowedValues: ISettingSelectOption[] = []): boolean {
    /* Implementation Hidden */
}

function coerceInt(value: string | number | boolean | string[]): number {
    /* Implementation Hidden */
}

```