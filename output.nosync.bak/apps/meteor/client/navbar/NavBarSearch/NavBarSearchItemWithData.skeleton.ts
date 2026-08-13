## File: apps/meteor/client/navbar/NavBarSearch/NavBarSearchItemWithData.tsx

```typescript
import { SidebarV2ItemIcon } from '@rocket.chat/fuselage';
import type { SubscriptionWithRoom } from '@rocket.chat/ui-contexts';
import type { ComponentProps, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import NavBarSearchItem from './NavBarSearchItem';
import { RoomIcon } from '../../components/RoomIcon';
import { roomCoordinator } from '../../lib/rooms/roomCoordinator';
import SidebarItemBadges from '../../sidebar/badges/SidebarItemBadges';
import { useUnreadDisplay } from '../../sidebar/hooks/useUnreadDisplay';

export type NavBarSearchItemWithDataProps = {
	room: SubscriptionWithRoom;
	id: string;
	AvatarTemplate: ReactNode;
} & Partial<ComponentProps<typeof NavBarSearchItem>>;

const NavBarSearchItemWithData = ({ room, AvatarTemplate, ...props }: NavBarSearchItemWithDataProps) => {
    /* Implementation Hidden */
};

export default NavBarSearchItemWithData;

```