## File: apps/meteor/server/tracing.ts

```typescript
import { startTracing } from '@rocket.chat/tracing';

import { client } from './database/utils';

startTracing({ service: 'core', db: client });

```