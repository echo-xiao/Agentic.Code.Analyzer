## File: packages/models/src/models/MediaCalls.ts

```typescript
import type {
	IMediaCall,
	RocketChatRecordDeleted,
	MediaCallActorType,
	MediaCallSignedContact,
	MediaCallContact,
	IUser,
	MediaCallActor,
} from '@rocket.chat/core-typings';
import type { IMediaCallsModel } from '@rocket.chat/model-typings';
import type {
	IndexDescription,
	Collection,
	Db,
	UpdateFilter,
	UpdateOptions,
	UpdateResult,
	FindOptions,
	Document,
	FindCursor,
} from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class MediaCallsRaw extends BaseRaw<IMediaCall> implements IMediaCallsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IMediaCall>>) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	public async findOneByIdAndCallee<T extends Document = IMediaCall>(
		id: IMediaCall['_id'],
		callee: MediaCallActor,
		options?: FindOptions<IMediaCall>,
	): Promise<T | null> {
        /* Implementation Hidden */
    }

	public async findOneByCallerRequestedId<T extends Document = IMediaCall>(
		id: Required<IMediaCall>['callerRequestedId'],
		caller: { type: MediaCallActorType; id: string },
		options?: FindOptions<T>,
	): Promise<T | null> {
        /* Implementation Hidden */
    }

	public updateOneById(
		_id: string,
		update: UpdateFilter<IMediaCall> | Partial<IMediaCall>,
		options?: UpdateOptions,
	): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	public async startRingingById(callId: string, expiresAt: Date): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	public async acceptCallById(
		callId: string,
		data: { calleeContractId: string; supportedFeatures: string[] },
		expiresAt: Date,
	): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	public async activateCallById(callId: string, expiresAt: Date): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	public async hangupCallById(callId: string, params?: { endedBy?: IMediaCall['endedBy']; reason?: string }): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	public async setExpiresAtById(callId: string, expiresAt: Date): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	public async transferCallById(callId: string, params: { by: MediaCallSignedContact; to: MediaCallContact }): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	public findAllExpiredCalls<T extends Document = IMediaCall>(options?: FindOptions<T>): FindCursor<T> {
        /* Implementation Hidden */
    }

	public findAllNotOverByUid<T extends Document = IMediaCall>(uid: IUser['_id'], options?: FindOptions<T>): FindCursor<T> {
        /* Implementation Hidden */
    }

	public async hasUnfinishedCalls(): Promise<boolean> {
        /* Implementation Hidden */
    }

	public async hasUnfinishedCallsByUid(uid: IUser['_id'], exceptCallId?: string): Promise<boolean> {
        /* Implementation Hidden */
    }
}

```