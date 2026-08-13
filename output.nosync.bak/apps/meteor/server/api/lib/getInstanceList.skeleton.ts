## File: apps/meteor/server/api/lib/getInstanceList.ts

```typescript
import { makeFunction } from '@rocket.chat/patch-injection';
import type { BrokerNode } from 'moleculer';

export const getInstanceList = makeFunction(async (): Promise<BrokerNode[]> => []);

```