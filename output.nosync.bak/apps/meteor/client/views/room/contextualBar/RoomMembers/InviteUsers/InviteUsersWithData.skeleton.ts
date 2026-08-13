## File: apps/meteor/client/views/room/contextualBar/RoomMembers/InviteUsers/InviteUsersWithData.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useEndpoint, useTranslation, useToastMessageDispatch, useRoomToolbox } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

import InviteUsers from './InviteUsers';
import InviteUsersEdit from './InviteUsersEdit';
import InviteUsersError from './InviteUsersError';
import InviteUsersLoading from './InviteUsersLoading';
import { useFormatDateAndTime } from '../../../../../hooks/useFormatDateAndTime';

type InviteUsersWithDataProps = {
	rid: IRoom['_id'];
	onClickBack: () => void;
};

const InviteUsersWithData = ({ rid, onClickBack }: InviteUsersWithDataProps) => {
    /* Implementation Hidden */
};

export default InviteUsersWithData;

```