## File: packages/ui-client/src/components/UserStatus/Away.tsx

```typescript
import type { ComponentPropsWithoutRef } from 'react';

import UserStatus from './UserStatus';

type AwayProps = Omit<ComponentPropsWithoutRef<typeof UserStatus>, 'status'>;

function Away(props: AwayProps) {
    /* Implementation Hidden */
}

export default Away;

```