## File: apps/meteor/client/views/room/lib/getRoomGroup.ts

```typescript
import type { RoomType, IRoom } from '@rocket.chat/core-typings';
import type { RoomToolboxActionConfig } from '@rocket.chat/ui-contexts';

const groupsDict = {
	l: 'live',
	d: 'direct',
	p: 'group',
	c: 'channel',
} as const satisfies Record<RoomType, RoomToolboxActionConfig['groups'][number]>;

export const getRoomGroup = (room: IRoom) => {
    /* Implementation Hidden */
};

```