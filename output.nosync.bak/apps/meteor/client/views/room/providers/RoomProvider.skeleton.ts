## File: apps/meteor/client/views/room/providers/RoomProvider.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import type { ReactNode, ContextType } from 'react';
import { useMemo, memo, useEffect } from 'react';

import ComposerPopupProvider from './ComposerPopupProvider';
import RoomToolboxProvider from './RoomToolboxProvider';
import UserCardProvider from './UserCardProvider';
import { useRedirectOnSettingsChanged } from './hooks/useRedirectOnSettingsChanged';
import { useUsersNameChanged } from './hooks/useUsersNameChanged';
import { UserAction } from '../../../../app/ui/client/lib/UserAction';
import { RoomHistoryManager, useRoomHistoryState } from '../../../../app/ui-utils/client/lib/RoomHistoryManager';
import { omit } from '../../../../lib/utils/omit';
import { useFireGlobalEvent } from '../../../hooks/useFireGlobalEvent';
import { useRoomRolesQuery } from '../../../hooks/useRoomRolesQuery';
import { RoomManager } from '../../../lib/RoomManager';
import { roomCoordinator } from '../../../lib/rooms/roomCoordinator';
import ImageGalleryProvider from '../../../providers/ImageGalleryProvider';
import { Rooms, Subscriptions } from '../../../stores';
import RoomNotFound from '../RoomNotFound';
import RoomSkeleton from '../RoomSkeleton';
import type { IRoomWithFederationOriginalName } from '../contexts/RoomContext';
import { RoomContext } from '../contexts/RoomContext';

type RoomProviderProps = {
	children: ReactNode;
	rid: IRoom['_id'];
};

const RoomProvider = ({ rid, children }: RoomProviderProps) => {
    /* Implementation Hidden */
};

export default memo(RoomProvider);

```