## File: apps/meteor/server/services/analytics/service.ts

```typescript
import { ServiceClassInternal } from '@rocket.chat/core-services';
import type { IAnalyticsService } from '@rocket.chat/core-services';
import type { IAnalyticsSeatRequest } from '@rocket.chat/core-typings';
import { Analytics } from '@rocket.chat/models';

export class AnalyticsService extends ServiceClassInternal implements IAnalyticsService {
	protected name = 'analytics';

	async saveSeatRequest(): Promise<void> {
        /* Implementation Hidden */
    }

	async getSeatRequestCount(): Promise<number> {
        /* Implementation Hidden */
    }

	async resetSeatRequestCount(): Promise<void> {
        /* Implementation Hidden */
    }
}

```