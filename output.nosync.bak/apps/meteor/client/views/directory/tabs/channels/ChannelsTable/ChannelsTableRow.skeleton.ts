## File: apps/meteor/client/views/directory/tabs/channels/ChannelsTable/ChannelsTableRow.tsx

```typescript
import type { IRoom, Serialized } from '@rocket.chat/core-typings';
import { Box, Avatar } from '@rocket.chat/fuselage';
import { GenericTableRow, GenericTableCell } from '@rocket.chat/ui-client';
import type { KeyboardEvent, MouseEvent } from 'react';

import MarkdownText from '../../../../../components/MarkdownText';
import { RoomIcon } from '../../../../../components/RoomIcon';
import { useFormatDate } from '../../../../../hooks/useFormatDate';
import { roomCoordinator } from '../../../../../lib/rooms/roomCoordinator';
import RoomTags from '../../../RoomTags';

export type ChannelsTableRowProps = {
	onClick: (name: IRoom['name'], type: IRoom['t']) => (e: KeyboardEvent | MouseEvent) => void;
	room: Serialized<IRoom & { belongsTo?: string }>;
	mediaQuery: boolean;
};

const ChannelsTableRow = ({ onClick, room, mediaQuery }: ChannelsTableRowProps) => {
    /* Implementation Hidden */
};

export default ChannelsTableRow;

```