## File: apps/meteor/app/statistics/server/functions/updateStatsCounter.ts

```typescript
import { Settings } from '@rocket.chat/models';

import { notifyOnSettingChanged } from '../../../lib/server/lib/notifyListener';
import telemetryEvent from '../lib/telemetryEvents';

type updateCounterDataType = { settingsId: string };

export function updateCounter(data: updateCounterDataType): void {
    /* Implementation Hidden */
}

telemetryEvent.register('updateCounter', updateCounter);

```