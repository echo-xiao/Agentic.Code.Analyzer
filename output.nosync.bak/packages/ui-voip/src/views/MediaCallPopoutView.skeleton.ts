## File: packages/ui-voip/src/views/MediaCallPopoutView.tsx

```typescript
import { Box, ButtonGroup } from '@rocket.chat/fuselage';
import { useResizeObserver } from '@rocket.chat/fuselage-hooks';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ToggleButton, Timer, DevicePicker, ActionButton, useShouldWrapCards, ActionStrip } from '../components';
import MediaCallCardList from './MediaCallCardList';
import { useMediaCallView } from '../context/MediaCallViewContext';

type MediaCallPopoutViewProps = {
	user: {
		displayName: string;
		avatarUrl: string;
	};
	onClickClosePopout: () => void;
	onClickFullscreen: () => void;
	fullscreen: boolean;
};

const MediaCallPopoutView = ({ user, onClickClosePopout, onClickFullscreen, fullscreen }: MediaCallPopoutViewProps) => {
    /* Implementation Hidden */
};

export default memo(MediaCallPopoutView);

```