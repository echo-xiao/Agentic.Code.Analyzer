## File: apps/meteor/app/retention-policy/server/cronPruneMessages.ts

```typescript
import type { IRoomWithRetentionPolicy } from '@rocket.chat/core-typings';
import { cronJobs } from '@rocket.chat/cron';
import { Rooms } from '@rocket.chat/models';

import { getCronAdvancedTimerFromPrecisionSetting } from '../../../lib/getCronAdvancedTimerFromPrecisionSetting';
import { cleanRoomHistory } from '../../../server/lib/rooms/cleanRoomHistory';
import { settings } from '../../settings/server';

type RetentionRoomTypes = 'c' | 'p' | 'd';

const getMaxAgeSettingIdByRoomType = (type: RetentionRoomTypes) => {
    /* Implementation Hidden */
};

let types: RetentionRoomTypes[] = [];

const oldest = new Date('0001-01-01T00:00:00Z');

const toDays = (d: number): number => d * 1000 * 60 * 60 * 24;

async function job(): Promise<void> {
    /* Implementation Hidden */
}

const pruneCronName = 'Prune old messages by retention policy';

async function deployCron(precision: string): Promise<void> {
    /* Implementation Hidden */
}

settings.watchMultiple(
	[
		'RetentionPolicy_Enabled',
		'RetentionPolicy_AppliesToChannels',
		'RetentionPolicy_AppliesToGroups',
		'RetentionPolicy_AppliesToDMs',
		'RetentionPolicy_Advanced_Precision',
		'RetentionPolicy_Advanced_Precision_Cron',
		'RetentionPolicy_Precision',
	],
	async function reloadPolicy() {
		types = [];

		if (!settings.get('RetentionPolicy_Enabled')) {
			return cronJobs.remove(pruneCronName);
		}
		if (settings.get('RetentionPolicy_AppliesToChannels')) {
			types.push('c');
		}

		if (settings.get('RetentionPolicy_AppliesToGroups')) {
			types.push('p');
		}

		if (settings.get('RetentionPolicy_AppliesToDMs')) {
			types.push('d');
		}

		const precision =
			(settings.get<boolean>('RetentionPolicy_Advanced_Precision') && settings.get<string>('RetentionPolicy_Advanced_Precision_Cron')) ||
			getCronAdvancedTimerFromPrecisionSetting(settings.get('RetentionPolicy_Precision'));

		return deployCron(precision);
	},
);

```