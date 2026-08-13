## File: apps/meteor/lib/rooms/roomTypes/public.ts

```typescript
import type { IRoomTypeConfig } from '../../../definition/IRoomTypeConfig';
import type { RoomCoordinator } from '../coordinator';

declare module '@rocket.chat/ui-contexts' {
	export interface IRouterPaths {
		channel: {
			pathname: `/channel/${string}${`/${string}` | ''}${`/${string}` | ''}`;
			pattern: '/channel/:name/:tab?/:context?';
		};
	}
}

export function getPublicRoomType(_coordinator: RoomCoordinator): IRoomTypeConfig {
    /* Implementation Hidden */
}

```