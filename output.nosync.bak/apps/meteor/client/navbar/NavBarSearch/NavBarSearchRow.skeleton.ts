## File: apps/meteor/client/navbar/NavBarSearch/NavBarSearchRow.tsx

```typescript
import { RoomAvatar } from '@rocket.chat/ui-avatar';
import type { SubscriptionWithRoom } from '@rocket.chat/ui-contexts';
import { memo } from 'react';

import NavBarSearchItemWithData from './NavBarSearchItemWithData';
import NavBarSearchUserRow from './NavBarSearchUserRow';

export type NavBarSearchRowProps = {
	room: SubscriptionWithRoom;
	onClick: () => void;
};

const NavBarSearchRow = ({ room, onClick }: NavBarSearchRowProps) => {
    /* Implementation Hidden */
};

export default memo(NavBarSearchRow);

```