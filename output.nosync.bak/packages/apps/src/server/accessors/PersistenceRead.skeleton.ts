## File: packages/apps/src/server/accessors/PersistenceRead.ts

```typescript
import type { IPersistenceRead } from '@rocket.chat/apps-engine/definition/accessors';
import type { RocketChatAssociationRecord } from '@rocket.chat/apps-engine/definition/metadata';

import type { PersistenceBridge } from '../bridges';

export class PersistenceRead implements IPersistenceRead {
	constructor(
		private persistBridge: PersistenceBridge,
		private appId: string,
	) {
        /* Implementation Hidden */
    }

	public read(id: string): Promise<object> {
        /* Implementation Hidden */
    }

	public readByAssociation(association: RocketChatAssociationRecord): Promise<Array<object>> {
        /* Implementation Hidden */
    }

	public readByAssociations(associations: Array<RocketChatAssociationRecord>): Promise<Array<object>> {
        /* Implementation Hidden */
    }
}

```