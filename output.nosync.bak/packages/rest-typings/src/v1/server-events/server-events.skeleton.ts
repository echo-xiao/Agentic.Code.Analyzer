## File: packages/rest-typings/src/v1/server-events/server-events.ts

```typescript
import type { IServerEvents } from '@rocket.chat/core-typings';

import type { ServerEventsAuditSettingsParamsGET } from './ServerEventsAuditSettingsParamsGET';
import type { PaginatedResult } from '../../helpers/PaginatedResult';

export type ServerEventsEndpoints = {
	'/v1/audit.settings': {
		GET: (params: ServerEventsAuditSettingsParamsGET) => PaginatedResult<{
			events: IServerEvents['settings.changed'][];
		}>;
	};
};

```