## File: apps/meteor/ee/server/models/raw/CannedResponse.ts

```typescript
import type { IOmnichannelCannedResponse } from '@rocket.chat/core-typings';
import type { ICannedResponseModel } from '@rocket.chat/model-typings';
import { BaseRaw } from '@rocket.chat/models';
import type { Db, DeleteResult, FindCursor, FindOptions, IndexDescription, UpdateFilter } from 'mongodb';

// TODO need to define type for CannedResponse object
export class CannedResponseRaw extends BaseRaw<IOmnichannelCannedResponse> implements ICannedResponseModel {
	constructor(db: Db) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	async updateCannedResponse(
		_id: string,
		{ shortcut, text, tags, scope, userId, departmentId, createdBy }: Omit<IOmnichannelCannedResponse, '_id' | '_updatedAt' | '_createdAt'>,
	): Promise<Omit<IOmnichannelCannedResponse, '_updatedAt' | '_createdAt'>> {
        /* Implementation Hidden */
    }

	async createCannedResponse({
		shortcut,
		text,
		tags,
		scope,
		userId,
		departmentId,
		createdBy,
		_createdAt,
	}: Omit<IOmnichannelCannedResponse, '_id' | '_updatedAt'>): Promise<Omit<IOmnichannelCannedResponse, '_updatedAt'>> {
        /* Implementation Hidden */
    }

	override findOneById(_id: string, options?: FindOptions<IOmnichannelCannedResponse>): Promise<IOmnichannelCannedResponse | null> {
        /* Implementation Hidden */
    }

	findOneByShortcut(shortcut: string, options?: FindOptions<IOmnichannelCannedResponse>): Promise<IOmnichannelCannedResponse | null> {
        /* Implementation Hidden */
    }

	findByCannedResponseId(_id: string, options?: FindOptions<IOmnichannelCannedResponse>): FindCursor<IOmnichannelCannedResponse> {
        /* Implementation Hidden */
    }

	findByDepartmentId(departmentId: string, options?: FindOptions<IOmnichannelCannedResponse>): FindCursor<IOmnichannelCannedResponse> {
        /* Implementation Hidden */
    }

	findByShortcut(shortcut: string, options?: FindOptions<IOmnichannelCannedResponse>): FindCursor<IOmnichannelCannedResponse> {
        /* Implementation Hidden */
    }

	// REMOVE
	override removeById(_id: string): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	removeTagFromCannedResponses(tagId: string) {
        /* Implementation Hidden */
    }
}

```