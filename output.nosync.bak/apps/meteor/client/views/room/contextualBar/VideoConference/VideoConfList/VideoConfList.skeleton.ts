## File: apps/meteor/client/views/room/contextualBar/VideoConference/VideoConfList/VideoConfList.tsx

```typescript
import type { VideoConference } from '@rocket.chat/core-typings';
import { Box, States, StatesIcon, StatesTitle, StatesSubtitle, Throbber } from '@rocket.chat/fuselage';
import { useResizeObserver } from '@rocket.chat/fuselage-hooks';
import {
	VirtualizedScrollbars,
	ContextualbarHeader,
	ContextualbarIcon,
	ContextualbarTitle,
	ContextualbarClose,
	ContextualbarContent,
	ContextualbarEmptyContent,
	ContextualbarDialog,
} from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';
import { Virtuoso } from 'react-virtuoso';

import VideoConfListItem from './VideoConfListItem';
import { getErrorMessage } from '../../../../../lib/errorHandling';

export type VideoConfListProps = {
	onClose: () => void;
	total: number;
	videoConfs: VideoConference[];
	loading: boolean;
	error?: Error;
	reload: () => void;
	loadMoreItems: () => void;
};

const VideoConfList = ({ onClose, total, videoConfs, loading, error, reload, loadMoreItems }: VideoConfListProps) => {
    /* Implementation Hidden */
};

export default VideoConfList;

```