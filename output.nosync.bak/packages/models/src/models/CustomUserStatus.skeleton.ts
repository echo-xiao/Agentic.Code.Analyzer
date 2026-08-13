## File: packages/models/src/models/CustomUserStatus.ts

```typescript
import type { ICustomUserStatus, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { ICustomUserStatusModel, InsertionModel } from '@rocket.chat/model-typings';
import type { Collection, FindCursor, Db, FindOptions, IndexDescription, InsertOneResult, UpdateResult, WithId } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class CustomUserStatusRaw extends BaseRaw<ICustomUserStatus> implements ICustomUserStatusModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<ICustomUserStatus>>) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	// find one by name

	async findOneByName(name: string, options?: undefined): Promise<ICustomUserStatus | null>;

	async findOneByName(name: string, options?: FindOptions<ICustomUserStatus>): Promise<ICustomUserStatus | null> {
        /* Implementation Hidden */
    }

	// find
	findByName(name: string, options?: FindOptions<ICustomUserStatus>): FindCursor<ICustomUserStatus> {
        /* Implementation Hidden */
    }

	findByNameExceptId(name: string, except: string, options?: FindOptions<ICustomUserStatus>): FindCursor<ICustomUserStatus> {
        /* Implementation Hidden */
    }

	// update
	setName(_id: string, name: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	setStatusType(_id: string, statusType: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	// INSERT
	create(data: InsertionModel<ICustomUserStatus>): Promise<InsertOneResult<WithId<ICustomUserStatus>>> {
        /* Implementation Hidden */
    }
}

```