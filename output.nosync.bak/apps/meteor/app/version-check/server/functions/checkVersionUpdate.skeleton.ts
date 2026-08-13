## File: apps/meteor/app/version-check/server/functions/checkVersionUpdate.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';

import { i18n } from '../../../../server/lib/i18n';
import { sendMessagesToAdmins } from '../../../../server/lib/sendMessagesToAdmins';
import logger from '../logger';
import { buildVersionUpdateMessage } from './buildVersionUpdateMessage';
import { getNewUpdates } from './getNewUpdates';

const getMessagesToSendToAdmins = async (
	alerts: {
		id: string;
		priority: number;
		title: string;
		text: string;
		textArguments?: string[];
		modifiers: string[];
		infoUrl: string;
	}[],
	adminUser: IUser,
): Promise<{ msg: string }[]> => {
    /* Implementation Hidden */
};
/**
 * @deprecated
 */
export const checkVersionUpdate = async () => {
    /* Implementation Hidden */
};

const showAlertsFromCloud = async (
	alerts?: {
		id: string;
		priority: number;
		title: string;
		text: string;
		textArguments?: string[];
		modifiers: string[];
		infoUrl: string;
	}[],
) => {
    /* Implementation Hidden */
};

```