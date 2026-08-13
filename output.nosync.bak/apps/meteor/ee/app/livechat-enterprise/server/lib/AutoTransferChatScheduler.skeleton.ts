## File: apps/meteor/ee/app/livechat-enterprise/server/lib/AutoTransferChatScheduler.ts

```typescript
import { Agenda } from '@rocket.chat/agenda';
import type { IUser } from '@rocket.chat/core-typings';
import type { MainLogger } from '@rocket.chat/logger';
import { LivechatRooms, Users } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';
import { MongoInternals } from 'meteor/mongo';

import { schedulerLogger } from './logger';
import { forwardRoomToAgent } from '../../../../../app/livechat/server/lib/Helper';
import { RoutingManager } from '../../../../../app/livechat/server/lib/RoutingManager';
import { returnRoomAsInquiry } from '../../../../../app/livechat/server/lib/rooms';
import { settings } from '../../../../../app/settings/server';

const SCHEDULER_NAME = 'omnichannel_scheduler';

export class AutoTransferChatSchedulerClass {
	scheduler: Agenda;

	running: boolean;

	user: IUser;

	logger: MainLogger;

	constructor() {
        /* Implementation Hidden */
    }

	public async init(): Promise<void> {
        /* Implementation Hidden */
    }

	private async getSchedulerUser(): Promise<IUser & { userType: 'user' }> {
        /* Implementation Hidden */
    }

	public async scheduleRoom(roomId: string, timeout: number): Promise<void> {
        /* Implementation Hidden */
    }

	public async unscheduleRoom(roomId: string): Promise<void> {
        /* Implementation Hidden */
    }

	private async transferRoom(roomId: string): Promise<void> {
        /* Implementation Hidden */
    }

	private async executeJob({ attrs: { data } }: any = {}): Promise<void> {
        /* Implementation Hidden */
    }
}

export const AutoTransferChatScheduler = new AutoTransferChatSchedulerClass();

Meteor.startup(() => {
	void AutoTransferChatScheduler.init();
});

```