## File: apps/meteor/client/views/navigation/sidepanel/SidepanelItem/RoomMenu.tsx

```typescript
import type { RoomType } from '@rocket.chat/core-typings';
import { GenericMenu } from '@rocket.chat/ui-client';
import type { LocationPathname } from '@rocket.chat/ui-contexts';
import { useTranslation } from '@rocket.chat/ui-contexts';
import { memo } from 'react';

import { useRoomMenuActions } from '../hooks/useRoomMenuActions';

export type RoomMenuProps = {
	rid: string;
	unread?: boolean;
	threadUnread?: boolean;
	alert?: boolean;
	roomOpen?: boolean;
	type: RoomType;
	cl?: boolean;
	name?: string;
	hideDefaultOptions: boolean;
	href: LocationPathname | undefined;
};

const RoomMenu = ({ rid, unread, threadUnread, alert, roomOpen, type, cl, name = '', hideDefaultOptions = false, href }: RoomMenuProps) => {
    /* Implementation Hidden */
};

export default memo(RoomMenu);

```