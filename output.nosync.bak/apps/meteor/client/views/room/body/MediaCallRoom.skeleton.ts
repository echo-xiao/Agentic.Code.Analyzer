## File: apps/meteor/client/views/room/body/MediaCallRoom.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { isDirectMessageRoom } from '@rocket.chat/core-typings';
import type { PeerInfo } from '@rocket.chat/ui-voip';
import {
	MediaCallRoomActivity,
	usePeekMediaSessionState,
	usePeekMediaSessionPeerInfo,
	usePeekMediaSessionFeatures,
} from '@rocket.chat/ui-voip';
import type { ReactNode } from 'react';
import { memo } from 'react';

import { useRoom } from '../contexts/RoomContext';

const isMediaCallRoom = (room: IRoom, peerInfo?: PeerInfo) => {
    /* Implementation Hidden */
};

type MediaCallRoomProps = {
	children: ReactNode;
};

const MediaCallRoom = ({ children }: MediaCallRoomProps) => {
    /* Implementation Hidden */
};

export default memo(MediaCallRoom);

```