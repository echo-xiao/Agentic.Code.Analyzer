## File: apps/meteor/client/views/mediaCallHistory/MediaCallHistoryContextualbar.tsx

```typescript
import {
	ContextualbarHeader,
	ContextualbarIcon,
	ContextualbarTitle,
	ContextualbarClose,
	ContextualbarEmptyContent,
	ContextualbarDialog,
	ContextualbarSkeleton,
} from '@rocket.chat/ui-client';
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import MediaCallHistoryExternal, { isExternalCallHistoryItem } from './MediaCallHistoryExternal';
import MediaCallHistoryInternal, { isInternalCallHistoryItem } from './MediaCallHistoryInternal';
import { callHistoryQueryKeys } from '../../lib/queryKeys';

export type MediaCallHistoryContextualbarProps = {
	openRoomId?: string;
	messageRoomId?: string;
	openUserInfo?: (userId: string, rid: string) => void;
	onClose: () => void;
	callId?: string;
	historyId?: string;
};

const MediaCallHistoryContextualbar = ({
	openRoomId,
	messageRoomId,
	openUserInfo,
	callId,
	historyId,
	onClose,
}: MediaCallHistoryContextualbarProps) => {
    /* Implementation Hidden */
};

export default MediaCallHistoryContextualbar;

```