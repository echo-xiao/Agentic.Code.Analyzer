## File: apps/meteor/client/views/marketplace/hooks/usePrivateAppsEnabled.ts

```typescript
import { useLicense } from '@rocket.chat/ui-client';

export const usePrivateAppsEnabled = () => (useLicense({ loadValues: true }).data?.limits?.privateApps?.max ?? 0) !== 0;

```