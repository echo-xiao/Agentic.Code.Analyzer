## File: apps/meteor/client/views/directory/tabs/teams/TeamsTable/TeamsTableRow.tsx

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

export type TeamsTableRowProps = {
	onClick: (name: IRoom['name'], type: IRoom['t']) => (e: KeyboardEvent | MouseEvent) => void;
	team: Serialized<IRoom & { roomsCount: number }>;
	mediaQuery: boolean;
};

const TeamsTableRow = ({ onClick, team, mediaQuery }: TeamsTableRowProps) => {
    /* Implementation Hidden */
};

export default TeamsTableRow;

```