## File: packages/models/src/models/FederationEvents.ts

```typescript
import { eventTypes } from '@rocket.chat/core-typings';
import type { IFederationEvent } from '@rocket.chat/core-typings';
import { SHA256 } from '@rocket.chat/sha256';
import type { IndexDescription, Db } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class FederationEventsModel extends BaseRaw<IFederationEvent> {
	constructor(db: Db, nameOrModel: string) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	getEventHash(
		contextQuery: { roomId: string },
		event: { type: string; timestamp: Date; data: Record<string, unknown>; parentIds: string[]; origin: string },
	): string {
        /* Implementation Hidden */
    }

	async createEvent(
		origin: string,
		contextQuery: { roomId: string },
		type: string,
		data: any,
	): Promise<Omit<IFederationEvent, '_updatedAt'>> {
        /* Implementation Hidden */
    }

	async createGenesisEvent(origin: string, contextQuery: { roomId: string }, data: any): Promise<Omit<IFederationEvent, '_updatedAt'>> {
        /* Implementation Hidden */
    }

	async addEvent(
		contextQuery: { roomId: string },
		event: IFederationEvent,
	): Promise<{ success: boolean; reason: string; missingParentIds: string[]; latestEventIds: string[] } | { success: boolean }> {
        /* Implementation Hidden */
    }

	async getEventById(contextQuery: { roomId: string }, eventId: string): Promise<{ success: boolean; event: IFederationEvent | null }> {
        /* Implementation Hidden */
    }

	async getLatestEvents(contextQuery: { roomId: string }, fromTimestamp: string): Promise<IFederationEvent[]> {
        /* Implementation Hidden */
    }

	async removeContextEvents(contextQuery: { roomId: string }) {
        /* Implementation Hidden */
    }
}

```