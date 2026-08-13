## File: apps/meteor/client/views/room/body/hooks/useFileUploadDropTarget.ts

```typescript
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { usePermission, useSetting, useTranslation, useUser } from '@rocket.chat/ui-contexts';
import type { DragEvent, ReactNode } from 'react';
import { useMemo, useSyncExternalStore } from 'react';

import { useDropTarget } from './useDropTarget';
import { roomCoordinator } from '../../../../lib/rooms/roomCoordinator';
import { useIsRoomOverMacLimit } from '../../../omnichannel/hooks/useIsRoomOverMacLimit';
import { useChat } from '../../contexts/ChatContext';
import { useRoom, useRoomSubscription } from '../../contexts/RoomContext';

export const useFileUploadDropTarget = (): readonly [
	fileUploadTriggerProps: {
		onDragEnter: (event: DragEvent<Element>) => void;
	},
	fileUploadOverlayProps: {
		visible: boolean;
		onDismiss: () => void;
		enabled: boolean;
		reason?: ReactNode;
	},
] => {
    /* Implementation Hidden */
};

```