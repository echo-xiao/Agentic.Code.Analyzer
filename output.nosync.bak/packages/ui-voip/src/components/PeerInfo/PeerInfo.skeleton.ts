## File: packages/ui-voip/src/components/PeerInfo/PeerInfo.tsx

```typescript
import type { ComponentProps } from 'react';

import { InternalUser, PhoneNumber } from '.';

export type PeerInfoProps = ComponentProps<typeof InternalUser> | ComponentProps<typeof PhoneNumber>;

const PeerInfo = (props: PeerInfoProps) => {
    /* Implementation Hidden */
};

export default PeerInfo;

```