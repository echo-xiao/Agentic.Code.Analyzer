## File: apps/meteor/client/views/admin/ABAC/hooks/useABACTabPermissions.ts

```typescript
import { usePermission } from '@rocket.chat/ui-contexts';

export type ABACTab = 'settings' | 'room-attributes' | 'rooms' | 'logs';

export const ABAC_TAB_ORDER: ABACTab[] = ['settings', 'room-attributes', 'rooms', 'logs'];

export const useABACTabPermissions = (): Record<ABACTab, boolean> => {
    /* Implementation Hidden */
};

```