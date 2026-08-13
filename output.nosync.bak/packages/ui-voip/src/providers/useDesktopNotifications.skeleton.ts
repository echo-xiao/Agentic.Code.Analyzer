## File: packages/ui-voip/src/providers/useDesktopNotifications.ts

```typescript
import { useUserPreference } from '@rocket.chat/ui-contexts';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import type { PeerInfo, SessionState } from '../context/definitions';
import { convertAvatarUrlToPng } from '../utils/convertAvatarUrlToPng';

const getDisplayInfo = (peerInfo?: PeerInfo) => {
    /* Implementation Hidden */
};

export const useDesktopNotifications = (sessionInfo: SessionState) => {
    /* Implementation Hidden */
};

```