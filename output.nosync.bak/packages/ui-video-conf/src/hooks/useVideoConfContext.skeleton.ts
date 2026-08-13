## File: packages/ui-video-conf/src/hooks/useVideoConfContext.ts

```typescript
import { useContext, useMemo, useSyncExternalStore } from 'react';

import { VideoConfContext } from '../VideoConfContext';

const useVideoConfContext = () => {
    /* Implementation Hidden */
};

export const useVideoConfDispatchOutgoing = () => useVideoConfContext().dispatchOutgoing;
export const useVideoConfDismissOutgoing = () => useVideoConfContext().dismissOutgoing;
export const useVideoConfStartCall = () => useVideoConfContext().startCall;
export const useVideoConfAcceptCall = () => useVideoConfContext().acceptCall;
export const useVideoConfJoinCall = () => useVideoConfContext().joinCall;
export const useVideoConfDismissCall = () => useVideoConfContext().dismissCall;
export const useVideoConfAbortCall = () => useVideoConfContext().abortCall;
export const useVideoConfRejectIncomingCall = () => useVideoConfContext().rejectIncomingCall;
export const useVideoConfSetPreferences = () => useVideoConfContext().setPreferences;
export const useVideoConfLoadCapabilities = () => useVideoConfContext().loadCapabilities;

export const useVideoConfIncomingCalls = () => {
    /* Implementation Hidden */
};

export const useVideoConfIsRinging = () => {
    /* Implementation Hidden */
};

export const useVideoConfIsCalling = () => {
    /* Implementation Hidden */
};

export const useVideoConfCapabilities = () => {
    /* Implementation Hidden */
};

export const useVideoConfPreferences = () => {
    /* Implementation Hidden */
};

```