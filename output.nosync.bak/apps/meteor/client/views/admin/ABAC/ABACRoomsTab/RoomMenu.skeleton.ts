## File: apps/meteor/client/views/admin/ABAC/ABACRoomsTab/RoomMenu.tsx

```typescript
import { GenericMenu } from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

import { useRoomItems } from '../hooks/useRoomItems';

export type RoomMenuProps = {
	room: { rid: string; name: string };
};

const RoomMenu = ({ room }: RoomMenuProps) => {
    /* Implementation Hidden */
};

export default RoomMenu;

```