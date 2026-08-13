## File: packages/ui-client/src/components/UserStatus/Busy.tsx

```typescript
import type { UserStatusProps } from './UserStatus';
import UserStatus from './UserStatus';

type BusyProps = Omit<UserStatusProps, 'status'>;

function Busy(props: BusyProps) {
    /* Implementation Hidden */
}

export default Busy;

```