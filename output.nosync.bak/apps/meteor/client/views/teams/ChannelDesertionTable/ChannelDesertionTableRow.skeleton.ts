## File: apps/meteor/client/views/teams/ChannelDesertionTable/ChannelDesertionTableRow.tsx

```typescript
import type { IRoom, Serialized } from '@rocket.chat/core-typings';
import { Box, CheckBox, Icon, Margins } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { GenericTableRow, GenericTableCell } from '@rocket.chat/ui-client';
import { useId } from 'react';

import { useFormatDateAndTime } from '../../../hooks/useFormatDateAndTime';

type ChannelDesertionTableRowProps = {
	onChange: (room: Serialized<IRoom> & { isLastOwner?: boolean }) => void;
	selected: boolean;
	room: Serialized<IRoom> & { isLastOwner?: boolean };
	lastOwnerWarning?: string;
};

const ChannelDesertionTableRow = ({ room, onChange, selected, lastOwnerWarning }: ChannelDesertionTableRowProps) => {
    /* Implementation Hidden */
};

export default ChannelDesertionTableRow;

```