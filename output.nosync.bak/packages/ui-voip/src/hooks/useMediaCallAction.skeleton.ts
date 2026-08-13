## File: packages/ui-voip/src/hooks/useMediaCallAction.ts

```typescript
import type { Keys as IconNames } from '@rocket.chat/icons';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { PeerInfo } from '../context';
import { usePeekMediaSessionPeerInfo } from '../context/usePeekMediaSessionPeerInfo';
import { usePeekMediaSessionState } from '../context/usePeekMediaSessionState';
import { useWidgetExternalControls } from '../context/useWidgetExternalControls';

export const useMediaCallAction = (
	callee?: PeerInfo,
): { title: string; icon: IconNames; action: (callee?: PeerInfo) => void } | undefined => {
    /* Implementation Hidden */
};

```