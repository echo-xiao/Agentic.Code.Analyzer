## File: packages/ui-voip/src/views/CallHistoryContextualbar/CallHistoryContextualbar.tsx

```typescript
import { Box, Button, ButtonGroup, Icon, MessageBlock } from '@rocket.chat/fuselage';
import { UiKitComponent, UiKitMessage as UiKitMessageSurfaceRender, UiKitContext } from '@rocket.chat/fuselage-ui-kit';
import {
	ContextualbarDialog,
	ContextualbarHeader,
	ContextualbarTitle,
	ContextualbarFooter,
	ContextualbarIcon,
	ContextualbarScrollableContent,
	InfoPanel,
	InfoPanelSection,
	InfoPanelLabel,
	InfoPanelText,
} from '@rocket.chat/ui-client';
import { useTranslation } from 'react-i18next';

import type { HistoryActionCallbacks } from './CallHistoryActions';
import CallHistoryActions from './CallHistoryActions';
import { useFullStartDate } from './useFullStartDate';
import CallHistoryUser from '../../components/CallHistoryUser';
import { usePeekMediaSessionState } from '../../context/usePeekMediaSessionState';
import { isCallHistoryInternalContact, type CallHistoryContact } from '../../definitions';
import { getHistoryMessagePayload } from '../../ui-kit/getHistoryMessagePayload';

export type CallHistoryData = {
	callId: string;
	direction: 'inbound' | 'outbound';
	duration: number;
	startedAt: Date;
	state: 'ended' | 'not-answered' | 'failed' | 'error' | 'transferred';
	messageId?: string;
};

type CallHistoryContextualBarProps = {
	onClose: () => void;
	actions: HistoryActionCallbacks;
	contact: CallHistoryContact;
	data: CallHistoryData;
};

const contextValue = {
	action: () => undefined,
	rid: '',
	values: {},
};

const CallHistoryContextualBar = ({ onClose, actions, contact, data }: CallHistoryContextualBarProps) => {
    /* Implementation Hidden */
};

export default CallHistoryContextualBar;

```