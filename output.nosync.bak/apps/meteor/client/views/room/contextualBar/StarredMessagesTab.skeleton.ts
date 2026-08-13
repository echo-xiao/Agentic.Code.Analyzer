## File: apps/meteor/client/views/room/contextualBar/StarredMessagesTab.tsx

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import MessageListTab from './MessageListTab';
import { onClientMessageReceived } from '../../../lib/onClientMessageReceived';
import { roomsQueryKeys } from '../../../lib/queryKeys';
import { mapMessageFromApi } from '../../../lib/utils/mapMessageFromApi';
import { useRoom } from '../contexts/RoomContext';

const StarredMessagesTab = () => {
    /* Implementation Hidden */
};

export default StarredMessagesTab;

```