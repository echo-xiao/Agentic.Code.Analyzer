## File: packages/ui-voip/src/views/CallHistoryContextualbar/CallHistoryActions.tsx

```typescript
import type { Keys as IconName } from '@rocket.chat/icons';
import { ContextualbarActions, ContextualbarClose, GenericMenu } from '@rocket.chat/ui-client';
import type { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

import type { PeekMediaSessionStateReturn } from '../../context/usePeekMediaSessionState';
import { usePeekMediaSessionState } from '../../context/usePeekMediaSessionState';

type HistoryActions = 'voiceCall' | 'videoCall' | 'jumpToMessage' | 'directMessage' | 'userInfo';

export type HistoryActionCallbacks = {
	[K in HistoryActions]?: () => void;
};

type CallHistoryActionsProps = {
	onClose: () => void;
	actions: HistoryActionCallbacks;
};

const iconDictionary: Record<HistoryActions, IconName> = {
	voiceCall: 'phone',
	videoCall: 'video',
	jumpToMessage: 'jump',
	directMessage: 'balloon',
	userInfo: 'user',
} as const;

const i18nDictionary: Record<HistoryActions, string> = {
	voiceCall: 'Voice_call',
	videoCall: 'Video_call',
	jumpToMessage: 'Jump_to_message',
	directMessage: 'Direct_Message',
	userInfo: 'User_info',
} as const;

const getItems = (actions: HistoryActionCallbacks, t: TFunction, state: PeekMediaSessionStateReturn) => {
    /* Implementation Hidden */
};

const CallHistoryActions = ({ onClose, actions }: CallHistoryActionsProps) => {
    /* Implementation Hidden */
};

export default CallHistoryActions;

```