## File: apps/meteor/server/services/call-history/service.ts

```typescript
import { ServiceClassInternal, type ICallHistoryService } from '@rocket.chat/core-services';
import type { IUser, CallHistoryItem } from '@rocket.chat/core-typings';
import { CallHistory } from '@rocket.chat/models';

export class CallHistoryService extends ServiceClassInternal implements ICallHistoryService {
	protected name = 'call-history';

	public async search(
		uid: IUser['_id'],
		filters: {
			searchTerm?: string;
			direction?: CallHistoryItem['direction'];
			inStates?: CallHistoryItem['state'][];
		},
		pagination: {
			count: number;
			offset: number;
			sort?: Record<string, 1 | -1>;
		},
	): Promise<{ items: CallHistoryItem[]; total: number }> {
        /* Implementation Hidden */
    }
}

```