## File: apps/meteor/app/crowd/server/crowd.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { cronJobs } from '@rocket.chat/cron';
import { Users } from '@rocket.chat/models';
import { SHA256 } from '@rocket.chat/sha256';
import AtlassianCrowd from 'atlassian-crowd-patched';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

import { logger } from './logger';
import { deleteUser } from '../../../server/lib/users/deleteUser';
import { setRealName } from '../../../server/lib/users/setRealName';
import { setUserActiveStatus } from '../../../server/lib/users/setUserActiveStatus';
import { crowdIntervalValuesToCronMap } from '../../../server/settings/crowd';
import { notifyOnUserChange, notifyOnUserChangeById, notifyOnUserChangeAsync } from '../../lib/server/lib/notifyListener';
import { settings } from '../../settings/server';

type CrowdUser = Pick<IUser, '_id' | 'username'> & { crowd: Record<string, any>; crowd_username: string };

function fallbackDefaultAccountSystem(bind: typeof Accounts, username: string | Record<string, any>, password: string) {
    /* Implementation Hidden */
}

export class CROWD {
	private crowdClient: any;

	private options: {
		crowd: {
			base: string;
		};
		application: {
			name: string;
			password: string;
		};
		rejectUnauthorized: boolean;
	};

	constructor() {
        /* Implementation Hidden */
    }

	async checkConnection(): Promise<void> {
        /* Implementation Hidden */
    }

	async fetchCrowdUser(crowdUsername: string): Promise<Record<string, any>> {
        /* Implementation Hidden */
    }

	async searchForCrowdUserByMail(email?: string): Promise<Record<string, any> | undefined> {
        /* Implementation Hidden */
    }

	async authenticate(username: string, password: string): Promise<Record<string, any> | undefined> {
        /* Implementation Hidden */
    }

	async syncDataToUser(crowdUser: Record<string, any>, id: string) {
        /* Implementation Hidden */
    }

	async sync() {
        /* Implementation Hidden */
    }

	cleanUsername(username: string) {
        /* Implementation Hidden */
    }

	async updateUserCollection(crowdUser: Record<string, any>) {
        /* Implementation Hidden */
    }
}

Accounts.registerLoginHandler('crowd', async function (this: typeof Accounts, loginRequest) {
	if (!loginRequest.crowd) {
		return undefined;
	}

	logger.info({ msg: 'Init CROWD login', username: loginRequest.username });

	if (settings.get('CROWD_Enable') !== true) {
		return fallbackDefaultAccountSystem(this, loginRequest.username, loginRequest.crowdPassword);
	}

	try {
		const crowd = new CROWD();
		const user = await crowd.authenticate(loginRequest.username, loginRequest.crowdPassword);

		if (user?.crowd === false) {
			logger.debug({ msg: 'User is not a valid crowd user, falling back', username: loginRequest.username });
			return fallbackDefaultAccountSystem(this, loginRequest.username, loginRequest.crowdPassword);
		}

		if (!user) {
			logger.debug({ msg: 'User is not allowed to access Rocket.Chat', username: loginRequest.username });
			return new Meteor.Error('not-authorized', 'User is not authorized by crowd');
		}

		const result = await crowd.updateUserCollection(user);

		return result;
	} catch (err: any) {
		logger.error({ msg: 'Crowd user not authenticated due to an error', err });

		throw new Meteor.Error('user-not-found', err.message);
	}
});

const jobName = 'CROWD_Sync';

Meteor.startup(() => {
	settings.watchMultiple(['CROWD_Sync_User_Data', 'CROWD_Sync_Interval'], async function addCronJobDebounced([data, interval]) {
		if (data !== true) {
			logger.info('Disabling CROWD Background Sync');
			if (await cronJobs.has(jobName)) {
				await cronJobs.remove(jobName);
			}
			return;
		}
		const crowd = new CROWD();
		if (interval) {
			if (await cronJobs.has(jobName)) {
				await cronJobs.remove(jobName);
			}

			logger.info('Enabling CROWD Background Sync');
			const cronInterval = crowdIntervalValuesToCronMap[String(interval)];

			await cronJobs.add(jobName, cronInterval, () => crowd.sync());
		}
	});
});

```