## File: packages/ui-voip/src/providers/useMediaSessionControls.ts

```typescript
import type { MediaSignalingSession } from '@rocket.chat/media-signaling';
import { useMemo } from 'react';

import { getEndCall } from '../utils/instanceControlsGetters';

export type MediaSessionControls = {
	toggleMute: () => void;
	toggleHold: () => void;
	endCall: () => void;
	startCall: (id: string, kind: 'user' | 'sip') => Promise<void>;
	acceptCall: () => void;
	changeDevice: (deviceId: string) => Promise<void>;
	forwardCall: (type: 'user' | 'sip', id: string) => void;
	sendTone: (tone: string) => void;
	toggleScreenSharing: () => void;
};

export const useMediaSessionControls = (instance?: MediaSignalingSession): MediaSessionControls => {
    /* Implementation Hidden */
};

```