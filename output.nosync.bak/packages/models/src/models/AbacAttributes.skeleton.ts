## File: packages/models/src/models/AbacAttributes.ts

```typescript
import type { IAbacAttribute } from '@rocket.chat/core-typings';
import type { Db, FindOptions, IndexDescription } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class AbacAttributesRaw extends BaseRaw<IAbacAttribute> {
	constructor(db: Db) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	findOneByKey(key: string, options: FindOptions<IAbacAttribute> = {}): Promise<IAbacAttribute | null> {
        /* Implementation Hidden */
    }

	async countTotalValues(): Promise<number> {
        /* Implementation Hidden */
    }
}

```