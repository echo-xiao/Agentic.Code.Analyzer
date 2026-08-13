## File: apps/meteor/client/views/omnichannel/directory/chats/ChatInfo/ChatsContextualBar.tsx

```typescript
import {
	ContextualbarHeader,
	ContextualbarIcon,
	ContextualbarTitle,
	ContextualbarClose,
	ContextualbarDialog,
} from '@rocket.chat/ui-client';
import { useRoute, useRouteParameter, useRoomToolbox } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import ChatInfo from './ChatInfo';
import RoomEdit from './RoomEdit';
import { useRoom } from '../../../../room/contexts/RoomContext';

const PATH = 'live';

const HEADER_DATA = {
	info: { icon: 'info-circled', title: 'Room_Info' },
	edit: { icon: 'pencil', title: 'edit-room' },
} as const;

const ChatsContextualBar = () => {
    /* Implementation Hidden */
};

export default ChatsContextualBar;

```