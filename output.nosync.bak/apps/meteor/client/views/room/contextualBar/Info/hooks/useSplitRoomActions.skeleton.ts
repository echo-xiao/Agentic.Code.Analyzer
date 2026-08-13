## File: apps/meteor/client/views/room/contextualBar/Info/hooks/useSplitRoomActions.ts

```typescript
import type { RoomInfoActionsProps } from '../RoomInfo/RoomInfoActions';

type UseSplitRoomActionsOptions = {
	size?: number;
};

/**
 *
 * @param room
 * @param options
 * @returns If more than two room actions are enabled `menu.regular` will be a non-empty array
 */
export const useSplitRoomActions = (actions: RoomInfoActionsProps['actions'], options?: UseSplitRoomActionsOptions) => {
    /* Implementation Hidden */
};

```