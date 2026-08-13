## File: apps/meteor/client/views/omnichannel/components/RoomActivityIcon.tsx

```typescript
import type { IOmnichannelRoom } from '@rocket.chat/core-typings';
import { Icon } from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

import { useIsRoomOverMacLimit } from '../hooks/useIsRoomOverMacLimit';

export type RoomActivityIconProps = {
	room: IOmnichannelRoom;
};

const RoomActivityIcon = ({ room }: RoomActivityIconProps) => {
    /* Implementation Hidden */
};

export default RoomActivityIcon;

```