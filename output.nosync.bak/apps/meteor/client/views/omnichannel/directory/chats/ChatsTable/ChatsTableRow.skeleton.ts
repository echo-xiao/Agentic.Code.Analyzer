## File: apps/meteor/client/views/omnichannel/directory/chats/ChatsTable/ChatsTableRow.tsx

```typescript
import type { IOmnichannelRoomWithDepartment } from '@rocket.chat/core-typings';
import { Tag, Box } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { GenericTableCell, GenericTableRow } from '@rocket.chat/ui-client';
import { usePermission } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import RemoveChatButton from './RemoveChatButton';
import { OmnichannelRoomIcon } from '../../../../../components/RoomIcon/OmnichannelRoomIcon';
import { useFormatDate } from '../../../../../hooks/useFormatDate';
import { useTimeFromNow } from '../../../../../hooks/useTimeFromNow';
import OmnichannelVerificationTag from '../../../components/OmnichannelVerificationTag';
import RoomActivityIcon from '../../../components/RoomActivityIcon';
import { useOmnichannelPriorities } from '../../../hooks/useOmnichannelPriorities';
import { useOmnichannelSource } from '../../../hooks/useOmnichannelSource';
import { PriorityIcon } from '../../../priorities/PriorityIcon';
import { useOmnichannelDirectoryRouter } from '../../hooks/useOmnichannelDirectoryRouter';

const ChatsTableRow = (room: IOmnichannelRoomWithDepartment) => {
    /* Implementation Hidden */
};

export default ChatsTableRow;

```