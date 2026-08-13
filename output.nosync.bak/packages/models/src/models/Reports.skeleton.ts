## File: packages/models/src/models/Reports.ts

```typescript
import type { IMessage, IReport, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { IReportsModel } from '@rocket.chat/model-typings';
import type { Db, Collection } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class ReportsRaw extends BaseRaw<IReport> implements IReportsModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<IReport>>) {
        /* Implementation Hidden */
    }

	createWithMessageDescriptionAndUserId(message: IMessage, description: string, userId: string): ReturnType<BaseRaw<IReport>['insertOne']> {
        /* Implementation Hidden */
    }
}

```