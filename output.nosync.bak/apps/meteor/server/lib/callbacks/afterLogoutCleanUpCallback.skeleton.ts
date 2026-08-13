## File: apps/meteor/server/lib/callbacks/afterLogoutCleanUpCallback.ts

```typescript
import { Callbacks } from './callbacksBase';

/** @deprecated - replace with UserProvider onLogout callback */
export const afterLogoutCleanUpCallback = Callbacks.create('afterLogoutCleanUp');

```