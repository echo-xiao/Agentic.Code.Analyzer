## File: apps/meteor/client/views/room/contextualBar/VideoConference/VideoConfPopups/VideoConfPopups.tsx

```typescript
import { FocusScope } from '@react-aria/focus';
import { useCustomSound } from '@rocket.chat/ui-contexts';
import type { VideoConfPopupPayload } from '@rocket.chat/ui-video-conf';
import {
	VideoConfPopupBackdrop,
	useVideoConfIsCalling,
	useVideoConfIsRinging,
	useVideoConfIncomingCalls,
	VideoConfPopupSkeleton,
} from '@rocket.chat/ui-video-conf';
import { lazy, Suspense, useEffect, useMemo } from 'react';

import VideoConfPopupPortal from '../../../../../portals/VideoConfPopupPortal';

const VideoConfPopup = lazy(() => import('./VideoConfPopup'));

export type VideoConfPopupsProps = { children?: VideoConfPopupPayload };

const VideoConfPopups = ({ children }: VideoConfPopupsProps) => {
    /* Implementation Hidden */
};

export default VideoConfPopups;

```