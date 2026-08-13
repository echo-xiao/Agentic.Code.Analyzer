## File: apps/meteor/client/sidebar/header/MatrixFederationSearch/FederatedRoomList.tsx

```typescript
import { Throbber, Box } from '@rocket.chat/fuselage';
import type { IFederationPublicRooms } from '@rocket.chat/rest-typings';
import { VirtualizedScrollbars } from '@rocket.chat/ui-client';
import { useSetModal, useEndpoint, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Virtuoso } from 'react-virtuoso';

import FederatedRoomListEmptyPlaceholder from './FederatedRoomListEmptyPlaceholder';
import FederatedRoomListItem from './FederatedRoomListItem';
import { useInfiniteFederationSearchPublicRooms } from './useInfiniteFederationSearchPublicRooms';
import { roomCoordinator } from '../../../lib/rooms/roomCoordinator';

export type FederatedRoomListProps = {
	serverName: string;
	roomName?: string;
	pageToken?: string;
	count?: number;
};

const FederatedRoomList = ({ serverName, roomName, count }: FederatedRoomListProps) => {
    /* Implementation Hidden */
};

export default FederatedRoomList;

```