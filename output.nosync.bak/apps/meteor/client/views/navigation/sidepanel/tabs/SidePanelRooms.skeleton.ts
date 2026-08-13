## File: apps/meteor/client/views/navigation/sidepanel/tabs/SidePanelRooms.tsx

```typescript
import { useUserSubscription } from '@rocket.chat/ui-contexts';

import SidePanelAll from './SidePanelAll';
import SidePanelChannels from './SidePanelChannels';
import SidePanelTeams from './SidePanelTeams';
import { withErrorBoundary } from '../../../../components/withErrorBoundary';
import { useSidePanelFilter } from '../../contexts/RoomsNavigationContext';

export type SidePanelRoomsProps = { parentRid: string };

const SidePanelRooms = ({ parentRid }: SidePanelRoomsProps) => {
    /* Implementation Hidden */
};

export default withErrorBoundary(SidePanelRooms);

```