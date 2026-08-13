## File: apps/meteor/client/views/navigation/sidepanel/tabs/SidePanelTeams.tsx

```typescript
import type { ISubscription } from '@rocket.chat/core-typings';

import { useUnreadOnlyToggle } from '../../contexts/RoomsNavigationContext';
import SidePanel from '../SidePanel';
import { useChannelsChildrenList } from '../hooks/useChannelsChildrenList';

export type SidePanelTeamsProps = { parentRid: string; subscription: ISubscription };

const SidePanelTeams = ({ parentRid, subscription }: SidePanelTeamsProps) => {
    /* Implementation Hidden */
};

export default SidePanelTeams;

```