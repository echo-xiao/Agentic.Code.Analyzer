## File: packages/models/src/models/FederationRoomEvents.ts

```typescript
import { eventTypes } from '@rocket.chat/core-typings';
import type { IRoom, ISubscription, IUser, IFederationEvent } from '@rocket.chat/core-typings';
import type { IFederationRoomEventsModel } from '@rocket.chat/model-typings';
import type { Db, DeleteResult, IndexDescription } from 'mongodb';

import { FederationEventsModel } from './FederationEvents';

export class FederationRoomEventsRaw extends FederationEventsModel implements IFederationRoomEventsModel {
	constructor(db: Db) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	// @ts-expect-error - TODO: Bad extends
	async createGenesisEvent(origin: string, room: IRoom): Promise<Omit<IFederationEvent, '_updatedAt'>> {
        /* Implementation Hidden */
    }

	async createDeleteRoomEvent(origin: string, roomId: string): Promise<Omit<IFederationEvent, '_updatedAt'>> {
        /* Implementation Hidden */
    }

	async createAddUserEvent(
		origin: string,
		roomId: string,
		user: IUser,
		subscription: ISubscription,
		domainsAfterAdd: string[],
	): Promise<Omit<IFederationEvent, '_updatedAt'>> {
        /* Implementation Hidden */
    }

	async createRemoveUserEvent(
		origin: string,
		roomId: string,
		user: IUser,
		domainsAfterRemoval: string[],
	): Promise<Omit<IFederationEvent, '_updatedAt'>> {
        /* Implementation Hidden */
    }

	async createUserLeftEvent(
		origin: string,
		roomId: string,
		user: IUser,
		domainsAfterLeave: string[],
	): Promise<Omit<IFederationEvent, '_updatedAt'>> {
        /* Implementation Hidden */
    }

	async createMessageEvent(origin: string, roomId: string, message: string): Promise<Omit<IFederationEvent, '_updatedAt'>> {
        /* Implementation Hidden */
    }

	async createEditMessageEvent(
		origin: string,
		roomId: string,
		originalMessage: { _id: string; msg: string; federation: Record<string, unknown> },
	): Promise<Omit<IFederationEvent, '_updatedAt'>> {
        /* Implementation Hidden */
    }

	async createDeleteMessageEvent(origin: string, roomId: string, messageId: string): Promise<Omit<IFederationEvent, '_updatedAt'>> {
        /* Implementation Hidden */
    }

	async createSetMessageReactionEvent(
		origin: string,
		roomId: string,
		messageId: string,
		username: string,
		reaction: string,
	): Promise<Omit<IFederationEvent, '_updatedAt'>> {
        /* Implementation Hidden */
    }

	async createUnsetMessageReactionEvent(
		origin: string,
		roomId: string,
		messageId: string,
		username: string,
		reaction: string,
	): Promise<Omit<IFederationEvent, '_updatedAt'>> {
        /* Implementation Hidden */
    }

	async createMuteUserEvent(origin: string, roomId: string, user: IUser): Promise<Omit<IFederationEvent, '_updatedAt'>> {
        /* Implementation Hidden */
    }

	async createUnmuteUserEvent(origin: string, roomId: string, user: IUser): Promise<Omit<IFederationEvent, '_updatedAt'>> {
        /* Implementation Hidden */
    }

	async removeRoomEvents(roomId: string): Promise<DeleteResult> {
        /* Implementation Hidden */
    }
}

```