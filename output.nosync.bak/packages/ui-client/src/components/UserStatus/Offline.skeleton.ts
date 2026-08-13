## File: packages/ui-client/src/components/UserStatus/Offline.tsx

```typescript
import type { UserStatusProps } from './UserStatus';
import UserStatus from './UserStatus';

type OfflineProps = Omit<UserStatusProps, 'status'>;

function Offline(props: OfflineProps) {
    /* Implementation Hidden */
}

export default Offline;

```