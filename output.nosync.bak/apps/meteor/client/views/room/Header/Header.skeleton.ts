## File: apps/meteor/client/views/room/Header/Header.tsx

```typescript
import { isInviteSubscription } from '@rocket.chat/core-typings';
import type { IRoom, ISubscription } from '@rocket.chat/core-typings';
import { useLayout, useSetting } from '@rocket.chat/ui-contexts';
import { lazy, memo } from 'react';

const RoomInviteHeader = lazy(() => import('./RoomInviteHeader'));
const OmnichannelRoomHeader = lazy(() => import('./Omnichannel/OmnichannelRoomHeader'));
const RoomHeaderE2EESetup = lazy(() => import('./RoomHeaderE2EESetup'));
const RoomHeader = lazy(() => import('./RoomHeader'));

export type HeaderProps = {
	room: IRoom;
	subscription?: ISubscription;
};

const Header = ({ room, subscription }: HeaderProps) => {
    /* Implementation Hidden */
};

export default memo(Header);

```