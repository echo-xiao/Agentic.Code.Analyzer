## File: apps/meteor/client/views/admin/rooms/RoomRow.tsx

```typescript
import { isDiscussion } from '@rocket.chat/core-typings';
import type { IRoom, RoomAdminFieldsType, Serialized } from '@rocket.chat/core-typings';
import { Box, Icon } from '@rocket.chat/fuselage';
import { useMediaQuery } from '@rocket.chat/fuselage-hooks';
import { RoomAvatar } from '@rocket.chat/ui-avatar';
import { GenericTableCell, GenericTableRow } from '@rocket.chat/ui-client';
import { useRouter } from '@rocket.chat/ui-contexts';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useFormatDate } from '../../../hooks/useFormatDate';
import { roomCoordinator } from '../../../lib/rooms/roomCoordinator';

const roomTypeI18nMap = {
	l: 'Omnichannel',
	c: 'Channel',
	d: 'Direct_Message',
	p: 'Private_Channel',
} as const;

const getRoomDisplayName = (room: Pick<Serialized<IRoom>, RoomAdminFieldsType>): string | undefined =>
	room.t === 'd' ? room.usernames?.join(' x ') : roomCoordinator.getRoomName(room.t, room as IRoom);

export type RoomRowProps = { room: Pick<Serialized<IRoom>, RoomAdminFieldsType> };

const RoomRow = ({ room }: RoomRowProps) => {
    /* Implementation Hidden */
};

export default RoomRow;

```