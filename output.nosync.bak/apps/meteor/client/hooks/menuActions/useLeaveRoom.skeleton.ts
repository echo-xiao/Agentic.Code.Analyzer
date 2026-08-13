## File: apps/meteor/client/hooks/menuActions/useLeaveRoom.tsx

```typescript
import type { RoomType } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import type { TranslationKey } from '@rocket.chat/ui-contexts';
import { useEndpoint, useRouter, useSetModal, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import { LegacyRoomManager } from '../../../app/ui-utils/client';
import { UiTextContext } from '../../../definition/IRoomTypeConfig';
import WarningModal from '../../components/WarningModal';
import { roomCoordinator } from '../../lib/rooms/roomCoordinator';

const leaveEndpoints = {
	p: '/v1/groups.leave',
	c: '/v1/channels.leave',
	d: '/v1/im.leave',
	v: '/v1/channels.leave',
	l: '/v1/groups.leave',
} as const;

type LeaveRoomProps = {
	rid: string;
	type: RoomType;
	name: string;
	roomOpen?: boolean;
};

// TODO: this menu action should consider team leaving
export const useLeaveRoomAction = ({ rid, type, name, roomOpen }: LeaveRoomProps) => {
    /* Implementation Hidden */
};

```