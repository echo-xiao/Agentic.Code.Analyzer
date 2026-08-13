## File: apps/meteor/ee/server/patches/getInstanceList.ts

```typescript
import { getInstanceList } from '../../../server/api/lib/getInstanceList';
import { Instance } from '../sdk';

getInstanceList.patch(() => Instance.getInstances());

```