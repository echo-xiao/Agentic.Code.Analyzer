## File: apps/meteor/client/views/omnichannel/directory/chats/ChatInfo/RoomEdit/RoomEditWithData.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

import RoomEdit from './RoomEdit';
import { FormSkeleton } from '../../../components';
import { useOmnichannelRoomInfo } from '../../../hooks/useOmnichannelRoomInfo';
import { useVisitorInfo } from '../../../hooks/useVisitorInfo';

type RoomEditWithDataProps = {
	id: string;
	reload?: () => void;
	reloadInfo?: () => void;
	onClose: () => void;
};

function RoomEditWithData({ id: roomId, reload, reloadInfo, onClose }: RoomEditWithDataProps) {
    /* Implementation Hidden */
}

export default RoomEditWithData;

```