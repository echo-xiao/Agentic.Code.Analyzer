## File: apps/meteor/client/views/teams/contextualBar/channels/TeamsChannelItemMenu.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { CheckBox } from '@rocket.chat/fuselage';
import { GenericMenu } from '@rocket.chat/ui-client';
import type { GenericMenuItemProps } from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

import { useRemoveRoomFromTeam } from './hooks/useRemoveRoomFromTeam';
import { useToggleAutoJoin } from './hooks/useToggleAutoJoin';
import { useDeleteRoom } from '../../../hooks/roomActions/useDeleteRoom';

const TeamsChannelItemMenu = ({ room, mainRoom, reload }: { room: IRoom; mainRoom: IRoom; reload?: () => void }) => {
    /* Implementation Hidden */
};

export default TeamsChannelItemMenu;

```