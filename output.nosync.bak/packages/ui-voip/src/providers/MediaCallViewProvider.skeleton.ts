## File: packages/ui-voip/src/providers/MediaCallViewProvider.tsx

```typescript
import { useGoToDirectMessage } from '@rocket.chat/ui-client';
import type { Device } from '@rocket.chat/ui-contexts';
import {
	useSetOutputMediaDevice,
	useSetInputMediaDevice,
	useSetModal,
	useSelectedDevices,
	useToastMessageDispatch,
} from '@rocket.chat/ui-contexts';
import type { ReactNode } from 'react';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useCallSounds } from './useCallSounds';
import { useDesktopNotifications } from './useDesktopNotifications';
import { useMediaSession } from './useMediaSession';
import { useMediaSessionControls } from './useMediaSessionControls';
import { useScreenShareStreams } from './useScreenShareStreams';
import { useWidgetExternalControlSignalListener } from './useWidgetExternalControlSignalListener';
import useWidgetPositionTracker from './useWidgetPositionTracker';
import { useMediaCallInstance } from '../context/MediaCallInstanceContext';
import MediaCallViewContext from '../context/MediaCallViewContext';
import type { PeerInfo } from '../context/definitions';
import { stopTracks, useDevicePermissionPrompt2, PermissionRequestCancelledCallRejectedError } from '../hooks/useDevicePermissionPrompt';
import { isValidTone, useTonePlayer } from '../hooks/useTonePlayer';
import TransferModal from '../views/TransferModal';

type MediaCallViewProviderProps = {
	children?: ReactNode;
};

const MediaCallViewProvider = ({ children }: MediaCallViewProviderProps) => {
    /* Implementation Hidden */
};

export default MediaCallViewProvider;

```