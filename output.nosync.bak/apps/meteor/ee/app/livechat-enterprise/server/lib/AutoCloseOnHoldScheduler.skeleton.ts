## File: apps/meteor/ee/app/livechat-enterprise/server/lib/AutoCloseOnHoldScheduler.ts

```typescript
import { Agenda } from '@rocket.chat/agenda';
import type { IUser } from '@rocket.chat/core-typings';
import type { MainLogger } from '@rocket.chat/logger';
import { LivechatRooms, Users } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';
import { MongoInternals } from 'meteor/mongo';
import moment from 'moment';

import { schedulerLogger } from './logger';
import { closeRoom } from '../../../../../app/livechat/server/lib/closeRoom';

const SCHEDULER_NAME = 'omnichannel_auto_close_on_hold_scheduler';

export class AutoCloseOnHoldSchedulerClass {
	scheduler: Agenda;

	schedulerUser: IUser;

	running: boolean;

	logger: MainLogger;

	constructor() {
        /* Implementation Hidden */
    }

	public async init(): Promise<void> {
        /* Implementation Hidden */
    }

	public async scheduleRoom(roomId: string, timeout: number, comment: string): Promise<void> {
        /* Implementation Hidden */
    }

	public async unscheduleRoom(roomId: string): Promise<void> {
        /* Implementation Hidden */
    }

	private async executeJob({ attrs: { data } }: any = {}): Promise<void> {
        /* Implementation Hidden */
    }

	private async getSchedulerUser(): Promise<IUser> {
        /* Implementation Hidden */
    }
}

export const AutoCloseOnHoldScheduler = new AutoCloseOnHoldSchedulerClass();

Meteor.startup(() => {
	void AutoCloseOnHoldScheduler.init();
});

```