## File: apps/meteor/client/lib/rooms/roomTypes/favorite.ts

```typescript
import { getFavoriteRoomType } from '../../../../lib/rooms/roomTypes/favorite';
import { roomCoordinator } from '../roomCoordinator';

export const FavoriteRoomType = getFavoriteRoomType(roomCoordinator);

roomCoordinator.add(
	{
		...FavoriteRoomType,
		label: 'Favorites',
	},
	{
		getIcon() {
			return 'star';
		},
	},
);

```