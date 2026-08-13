## File: packages/models/src/models/LivechatCustomField.ts

```typescript
import type { ILivechatCustomField, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { ILivechatCustomFieldModel } from '@rocket.chat/model-typings';
import type { Db, Collection, IndexDescription, FindOptions, FindCursor, Document } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class LivechatCustomFieldRaw extends BaseRaw<ILivechatCustomField> implements ILivechatCustomFieldModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<ILivechatCustomField>>) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	findByScope<T extends ILivechatCustomField>(
		scope: ILivechatCustomField['scope'],
		options?: FindOptions<ILivechatCustomField>,
		includeHidden = true,
	): FindCursor<T> {
        /* Implementation Hidden */
    }

	findMatchingCustomFields(
		scope: ILivechatCustomField['scope'],
		searchable = true,
		options?: FindOptions<ILivechatCustomField>,
	): FindCursor<ILivechatCustomField> {
        /* Implementation Hidden */
    }

	findMatchingCustomFieldsByIds(
		ids: ILivechatCustomField['_id'][],
		scope: ILivechatCustomField['scope'],
		searchable = true,
		options?: FindOptions<ILivechatCustomField>,
	): FindCursor<ILivechatCustomField> {
        /* Implementation Hidden */
    }

	async createOrUpdateCustomField(
		_id: string | null,
		field: string,
		label: ILivechatCustomField['label'],
		scope: ILivechatCustomField['scope'],
		visibility: ILivechatCustomField['visibility'],
		extraData: any,
	) {
        /* Implementation Hidden */
    }

	findByIdsAndScope<T extends Document = ILivechatCustomField>(
		ids: ILivechatCustomField['_id'][],
		scope: ILivechatCustomField['scope'],
		options?: FindOptions<ILivechatCustomField>,
	): FindCursor<T> {
        /* Implementation Hidden */
    }
}

```