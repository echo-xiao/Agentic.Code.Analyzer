## File: packages/models/src/models/ServerEvents.ts

```typescript
import type {
	ExtractDataToParams,
	IAuditServerActor,
	IServerEvent,
	IServerEvents,
	RocketChatRecordDeleted,
} from '@rocket.chat/core-typings';
import { ServerEventType } from '@rocket.chat/core-typings';
import type { IServerEventsModel } from '@rocket.chat/model-typings';
import type { Collection, Db, IndexDescription } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class ServerEventsRaw extends BaseRaw<IServerEvent> implements IServerEventsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IServerEvent>>) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	async findLastFailedAttemptByIp(ip: string): Promise<IServerEvent | null> {
        /* Implementation Hidden */
    }

	async findLastFailedAttemptByUsername(username: string): Promise<IServerEvent | null> {
        /* Implementation Hidden */
    }

	async findLastSuccessfulAttemptByIp(ip: string): Promise<IServerEvent | null> {
        /* Implementation Hidden */
    }

	async findLastSuccessfulAttemptByUsername(username: string): Promise<IServerEvent | null> {
        /* Implementation Hidden */
    }

	async countFailedAttemptsByUsernameSince(username: string, since: Date): Promise<number> {
        /* Implementation Hidden */
    }

	countFailedAttemptsByIpSince(ip: string, since: Date): Promise<number> {
        /* Implementation Hidden */
    }

	countFailedAttemptsByIp(ip: string): Promise<number> {
        /* Implementation Hidden */
    }

	countFailedAttemptsByUsername(username: string): Promise<number> {
        /* Implementation Hidden */
    }

	async createAuditServerEvent<K extends keyof IServerEvents, E extends IServerEvents[K]>(
		key: K,
		data: ExtractDataToParams<E>,
		actor: IAuditServerActor,
	): Promise<void> {
        /* Implementation Hidden */
    }
}

```