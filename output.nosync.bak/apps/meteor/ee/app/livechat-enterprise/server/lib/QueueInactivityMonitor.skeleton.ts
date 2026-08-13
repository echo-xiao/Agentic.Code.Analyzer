## File: apps/meteor/ee/app/livechat-enterprise/server/lib/QueueInactivityMonitor.ts

```typescript
import { Agenda } from '@rocket.chat/agenda';
import type { IUser, IOmnichannelRoom } from '@rocket.chat/core-typings';
import type { MainLogger } from '@rocket.chat/logger';
import { LivechatRooms, LivechatInquiry as LivechatInquiryRaw, Users } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';
import { MongoInternals } from 'meteor/mongo';
import type { Db } from 'mongodb';

import { schedulerLogger } from './logger';
import { closeRoom } from '../../../../../app/livechat/server/lib/closeRoom';
import { settings } from '../../../../../app/settings/server';
import { i18n } from '../../../../../server/lib/i18n';

const SCHEDULER_NAME = 'omnichannel_queue_inactivity_monitor';

export class OmnichannelQueueInactivityMonitorClass {
	scheduler: Agenda;

	running: boolean;

	logger: MainLogger;

	_name: string;

	user: IUser;

	message: string;

	_db: Db;

	bindedCloseRoom: any;

	constructor() {
        /* Implementation Hidden */
    }

	private async getRocketCatUser(): Promise<IUser | null> {
        /* Implementation Hidden */
    }

	getName(inquiryId: string): string {
        /* Implementation Hidden */
    }

	createIndex(): void {
        /* Implementation Hidden */
    }

	async start(): Promise<void> {
        /* Implementation Hidden */
    }

	async scheduleInquiry(inquiryId: string, time: Date): Promise<void> {
        /* Implementation Hidden */
    }

	async stop(): Promise<void> {
        /* Implementation Hidden */
    }

	async stopInquiry(inquiryId: string): Promise<void> {
        /* Implementation Hidden */
    }

	async closeRoomAction(room: IOmnichannelRoom): Promise<void> {
        /* Implementation Hidden */
    }

	async closeRoom({ attrs: { data } }: any = {}): Promise<void> {
        /* Implementation Hidden */
    }
}

export const OmnichannelQueueInactivityMonitor = new OmnichannelQueueInactivityMonitorClass();

Meteor.startup(async () => {
	void OmnichannelQueueInactivityMonitor.start();
});

```