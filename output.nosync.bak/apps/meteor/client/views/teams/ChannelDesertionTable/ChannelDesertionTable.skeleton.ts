## File: apps/meteor/client/views/teams/ChannelDesertionTable/ChannelDesertionTable.tsx

```typescript
import type { IRoom, Serialized } from '@rocket.chat/core-typings';
import { Box, CheckBox } from '@rocket.chat/fuselage';
import { GenericTable, GenericTableHeaderCell, GenericTableHeader, GenericTableBody, useSort } from '@rocket.chat/ui-client';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import ChannelDesertionTableRow from './ChannelDesertionTableRow';

type ChannelDesertionTableProps = {
	lastOwnerWarning?: string;
	rooms?: (Serialized<IRoom> & { isLastOwner?: boolean })[];
	eligibleRoomsLength: number | undefined;
	onChangeRoomSelection: (room: Serialized<IRoom>) => void;
	selectedRooms: { [key: string]: Serialized<IRoom> };
	onToggleAllRooms: () => void;
};

const ChannelDesertionTable = ({
	rooms,
	eligibleRoomsLength,
	onChangeRoomSelection,
	selectedRooms,
	onToggleAllRooms,
	lastOwnerWarning,
}: ChannelDesertionTableProps) => {
    /* Implementation Hidden */
};

export default ChannelDesertionTable;

```