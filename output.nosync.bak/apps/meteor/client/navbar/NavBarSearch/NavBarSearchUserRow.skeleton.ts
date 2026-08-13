## File: apps/meteor/client/navbar/NavBarSearch/NavBarSearchUserRow.tsx

```typescript
import { SidebarV2ItemIcon } from '@rocket.chat/fuselage';
import type { SubscriptionWithRoom } from '@rocket.chat/ui-contexts';
import { useSetting } from '@rocket.chat/ui-contexts';
import type { ComponentProps, ReactNode } from 'react';
import { memo } from 'react';

import NavBarSearchItem from './NavBarSearchItem';
import { ReactiveUserStatus } from '../../components/UserStatus';
import { roomCoordinator } from '../../lib/rooms/roomCoordinator';

export type NavBarSearchUserRowProps = {
	room: SubscriptionWithRoom;
	id: string;
	AvatarTemplate: ReactNode;
} & Partial<ComponentProps<typeof NavBarSearchItem>>;

const NavBarSearchUserRow = ({ room, id, AvatarTemplate, ...props }: NavBarSearchUserRowProps) => {
    /* Implementation Hidden */
};

export default memo(NavBarSearchUserRow);

```