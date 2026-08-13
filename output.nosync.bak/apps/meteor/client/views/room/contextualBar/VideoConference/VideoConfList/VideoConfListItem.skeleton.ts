## File: apps/meteor/client/views/room/contextualBar/VideoConference/VideoConfList/VideoConfListItem.tsx

```typescript
import type { VideoConference } from '@rocket.chat/core-typings';
import { css } from '@rocket.chat/css-in-js';
import {
	Button,
	Message,
	MessageLeftContainer,
	MessageContainer,
	MessageHeader,
	MessageName,
	MessageTimestamp,
	MessageBody,
	MessageBlock,
	Box,
	Palette,
	IconButton,
	ButtonGroup,
	AvatarStack,
} from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import { useUserDisplayName } from '@rocket.chat/ui-client';
import { useTranslation } from '@rocket.chat/ui-contexts';
import { useVideoConfJoinCall } from '@rocket.chat/ui-video-conf';

import { useTimeAgo } from '../../../../../hooks/useTimeAgo';
import { VIDEOCONF_STACK_MAX_USERS } from '../../../../../lib/constants';
import { useGoToRoom } from '../../../hooks/useGoToRoom';

const VideoConfListItem = ({
	videoConfData,
	className = [],
	reload,
	...props
}: {
	videoConfData: VideoConference;
	className?: string[];
	reload: () => void;
}) => {
    /* Implementation Hidden */
};

export default VideoConfListItem;

```