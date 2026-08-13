## File: apps/meteor/client/views/room/contextualBar/VideoConference/VideoConfPopups/VideoConfPopup/TimedVideoConfPopup.tsx

```typescript
import { useFocusManager } from '@react-aria/focus';
import type { IRoom } from '@rocket.chat/core-typings';
import { useUserRoom } from '@rocket.chat/ui-contexts';
import {
	useVideoConfAcceptCall,
	useVideoConfAbortCall,
	useVideoConfRejectIncomingCall,
	useVideoConfDismissCall,
	useVideoConfStartCall,
	useVideoConfDismissOutgoing,
} from '@rocket.chat/ui-video-conf';
import { useEffect, useState } from 'react';

import IncomingPopup from './IncomingPopup';
import OutgoingPopup from './OutgoingPopup';
import StartCallPopup from './StartCallPopup';

export type TimedVideoConfPopupProps = {
	id: string;
	rid: IRoom['_id'];
	isReceiving?: boolean;
	isCalling?: boolean;
	position: number;
	onClose?: (id: string) => void;
};

const TimedVideoConfPopup = ({ id, rid, isReceiving = false, isCalling = false, position }: TimedVideoConfPopupProps) => {
    /* Implementation Hidden */
};

export default TimedVideoConfPopup;

```