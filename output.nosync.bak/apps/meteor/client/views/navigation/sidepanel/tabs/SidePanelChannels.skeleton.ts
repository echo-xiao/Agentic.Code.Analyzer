## File: apps/meteor/client/views/navigation/sidepanel/tabs/SidePanelChannels.tsx

```typescript
import type { ISubscription } from '@rocket.chat/core-typings';
import { useUserDisplayName } from '@rocket.chat/ui-client';

import { useUnreadOnlyToggle } from '../../contexts/RoomsNavigationContext';
import SidePanel from '../SidePanel';
import { useChannelsChildrenList } from '../hooks/useChannelsChildrenList';

export type SidePanelChannelsProps = { parentRid: string; subscription: ISubscription };

const SidePanelChannels = ({ parentRid, subscription }: SidePanelChannelsProps) => {
    /* Implementation Hidden */
};

export default SidePanelChannels;

```