## File: apps/meteor/client/views/omnichannel/components/OmnichannelBadges/OmnichannelBadges.tsx

```typescript
import type { IRoom, ISubscription } from '@rocket.chat/core-typings';
import { isOmnichannelRoom } from '@rocket.chat/core-typings';

import { useOmnichannelPriorities } from '../../hooks/useOmnichannelPriorities';
import { PriorityIcon } from '../../priorities/PriorityIcon';
import RoomActivityIcon from '../RoomActivityIcon';

const OmnichannelBadges = ({ room }: { room: ISubscription & IRoom }) => {
    /* Implementation Hidden */
};

export default OmnichannelBadges;

```