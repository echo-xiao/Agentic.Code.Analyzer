## File: apps/meteor/client/views/room/contextualBar/VideoConference/VideoConfPopups/VideoConfPopup/OutgoingPopup.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import {
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
	useVideoConfCapabilities,
	useVideoConfPreferences,
} from '@rocket.chat/ui-video-conf';
import { useTranslation } from 'react-i18next';

import VideoConfPopupRoomInfo from './VideoConfPopupRoomInfo';
import { useVideoConfRoomName } from '../../hooks/useVideoConfRoomName';

export type OutgoingPopupProps = {
	id: string;
	room: IRoom;
	onClose: (id: string) => void;
};

const OutgoingPopup = ({ room, onClose, id }: OutgoingPopupProps) => {
    /* Implementation Hidden */
};

export default OutgoingPopup;

```