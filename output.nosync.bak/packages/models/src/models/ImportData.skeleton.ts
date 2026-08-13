## File: packages/models/src/models/ImportData.ts

```typescript
import type {
	IImportChannelRecord,
	IImportMessageRecord,
	IImportRecord,
	IImportUserRecord,
	IImportContactRecord,
	RocketChatRecordDeleted,
} from '@rocket.chat/core-typings';
import type { IImportDataModel } from '@rocket.chat/model-typings';
import type { Collection, FindCursor, Db, IndexDescription } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class ImportDataRaw extends BaseRaw<IImportRecord> implements IImportDataModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IImportRecord>>) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	getAllUsers(): FindCursor<IImportUserRecord> {
        /* Implementation Hidden */
    }

	getAllMessages(): FindCursor<IImportMessageRecord> {
        /* Implementation Hidden */
    }

	getAllChannels(): FindCursor<IImportChannelRecord> {
        /* Implementation Hidden */
    }

	getAllUsersForSelection(): Promise<Array<IImportUserRecord>> {
        /* Implementation Hidden */
    }

	getAllChannelsForSelection(): Promise<Array<IImportChannelRecord>> {
        /* Implementation Hidden */
    }

	getAllContactsForSelection(): Promise<IImportContactRecord[]> {
        /* Implementation Hidden */
    }

	async checkIfDirectMessagesExists(): Promise<boolean> {
        /* Implementation Hidden */
    }

	async countMessages(): Promise<number> {
        /* Implementation Hidden */
    }

	async findChannelImportIdByNameOrImportId(channelIdentifier: string): Promise<string | undefined> {
        /* Implementation Hidden */
    }
}

```