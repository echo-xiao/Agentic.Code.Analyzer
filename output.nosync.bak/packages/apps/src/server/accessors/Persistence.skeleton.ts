## File: packages/apps/src/server/accessors/Persistence.ts

```typescript
import type { IPersistence } from '@rocket.chat/apps-engine/definition/accessors';
import type { RocketChatAssociationRecord } from '@rocket.chat/apps-engine/definition/metadata';

import type { PersistenceBridge } from '../bridges/PersistenceBridge';

export class Persistence implements IPersistence {
	constructor(
		private persistBridge: PersistenceBridge,
		private appId: string,
	) {
        /* Implementation Hidden */
    }

	public create(data: object): Promise<string> {
        /* Implementation Hidden */
    }

	public createWithAssociation(data: object, association: RocketChatAssociationRecord): Promise<string> {
        /* Implementation Hidden */
    }

	public createWithAssociations(data: object, associations: Array<RocketChatAssociationRecord>): Promise<string> {
        /* Implementation Hidden */
    }

	public update(id: string, data: object, upsert = false): Promise<string> {
        /* Implementation Hidden */
    }

	public updateByAssociation(association: RocketChatAssociationRecord, data: object, upsert = false): Promise<string> {
        /* Implementation Hidden */
    }

	public updateByAssociations(associations: Array<RocketChatAssociationRecord>, data: object, upsert = false): Promise<string> {
        /* Implementation Hidden */
    }

	public remove(id: string): Promise<object> {
        /* Implementation Hidden */
    }

	public removeByAssociation(association: RocketChatAssociationRecord): Promise<Array<object>> {
        /* Implementation Hidden */
    }

	public removeByAssociations(associations: Array<RocketChatAssociationRecord>): Promise<Array<object>> {
        /* Implementation Hidden */
    }
}

```