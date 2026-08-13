## File: apps/meteor/client/views/composer/VideoMessageRecorder/VideoMessageRecorder.tsx

```typescript
import type { IMessage, IRoom } from '@rocket.chat/core-typings';
import { css } from '@rocket.chat/css-in-js';
import { Box, ButtonGroup, Button, Icon, PositionAnimated } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useTranslation, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import type { AllHTMLAttributes, RefObject } from 'react';
import { useRef, useEffect, useState } from 'react';

import { UserAction, USER_ACTIVITIES } from '../../../../app/ui/client/lib/UserAction';
import { VideoRecorder, useVideoRecorderCameraStarted } from '../../../../app/ui/client/lib/recorderjs/videoRecorder';
import { useChat } from '../../room/contexts/ChatContext';

export type VideoMessageRecorderProps = {
	rid: IRoom['_id'];
	tmid?: IMessage['_id'];
	reference: RefObject<HTMLElement | null>;
} & Omit<AllHTMLAttributes<HTMLDivElement>, 'is'>;

const videoContainerClass = css`
	transform: scaleX(-1);
	filter: FlipH;

	@media (max-width: 500px) {
		& > video {
			width: 100%;
			height: 100%;
		}
	}
`;

const getVideoRecordingExtension = () => {
    /* Implementation Hidden */
};

const VideoMessageRecorder = ({ rid, tmid, reference }: VideoMessageRecorderProps) => {
    /* Implementation Hidden */
};

export default VideoMessageRecorder;

```