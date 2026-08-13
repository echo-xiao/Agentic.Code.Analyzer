## File: apps/meteor/app/authorization/client/hasPermission.ts

```typescript
import { liveAuthorizationFunctions } from './liveAuthorizationFunctions';

export const { hasAllPermission, hasAtLeastOnePermission, hasPermission, userHasAllPermission } = liveAuthorizationFunctions;

```