## File: apps/meteor/client/views/room/body/hooks/useUnreadMessages.ts

```typescript
import type { IRoom, ISubscription } from '@rocket.chat/core-typings';
import { useRouter } from '@rocket.chat/ui-contexts';
import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { RoomHistoryManager } from '../../../../../app/ui-utils/client';
import { useRoomHistoryState } from '../../../../../app/ui-utils/client/lib/RoomHistoryManager';
import { withDebouncing } from '../../../../../lib/utils/highOrderFunctions';
import { useOpenedRoomUnreadSince } from '../../../../lib/RoomManager';
import { roomCoordinator } from '../../../../lib/rooms/roomCoordinator';
import { setMessageJumpQueryStringParameter } from '../../../../lib/utils/setMessageJumpQueryStringParameter';
import { Messages } from '../../../../stores';
import { useChat } from '../../contexts/ChatContext';

interface IUnreadMessages {
	count: number;
	since: Date;
}

const useUnreadMessages = (room: IRoom): readonly [data: IUnreadMessages | undefined, setUnreadCount: Dispatch<SetStateAction<number>>] => {
    /* Implementation Hidden */
};

export const useHandleUnread = (
	room: IRoom,
	subscription?: ISubscription,
): {
	handleUnreadBarJumpToButtonClick: () => void;
	handleMarkAsReadButtonClick: () => void;
	counter: readonly [number, Date | undefined];
	setUnreadCount: Dispatch<SetStateAction<number>>;
	setLastMessageDate: Dispatch<SetStateAction<Date | undefined>>;
	debouncedMessageRead: () => void;
} => {
    /* Implementation Hidden */
};

```