## File: apps/meteor/ee/server/models/raw/AuditLog.ts

```typescript
import type { RocketChatRecordDeleted, IAuditLog } from '@rocket.chat/core-typings';
import { BaseRaw } from '@rocket.chat/models';
import type { Collection, Db } from 'mongodb';

export class AuditLogRaw extends BaseRaw<IAuditLog> {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IAuditLog>>) {
        /* Implementation Hidden */
    }
}

```