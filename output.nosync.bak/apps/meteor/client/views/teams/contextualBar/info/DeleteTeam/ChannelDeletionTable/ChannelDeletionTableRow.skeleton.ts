## File: apps/meteor/client/views/teams/contextualBar/info/DeleteTeam/ChannelDeletionTable/ChannelDeletionTableRow.tsx

```typescript
import type { IRoom, Serialized } from '@rocket.chat/core-typings';
import { CheckBox, Margins } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { GenericTableRow, GenericTableCell } from '@rocket.chat/ui-client';

import { RoomIcon } from '../../../../../../components/RoomIcon';

type ChannelDeletionTableRowProps = {
	room: Serialized<IRoom>;
	onChange: (room: Serialized<IRoom>) => void;
	selected: boolean;
};

const ChannelDeletionTableRow = ({ room, onChange, selected }: ChannelDeletionTableRowProps) => {
    /* Implementation Hidden */
};

export default ChannelDeletionTableRow;

```