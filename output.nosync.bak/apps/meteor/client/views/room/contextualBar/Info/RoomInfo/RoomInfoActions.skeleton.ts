## File: apps/meteor/client/views/room/contextualBar/Info/RoomInfo/RoomInfoActions.tsx

```typescript
import type { Keys as IconKeys } from '@rocket.chat/icons';
import { InfoPanelAction } from '@rocket.chat/ui-client';

type Action = {
	id: string;
	content: string;
	icon: IconKeys;
	onClick: () => void;
	variant?: string;
};

export type RoomInfoActionsProps = {
	actions: { items: Action[] };
	className?: string;
};

const RoomInfoActions = ({ actions, className }: RoomInfoActionsProps) => {
    /* Implementation Hidden */
};

export default RoomInfoActions;

```