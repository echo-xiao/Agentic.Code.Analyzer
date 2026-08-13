## File: apps/meteor/client/views/room/contextualBar/MentionsTab.tsx

```typescript
import type { IMessage } from '@rocket.chat/core-typings';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import MessageListTab from './MessageListTab';
import { mapMessageFromApi } from '../../../lib/utils/mapMessageFromApi';
import { useRoom } from '../contexts/RoomContext';

const MentionsTab = () => {
    /* Implementation Hidden */
};

export default MentionsTab;

```