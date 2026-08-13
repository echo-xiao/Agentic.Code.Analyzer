## File: apps/meteor/client/views/room/Header/RoomMemberStatus.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { useUserId, useUserPresence } from '@rocket.chat/ui-contexts';
import type { ReactElement } from 'react';

import MarkdownText from '../../../components/MarkdownText';
import { useExpirationText } from '../../../hooks/useExpirationText';
import { getUidDirectMessage } from '../../../lib/utils/getUidDirectMessage';

export type RoomMemberStatusProps = {
	room: IRoom;
};

const RoomMemberStatus = ({ room }: RoomMemberStatusProps): ReactElement | null => {
    /* Implementation Hidden */
};

export default RoomMemberStatus;

```