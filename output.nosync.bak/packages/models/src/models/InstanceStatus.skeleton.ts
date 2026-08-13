## File: packages/models/src/models/InstanceStatus.ts

```typescript
import type { IInstanceStatus } from '@rocket.chat/core-typings';
import type { IInstanceStatusModel } from '@rocket.chat/model-typings';
import type { Db, UpdateResult, DeleteResult, ChangeStream } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class InstanceStatusRaw extends BaseRaw<IInstanceStatus> implements IInstanceStatusModel {
	constructor(db: Db) {
        /* Implementation Hidden */
    }

	async getActiveInstanceCount(): Promise<number> {
        /* Implementation Hidden */
    }

	watchActiveInstances(): ChangeStream<IInstanceStatus> {
        /* Implementation Hidden */
    }

	async removeInstanceById(_id: IInstanceStatus['_id']): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	async setDocumentHeartbeat(documentId: string): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	async upsertInstance(instance: Partial<IInstanceStatus>): Promise<IInstanceStatus | null> {
        /* Implementation Hidden */
    }

	async updateConnections(_id: IInstanceStatus['_id'], conns: number) {
        /* Implementation Hidden */
    }
}

```