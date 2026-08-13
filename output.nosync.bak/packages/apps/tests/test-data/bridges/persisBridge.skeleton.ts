## File: packages/apps/tests/test-data/bridges/persisBridge.ts

```typescript
import type { RocketChatAssociationRecord } from '@rocket.chat/apps-engine/definition/metadata';

import { PersistenceBridge } from '../../../src/server/bridges';

export class TestsPersisBridge extends PersistenceBridge {
	public purge(appId: string): Promise<void> {
        /* Implementation Hidden */
    }

	public create(data: any, appId: string): Promise<string> {
        /* Implementation Hidden */
    }

	public createWithAssociations(data: object, associations: Array<RocketChatAssociationRecord>, appId: string): Promise<string> {
        /* Implementation Hidden */
    }

	public readById(id: string, appId: string): Promise<object> {
        /* Implementation Hidden */
    }

	public readByAssociations(associations: Array<RocketChatAssociationRecord>, appId: string): Promise<Array<object>> {
        /* Implementation Hidden */
    }

	public remove(id: string, appId: string): Promise<object> {
        /* Implementation Hidden */
    }

	public removeByAssociations(associations: Array<RocketChatAssociationRecord>, appId: string): Promise<Array<object>> {
        /* Implementation Hidden */
    }

	public update(id: string, data: object, upsert: boolean, appId: string): Promise<string> {
        /* Implementation Hidden */
    }

	public updateByAssociations(
		associations: Array<RocketChatAssociationRecord>,
		data: object,
		upsert: boolean,
		appId: string,
	): Promise<string> {
        /* Implementation Hidden */
    }
}

```