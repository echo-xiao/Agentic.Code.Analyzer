## File: apps/meteor/client/views/room/Header/RoomToolbox/hooks/useRoomToolboxActions.ts

```typescript
import type { GenericMenuItemProps } from '@rocket.chat/ui-client';
import { useLayout } from '@rocket.chat/ui-contexts';
import type { RoomToolboxContextValue } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

type MenuActionsProps = {
	id: string;
	items: GenericMenuItemProps[];
}[];

export const useRoomToolboxActions = ({ actions, openTab }: Pick<RoomToolboxContextValue, 'actions' | 'openTab'>) => {
    /* Implementation Hidden */
};

```