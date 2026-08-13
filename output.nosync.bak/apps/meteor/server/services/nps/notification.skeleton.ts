## File: apps/meteor/server/services/nps/notification.ts

```typescript
import type { IBanner } from '@rocket.chat/core-typings';
import { BannerPlatform } from '@rocket.chat/core-typings';
import { Random } from '@rocket.chat/random';
import moment from 'moment';

import { settings } from '../../../app/settings/server';
import { i18n } from '../../lib/i18n';
import { sendMessagesToAdmins } from '../../lib/sendMessagesToAdmins';

export const getBannerForAdmins = (expireAt: Date): Omit<IBanner, '_id'> => {
    /* Implementation Hidden */
};

export const notifyAdmins = (expireAt: Date) =>
	sendMessagesToAdmins({
		msgs: async ({ adminUser }: { adminUser: any }): Promise<any> => ({
			msg: i18n.t('NPS_survey_is_scheduled_to-run-at__date__for_all_users', {
				date: moment(expireAt).format('YYYY-MM-DD'),
				lng: adminUser.language,
			}),
		}),
	});

```