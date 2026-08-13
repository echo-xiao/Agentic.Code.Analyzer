## File: packages/models/src/models/CustomSounds.ts

```typescript
import type { ICustomSound, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { ICustomSoundsModel } from '@rocket.chat/model-typings';
import type { Collection, FindCursor, Db, FindOptions, IndexDescription, InsertOneResult, UpdateResult, WithId } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class CustomSoundsRaw extends BaseRaw<ICustomSound> implements ICustomSoundsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<ICustomSound>>) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	// find
	findByName(name: string, exceptId?: string, options?: FindOptions<ICustomSound>): FindCursor<ICustomSound> {
        /* Implementation Hidden */
    }

	// INSERT
	create(data: Omit<ICustomSound, '_id' | '_updatedAt'>): Promise<InsertOneResult<WithId<ICustomSound>>> {
        /* Implementation Hidden */
    }

	updateById(_id: string, data: Partial<Omit<ICustomSound, '_id'>>): Promise<UpdateResult> {
        /* Implementation Hidden */
    }
}

```