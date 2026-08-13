## File: apps/meteor/client/views/room/Header/ParentRoom/ParentDiscussion/ParentDiscussion.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { useTranslation } from 'react-i18next';

import { roomCoordinator } from '../../../../../lib/rooms/roomCoordinator';
import ParentRoomButton from '../ParentRoomButton';

export type ParentDiscussionProps = {
	loading?: boolean;
	room: Pick<IRoom, '_id' | 't' | 'name' | 'fname' | 'prid' | 'u'>;
};

const ParentDiscussion = ({ loading = false, room }: ParentDiscussionProps) => {
    /* Implementation Hidden */
};

export default ParentDiscussion;

```