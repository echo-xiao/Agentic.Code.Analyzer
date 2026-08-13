## File: apps/meteor/client/views/teams/contextualBar/info/DeleteTeam/ChannelDeletionTable/ChannelDeletionTable.tsx

```typescript
import type { IRoom, Serialized } from '@rocket.chat/core-typings';
import { Box, CheckBox } from '@rocket.chat/fuselage';
import { GenericTable, GenericTableHeaderCell, GenericTableBody, GenericTableHeader, useSort } from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

import ChannelDeletionTableRow from './ChannelDeletionTableRow';

type ChannelDeletionTableProps = {
	rooms: Serialized<IRoom>[];
	onToggleAllRooms: () => void;
	onChangeRoomSelection: (room: Serialized<IRoom>) => void;
	selectedRooms: { [key: string]: Serialized<IRoom> };
};

const ChannelDeletionTable = ({ rooms, onChangeRoomSelection, selectedRooms, onToggleAllRooms }: ChannelDeletionTableProps) => {
    /* Implementation Hidden */
};

export default ChannelDeletionTable;

```