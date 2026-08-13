## File: apps/meteor/lib/rooms/roomTypes/private.ts

```typescript
import type { IRoomTypeConfig } from '../../../definition/IRoomTypeConfig';
import type { RoomCoordinator } from '../coordinator';

declare module '@rocket.chat/ui-contexts' {
	export interface IRouterPaths {
		group: {
			pathname: `/group/${string}${`/${string}` | ''}${`/${string}` | ''}`;
			pattern: '/group/:name/:tab?/:context?';
		};
	}
}

export function getPrivateRoomType(_coordinator: RoomCoordinator): IRoomTypeConfig {
    /* Implementation Hidden */
}

```