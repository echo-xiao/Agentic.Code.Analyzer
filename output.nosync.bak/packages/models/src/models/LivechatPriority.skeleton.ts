## File: packages/models/src/models/LivechatPriority.ts

```typescript
import type { ILivechatPriority } from '@rocket.chat/core-typings';
import type { ILivechatPriorityModel } from '@rocket.chat/model-typings';
import { escapeRegExp } from '@rocket.chat/string-helpers';
import type { Db, UpdateFilter, WithId, IndexDescription, FindCursor } from 'mongodb';

import { BaseRaw } from './BaseRaw';

// TODO need to define type for LivechatPriority object
export class LivechatPriorityRaw extends BaseRaw<ILivechatPriority> implements ILivechatPriorityModel {
	constructor(db: Db) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	findOneByIdOrName(_idOrName: string, options = {}): Promise<ILivechatPriority | null> {
        /* Implementation Hidden */
    }

	findOneNameUsingRegex(_idOrName: string, options = {}): Promise<ILivechatPriority | null> {
        /* Implementation Hidden */
    }

	findByDirty(): FindCursor<Pick<ILivechatPriority, '_id'>> {
        /* Implementation Hidden */
    }

	async canResetPriorities(): Promise<boolean> {
        /* Implementation Hidden */
    }

	async resetPriorities(ids: ILivechatPriority['_id'][]): Promise<void> {
        /* Implementation Hidden */
    }

	async updatePriority(_id: string, reset: boolean, name?: string): Promise<null | WithId<ILivechatPriority>> {
        /* Implementation Hidden */
    }
}

```