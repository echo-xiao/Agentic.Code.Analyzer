## File: apps/meteor/client/views/room/contextualBar/Info/EditRoomInfo/useEditRoomInitialValues.ts

```typescript
import type { IRoomWithRetentionPolicy, RoomType, MessageTypesValues } from '@rocket.chat/core-typings';
import { usePermission } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';

import { msToTimeUnit, TIMEUNIT } from '../../../../../lib/convertTimeUnit';
import { roomCoordinator } from '../../../../../lib/rooms/roomCoordinator';
import { useRetentionPolicy } from '../../../hooks/useRetentionPolicy';

export type EditRoomInfoFormData = {
	roomName: string;
	roomTopic: string;
	roomAnnouncement: string;
	roomDescription: string;
	roomType: RoomType;
	roomAvatar?: string;
	readOnly: boolean;
	reactWhenReadOnly: boolean;
	archived: boolean;
	joinCodeRequired: boolean;
	hideSysMes: boolean;
	encrypted: boolean;
	retentionEnabled: boolean;
	retentionOverrideGlobal: boolean;
	retentionMaxAge: number;
	retentionExcludePinned: boolean;
	retentionFilesOnly: boolean;
	retentionIgnoreThreads: boolean;
	showChannels: boolean;
	showDiscussions: boolean;
	joinCode: string;
	systemMessages: MessageTypesValues[];
};

export const useEditRoomInitialValues = (room: IRoomWithRetentionPolicy): Partial<EditRoomInfoFormData> => {
    /* Implementation Hidden */
};

```