## File: apps/meteor/client/views/room/contextualBar/VideoConference/VideoConfPopups/VideoConfPopup/IncomingPopup.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { Skeleton } from '@rocket.chat/fuselage';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import {
	useVideoConfSetPreferences,
	VideoConfPopup,
	VideoConfPopupContent,
	VideoConfPopupControllers,
	VideoConfController,
	useVideoConfControllers,
	VideoConfButton,
	VideoConfPopupFooter,
	VideoConfPopupFooterButtons,
	VideoConfPopupTitle,
	VideoConfPopupHeader,
} from '@rocket.chat/ui-video-conf';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import VideoConfPopupRoomInfo from './VideoConfPopupRoomInfo';
import { useVideoConfRoomName } from '../../hooks/useVideoConfRoomName';

export type IncomingPopupProps = {
	id: string;
	room: IRoom;
	position: number;
	onClose: (id: string) => void;
	onMute: (id: string) => void;
	onConfirm: () => void;
};

const IncomingPopup = ({ id, room, position, onClose, onMute, onConfirm }: IncomingPopupProps) => {
    /* Implementation Hidden */
};

export default IncomingPopup;

```