## File: apps/meteor/client/views/navigation/sidepanel/SidepanelItem/SidePanelParent.tsx

```typescript
import type { SubscriptionWithRoom } from '@rocket.chat/ui-contexts';
import { memo } from 'react';

import SidePanelParentRoom from './SidePanelParentRoom';
import SidePanelParentTeam from './SidePanelParentTeam';

export type SidePanelParentProps = { room: SubscriptionWithRoom };

const SidePanelParent = ({ room }: SidePanelParentProps) => {
    /* Implementation Hidden */
};

export default memo(SidePanelParent);

```