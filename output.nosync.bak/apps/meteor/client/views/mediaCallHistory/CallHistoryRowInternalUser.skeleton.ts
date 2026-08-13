## File: apps/meteor/client/views/mediaCallHistory/CallHistoryRowInternalUser.tsx

```typescript
import type { Keys as IconName } from '@rocket.chat/icons';
import { GenericMenu } from '@rocket.chat/ui-client';
import { CallHistoryTableRow, usePeekMediaSessionState } from '@rocket.chat/ui-voip';
import type { CallHistoryTableRowProps, CallHistoryInternalContact, PeekMediaSessionStateReturn } from '@rocket.chat/ui-voip';
import type { TFunction } from 'i18next';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useMediaCallInternalHistoryActions } from './useMediaCallInternalHistoryActions';

export type CallHistoryRowInternalUserProps = Omit<CallHistoryTableRowProps<CallHistoryInternalContact>, 'onClick' | 'menu'> & {
	messageId?: string;
	rid: string;
	onClickUserInfo?: (userId: string, rid: string) => void;
	onClick: (historyId: string) => void;
};

type HistoryActions = 'voiceCall' | 'videoCall' | 'jumpToMessage' | 'directMessage' | 'userInfo';

type HistoryActionCallbacks = {
	[K in HistoryActions]?: () => void;
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

const CallHistoryRowInternalUser = ({
	_id,
	contact,
	type,
	status,
	duration,
	timestamp,
	messageId,
	rid,
	onClickUserInfo,
	onClick,
}: CallHistoryRowInternalUserProps) => {
    /* Implementation Hidden */
};

export default CallHistoryRowInternalUser;

```