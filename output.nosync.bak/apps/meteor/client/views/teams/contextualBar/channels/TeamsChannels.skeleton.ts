## File: apps/meteor/client/views/teams/contextualBar/channels/TeamsChannels.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import type { SelectOption } from '@rocket.chat/fuselage';
import { Box, Icon, TextInput, Select, Throbber, ButtonGroup, Button } from '@rocket.chat/fuselage';
import { useStableCallback, useAutoFocus, useDebouncedCallback } from '@rocket.chat/fuselage-hooks';
import {
	VirtualizedScrollbars,
	ContextualbarHeader,
	ContextualbarIcon,
	ContextualbarTitle,
	ContextualbarClose,
	ContextualbarContent,
	ContextualbarFooter,
	ContextualbarEmptyContent,
	ContextualbarSection,
	ContextualbarDialog,
} from '@rocket.chat/ui-client';
import type { ChangeEvent, Dispatch, SetStateAction, SyntheticEvent } from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Virtuoso } from 'react-virtuoso';

import TeamsChannelItem from './TeamsChannelItem';
import InfiniteListAnchor from '../../../../components/InfiniteListAnchor';

type TeamsChannelsProps = {
	loading: boolean;
	channels: IRoom[];
	mainRoom: IRoom;
	text: string;
	type: 'all' | 'autoJoin';
	setText: (e: ChangeEvent<HTMLInputElement>) => void;
	setType: Dispatch<SetStateAction<'all' | 'autoJoin'>>;
	onClickClose: () => void;
	onClickAddExisting: false | ((e: SyntheticEvent) => void);
	onClickCreateNew: false | ((e: SyntheticEvent) => void);
	total: number;
	loadMoreItems: () => void;
	onClickView: (room: IRoom) => void;
	reload: () => void;
};

const TeamsChannels = ({
	loading,
	channels = [],
	mainRoom,
	text,
	type,
	setText,
	setType,
	onClickClose,
	onClickAddExisting,
	onClickCreateNew,
	total,
	loadMoreItems,
	onClickView,
	reload,
}: TeamsChannelsProps) => {
    /* Implementation Hidden */
};

export default TeamsChannels;

```