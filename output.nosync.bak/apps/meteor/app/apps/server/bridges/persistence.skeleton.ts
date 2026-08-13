## File: apps/meteor/app/apps/server/bridges/persistence.ts

```typescript
import type { IAppServerOrchestrator } from '@rocket.chat/apps';
import { PersistenceBridge } from '@rocket.chat/apps/dist/server/bridges/PersistenceBridge';
import type { RocketChatAssociationRecord } from '@rocket.chat/apps-engine/definition/metadata';
import type { InsertOneResult } from 'mongodb';

export class AppPersistenceBridge extends PersistenceBridge {
	constructor(private readonly orch: IAppServerOrchestrator) {
        /* Implementation Hidden */
    }

	protected async purge(appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	protected async create(data: object, appId: string): Promise<string> {
        /* Implementation Hidden */
    }

	protected async createWithAssociations(data: object, associations: Array<RocketChatAssociationRecord>, appId: string): Promise<string> {
        /* Implementation Hidden */
    }

	protected async readById(id: string, appId: string): Promise<object> {
        /* Implementation Hidden */
    }

	protected async readByAssociations(associations: Array<RocketChatAssociationRecord>, appId: string): Promise<Array<object>> {
        /* Implementation Hidden */
    }

	protected async remove(id: string, appId: string): Promise<object | undefined> {
        /* Implementation Hidden */
    }

	protected async removeByAssociations(
		associations: Array<RocketChatAssociationRecord>,
		appId: string,
	): Promise<Array<object> | undefined> {
        /* Implementation Hidden */
    }

	protected async update(id: string, data: object, _upsert: boolean, appId: string): Promise<string> {
        /* Implementation Hidden */
    }

	protected async updateByAssociations(
		associations: Array<RocketChatAssociationRecord>,
		data: object,
		upsert = true,
		appId: string,
	): Promise<string> {
        /* Implementation Hidden */
    }
}

```