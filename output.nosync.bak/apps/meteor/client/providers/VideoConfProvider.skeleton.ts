## File: apps/meteor/client/providers/VideoConfProvider.tsx

```typescript
import { useToastMessageDispatch, useSetting } from '@rocket.chat/ui-contexts';
import type { VideoConfPopupPayload, VideoConfContextValue } from '@rocket.chat/ui-video-conf';
import { VideoConfContext } from '@rocket.chat/ui-video-conf';
import type { ReactNode } from 'react';
import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { VideoConfManager } from '../lib/VideoConfManager';
import VideoConfPopups from '../views/room/contextualBar/VideoConference/VideoConfPopups';
import { useVideoConfOpenCall } from '../views/room/contextualBar/VideoConference/hooks/useVideoConfOpenCall';

export type VideoConfContextProviderProps = { children: ReactNode };

const VideoConfContextProvider = ({ children }: VideoConfContextProviderProps) => {
    /* Implementation Hidden */
};

export default VideoConfContextProvider;

```