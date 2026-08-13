## File: apps/meteor/app/livechat/server/statistics/LivechatAgentActivityMonitor.ts

```typescript
import type { ILivechatAgent, ISocketConnection } from '@rocket.chat/core-typings';
import { cronJobs } from '@rocket.chat/cron';
import { LivechatAgentActivity, Sessions, Users } from '@rocket.chat/models';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

import { callbacks } from '../../../../server/lib/callbacks';

const formatDate = (dateTime = new Date()): { date: number } => ({
	date: parseInt(moment(dateTime).format('YYYYMMDD')),
});

export class LivechatAgentActivityMonitor {
	private _started: boolean;

	private _name: string;

	private scheduler = cronJobs;

	constructor() {
        /* Implementation Hidden */
    }

	async start(): Promise<void> {
        /* Implementation Hidden */
    }

	async stop(): Promise<void> {
        /* Implementation Hidden */
    }

	isRunning(): boolean {
        /* Implementation Hidden */
    }

	async _setupListeners(): Promise<void> {
        /* Implementation Hidden */
    }

	async _startMonitoring(): Promise<void> {
        /* Implementation Hidden */
    }

	async _updateActiveSessions(): Promise<void> {
        /* Implementation Hidden */
    }

	async _handleMeteorConnection(connection: ISocketConnection): Promise<void> {
        /* Implementation Hidden */
    }

	async _handleAgentStatusChanged({ userId, status }: { userId: string; status: string }) {
        /* Implementation Hidden */
    }

	async _handleUserStatusLivechatChanged({ userId, status }: { userId: string; status: string }): Promise<void> {
        /* Implementation Hidden */
    }

	async _createOrUpdateSession(userId: string, lastStartedAt?: Date): Promise<void> {
        /* Implementation Hidden */
    }

	async _updateSessionWhenAgentStop(agentId: string): Promise<void> {
        /* Implementation Hidden */
    }
}

```