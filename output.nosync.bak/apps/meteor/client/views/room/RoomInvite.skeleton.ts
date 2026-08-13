## File: apps/meteor/client/views/room/RoomInvite.tsx

```typescript
import { isRoomFederated } from '@rocket.chat/core-typings';
import type { IUser, IInviteSubscription } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, type ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';

import Header from './Header';
import RoomInviteBody from './body/RoomInviteBody';
import { useGoToHomeOnRemoved } from './body/hooks/useGoToHomeOnRemoved';
import type { IRoomWithFederationOriginalName } from './contexts/RoomContext';
import { useRoomInvitation } from './hooks/useRoomInvitation';
import RoomLayout from './layout/RoomLayout';
import { links } from '../../lib/links';
import { roomsQueryKeys, subscriptionsQueryKeys } from '../../lib/queryKeys';

type RoomInviteProps = Omit<ComponentProps<typeof RoomLayout>, 'header' | 'body' | 'aside'> & {
	userId?: IUser['_id'];
	room: IRoomWithFederationOriginalName;
	subscription: IInviteSubscription;
};

const RoomInvite = ({ room, subscription, userId, ...props }: RoomInviteProps) => {
    /* Implementation Hidden */
};

export default RoomInvite;

```