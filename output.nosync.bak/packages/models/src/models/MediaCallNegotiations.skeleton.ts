## File: packages/models/src/models/MediaCallNegotiations.ts

```typescript
import type { RocketChatRecordDeleted, IMediaCallNegotiation, MediaCallNegotiationStream } from '@rocket.chat/core-typings';
import type { IMediaCallNegotiationsModel } from '@rocket.chat/model-typings';
import type { IndexDescription, Collection, Db, FindOptions, Document, UpdateResult } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class MediaCallNegotiationsRaw extends BaseRaw<IMediaCallNegotiation> implements IMediaCallNegotiationsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IMediaCallNegotiation>>) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	public async findLatestByCallId<T extends Document = IMediaCallNegotiation>(
		callId: IMediaCallNegotiation['callId'],
		options?: FindOptions<T>,
	): Promise<T | null> {
        /* Implementation Hidden */
    }

	public async setOfferById(
		id: string,
		offer: RTCSessionDescriptionInit,
		offerStreams?: MediaCallNegotiationStream[],
	): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	public async setAnswerById(
		id: string,
		answer: RTCSessionDescriptionInit,
		answerStreams?: MediaCallNegotiationStream[],
	): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	public async setStableById(id: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }
}

```