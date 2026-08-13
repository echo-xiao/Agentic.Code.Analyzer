## File: packages/models/src/models/Integrations.ts

```typescript
import type { IIntegration, IUser, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { IBaseModel, IIntegrationsModel } from '@rocket.chat/model-typings';
import type { Collection, Db, FindCursor, FindOptions, IndexDescription } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class IntegrationsRaw extends BaseRaw<IIntegration> implements IIntegrationsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IIntegration>>) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	findOneByUrl(url: string): Promise<IIntegration | null> {
        /* Implementation Hidden */
    }

	updateRoomName(oldRoomName: string, newRoomName: string): ReturnType<IBaseModel<IIntegration>['updateMany']> {
        /* Implementation Hidden */
    }

	findOneByIdAndCreatedByIfExists({
		_id,
		createdBy,
	}: {
		_id: IIntegration['_id'];
		createdBy?: IUser['_id'];
	}): Promise<IIntegration | null> {
        /* Implementation Hidden */
    }

	removeByIdAndCreatedByIfExists({ _id, createdBy }: { _id: IIntegration['_id']; createdBy?: IUser['_id'] }): Promise<IIntegration | null> {
        /* Implementation Hidden */
    }

	disableByUserId(userId: IIntegration['userId']): ReturnType<IBaseModel<IIntegration>['updateMany']> {
        /* Implementation Hidden */
    }

	findByUserId(userId: IIntegration['userId']): FindCursor<Pick<IIntegration, '_id'>> {
        /* Implementation Hidden */
    }

	findByChannels(channels: IIntegration['channel']): FindCursor<IIntegration> {
        /* Implementation Hidden */
    }

	findOneByIdAndToken<P extends IIntegration = IIntegration>(
		id: IIntegration['_id'],
		token: string,
		options?: FindOptions<P>,
	): Promise<P | null> {
        /* Implementation Hidden */
    }
}

```