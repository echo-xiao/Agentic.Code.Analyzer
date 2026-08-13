## File: apps/meteor/client/views/room/Header/RoomTitle.tsx

```typescript
import { isTeamRoom, type IRoom } from '@rocket.chat/core-typings';
import { useButtonPattern, useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useDocumentTitle, HeaderTitle, HeaderTitleButton } from '@rocket.chat/ui-client';
import { useRoomToolbox } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import HeaderIconWithRoom from './HeaderIconWithRoom';

export type RoomTitleProps = { room: IRoom };

const RoomTitle = ({ room }: RoomTitleProps) => {
    /* Implementation Hidden */
};

export default RoomTitle;

```