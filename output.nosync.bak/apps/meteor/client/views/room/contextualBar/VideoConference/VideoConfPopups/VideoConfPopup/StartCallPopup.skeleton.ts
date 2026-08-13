## File: apps/meteor/client/views/room/contextualBar/VideoConference/VideoConfPopups/VideoConfPopup/StartCallPopup.tsx

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { useOutsideClick, useStableCallback } from '@rocket.chat/fuselage-hooks';
import {
	VideoConfPopup,
	VideoConfPopupHeader,
	VideoConfPopupContent,
	VideoConfPopupControllers,
	VideoConfController,
	useVideoConfControllers,
	VideoConfButton,
	VideoConfPopupFooter,
	VideoConfPopupTitle,
	VideoConfPopupFooterButtons,
	useVideoConfSetPreferences,
	useVideoConfCapabilities,
	useVideoConfPreferences,
} from '@rocket.chat/ui-video-conf';
import { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import VideoConfPopupRoomInfo from './VideoConfPopupRoomInfo';
import { useVideoConfRoomName } from '../../hooks/useVideoConfRoomName';

export type StartCallPopupProps = {
	id: string;
	loading: boolean;
	room: IRoom;
	onClose: () => void;
	onConfirm: () => void;
};

const StartCallPopup = ({ id, loading, room, onClose, onConfirm }: StartCallPopupProps) => {
    /* Implementation Hidden */
};

export default StartCallPopup;

```