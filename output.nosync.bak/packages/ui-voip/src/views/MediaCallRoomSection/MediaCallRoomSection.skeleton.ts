## File: packages/ui-voip/src/views/MediaCallRoomSection/MediaCallRoomSection.tsx

```typescript
import { Box, ButtonGroup } from '@rocket.chat/fuselage';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import {
	ToggleButton,
	Timer,
	DevicePicker,
	ActionButton,
	useShouldWrapCards,
	CARD_LIST_SECTION_MAX_HEIGHT,
	ActionStrip,
	ActionToggleChat,
} from '../../components';
import { useMediaCallInstance } from '../../context/MediaCallInstanceContext';
import { useMediaCallView } from '../../context/MediaCallViewContext';
import useRegisterView from '../../context/useRegisterView';
import MediaCallCardList from '../MediaCallCardList';
import PopoutDockPrompt from '../PopoutDockPrompt';

type MediaCallRoomSectionProps = {
	showChat: boolean;
	onToggleChat: () => void;
	user: {
		displayName: string;
		avatarUrl: string;
	};
	containerHeight: number;
};

const getSplitStyles = (showChat?: boolean) => {
    /* Implementation Hidden */
};

const MediaCallRoomSection = ({ showChat, onToggleChat, user, containerHeight }: MediaCallRoomSectionProps) => {
    /* Implementation Hidden */
};

export default memo(MediaCallRoomSection);

```