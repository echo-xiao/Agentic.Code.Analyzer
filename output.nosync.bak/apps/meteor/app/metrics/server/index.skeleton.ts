## File: apps/meteor/app/metrics/server/index.ts

```typescript
import { metrics } from './lib/metrics';
import StatsTracker from './lib/statsTracker';

import './lib/collectMetrics';

export { metrics, StatsTracker };

```