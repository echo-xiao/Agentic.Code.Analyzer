## File: apps/meteor/client/views/teams/contextualBar/channels/TeamsChannelsWithData.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { useLocalStorage, useDebouncedValue, useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useSetModal, usePermission, useAtLeastOnePermission, useRoomToolbox } from '@rocket.chat/ui-contexts';
import type { ChangeEvent } from 'react';
import { useCallback, useState } from 'react';

import AddExistingModal from './AddExistingModal';
import TeamsChannels from './TeamsChannels';
import { useTeamsChannelList } from './hooks/useTeamsChannelList';
import { roomCoordinator } from '../../../../lib/rooms/roomCoordinator';
import CreateChannelModal from '../../../../navbar/NavBarPagesGroup/actions/CreateChannelModal';
import { useRoom } from '../../../room/contexts/RoomContext';

const TeamsChannelsWithData = () => {
    /* Implementation Hidden */
};

export default TeamsChannelsWithData;

```