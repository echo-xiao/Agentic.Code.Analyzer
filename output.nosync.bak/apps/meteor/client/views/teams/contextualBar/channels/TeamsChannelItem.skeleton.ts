## File: apps/meteor/client/views/teams/contextualBar/channels/TeamsChannelItem.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import {
	Box,
	Icon,
	IconButton,
	Option,
	OptionAvatar,
	OptionColumn,
	OptionContent,
	OptionMenu,
	OptionSkeleton,
	Tag,
} from '@rocket.chat/fuselage';
import { usePrefersReducedMotion } from '@rocket.chat/fuselage-hooks';
import { RoomAvatar } from '@rocket.chat/ui-avatar';
import { usePermission } from '@rocket.chat/ui-contexts';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import TeamsChannelItemMenu from './TeamsChannelItemMenu';
import { usePreventPropagation } from '../../../../hooks/usePreventPropagation';
import { roomCoordinator } from '../../../../lib/rooms/roomCoordinator';

type TeamsChannelItemProps = {
	room: IRoom;
	mainRoom: IRoom;
	onClickView: (room: IRoom) => void;
	reload: () => void;
};

const TeamsChannelItem = ({ room, mainRoom, onClickView, reload }: TeamsChannelItemProps) => {
    /* Implementation Hidden */
};

export default TeamsChannelItem;

```