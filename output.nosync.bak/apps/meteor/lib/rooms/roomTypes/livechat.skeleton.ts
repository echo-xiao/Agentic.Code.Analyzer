## File: apps/meteor/lib/rooms/roomTypes/livechat.ts

```typescript
import type { IRoomTypeConfig } from '../../../definition/IRoomTypeConfig';
import type { RoomCoordinator } from '../coordinator';

declare module '@rocket.chat/ui-contexts' {
	export interface IRouterPaths {
		live: {
			pathname: `/live/${string}${`/${string}` | ''}${`/${string}` | ''}`;
			pattern: '/live/:id/:tab?/:context?';
		};
	}
}

export function getLivechatRoomType(_coordinator: RoomCoordinator): IRoomTypeConfig {
    /* Implementation Hidden */
}

```