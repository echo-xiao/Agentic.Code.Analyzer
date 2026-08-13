## File: packages/models/src/models/NpsVote.ts

```typescript
import type { INpsVote, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import { INpsVoteStatus } from '@rocket.chat/core-typings';
import type { INpsVoteModel } from '@rocket.chat/model-typings';
import type { Collection, FindCursor, Db, Document, FindOptions, IndexDescription, UpdateResult } from 'mongodb';
import { ObjectId } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class NpsVoteRaw extends BaseRaw<INpsVote> implements INpsVoteModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<INpsVote>>) {
        /* Implementation Hidden */
    }

	override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	findNotSentByNpsId(npsId: string, options?: Omit<FindOptions<INpsVote>, 'sort' | 'limit'>): FindCursor<INpsVote> {
        /* Implementation Hidden */
    }

	findByNpsIdAndStatus(npsId: string, status: INpsVoteStatus, options?: FindOptions<INpsVote>): FindCursor<INpsVote> {
        /* Implementation Hidden */
    }

	findByNpsId(npsId: string, options?: FindOptions<INpsVote>): FindCursor<INpsVote> {
        /* Implementation Hidden */
    }

	save(vote: Omit<INpsVote, '_id' | '_updatedAt'>): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	updateVotesToSent(voteIds: string[]): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	updateOldSendingToNewByNpsId(npsId: string): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	countByNpsId(npsId: string): Promise<number> {
        /* Implementation Hidden */
    }

	countByNpsIdAndStatus(npsId: string, status: INpsVoteStatus): Promise<number> {
        /* Implementation Hidden */
    }
}

```