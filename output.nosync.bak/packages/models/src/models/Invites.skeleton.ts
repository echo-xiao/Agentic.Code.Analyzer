## File: packages/models/src/models/Invites.ts

```typescript
import type { IInvite, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { IInvitesModel } from '@rocket.chat/model-typings';
import type { Collection, Db, UpdateResult } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class InvitesRaw extends BaseRaw<IInvite> implements IInvitesModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IInvite>>) {
        /* Implementation Hidden */
    }

	findOneByUserRoomMaxUsesAndExpiration(userId: string, rid: string, maxUses: number, daysToExpire: number): Promise<IInvite | null> {
        /* Implementation Hidden */
    }

	increaseUsageById(_id: string, uses = 1): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	async countUses(): Promise<number> {
        /* Implementation Hidden */
    }
}

```