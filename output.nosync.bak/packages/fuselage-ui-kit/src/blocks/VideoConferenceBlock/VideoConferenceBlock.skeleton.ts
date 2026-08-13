## File: packages/fuselage-ui-kit/src/blocks/VideoConferenceBlock/VideoConferenceBlock.tsx

```typescript
import { getUserDisplayName, VideoConferenceStatus } from '@rocket.chat/core-typings';
import { useGoToRoom, useSetting, useTranslation, useUserId, useUserPreference } from '@rocket.chat/ui-contexts';
import type * as UiKit from '@rocket.chat/ui-kit';
import {
	VideoConfMessageSkeleton,
	VideoConfMessage,
	VideoConfMessageRow,
	VideoConfMessageIcon,
	VideoConfMessageText,
	VideoConfMessageFooter,
	VideoConfMessageUserStack,
	VideoConfMessageFooterText,
	VideoConfMessageButton,
	VideoConfMessageContent,
	VideoConfMessageActions,
	VideoConfMessageAction,
} from '@rocket.chat/ui-video-conf';
import type { MouseEventHandler } from 'react';
import { useContext, memo, useMemo } from 'react';

import { UiKitContext } from '../..';
import { useVideoConfDataStream } from './hooks/useVideoConfDataStream';
import { useSurfaceType } from '../../hooks/useSurfaceType';
import type { BlockProps } from '../../utils/BlockProps';

export type VideoConferenceBlockProps = BlockProps<UiKit.VideoConferenceBlock>;

const MAX_USERS = 3;

const VideoConferenceBlock = ({ block }: VideoConferenceBlockProps) => {
    /* Implementation Hidden */
};

export default memo(VideoConferenceBlock);

```