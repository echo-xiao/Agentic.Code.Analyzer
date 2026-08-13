## File: apps/meteor/ee/server/sdk/index.ts

```typescript
import { proxify } from '@rocket.chat/core-services';

import type { IInstanceService } from './types/IInstanceService';

export const Instance = proxify<IInstanceService>('instance');

```