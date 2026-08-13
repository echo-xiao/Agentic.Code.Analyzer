## File: packages/ui-voip/src/views/MediaCallWidget/OngoingCallWithScreen.tsx

```typescript
import { Box, Button, ButtonGroup } from '@rocket.chat/fuselage';
import { useTranslation } from 'react-i18next';

import {
	ToggleButton,
	PeerInfo,
	Widget,
	WidgetFooter,
	WidgetHandle,
	WidgetHeader,
	WidgetContent,
	WidgetInfo,
	Timer,
	DevicePicker,
	ActionButton,
	useInfoSlots,
	CardWidgetContainer,
	StreamCard,
} from '../../components';
import { useMediaCallInstance } from '../../context';
import { useMediaCallView } from '../../context/MediaCallViewContext';
import { usePlayMediaStream } from '../../providers/usePlayMediaStream';

const OngoingCall = () => {
    /* Implementation Hidden */
};

export default OngoingCall;

```