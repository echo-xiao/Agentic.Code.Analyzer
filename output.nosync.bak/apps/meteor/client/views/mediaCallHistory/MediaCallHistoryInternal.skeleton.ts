## File: apps/meteor/client/views/mediaCallHistory/MediaCallHistoryInternal.tsx

```typescript
import type { CallHistoryItem, IInternalMediaCallHistoryItem, IMediaCall, Serialized } from '@rocket.chat/core-typings';
import { CallHistoryContextualBar, type CallHistoryInternalContact } from '@rocket.chat/ui-voip';
import { useMemo } from 'react';

import { useMediaCallInternalHistoryActions } from './useMediaCallInternalHistoryActions';

type InternalCallEndpointData = Serialized<{
	item: IInternalMediaCallHistoryItem;
	call: IMediaCall;
}>;

export type MediaCallHistoryInternalProps = {
	data: InternalCallEndpointData;
	onClose: () => void;
	openUserInfo?: (userId: string, rid: string) => void;
	openRoomId?: string;
	messageRoomId?: string;
};

export const isInternalCallHistoryItem = (data: { item: Serialized<CallHistoryItem> }): data is InternalCallEndpointData => {
    /* Implementation Hidden */
};

const getContact = (item: InternalCallEndpointData['item'], call: InternalCallEndpointData['call']): CallHistoryInternalContact => {
    /* Implementation Hidden */
};

const MediaCallHistoryInternal = ({ data, onClose, openUserInfo, openRoomId, messageRoomId }: MediaCallHistoryInternalProps) => {
    /* Implementation Hidden */
};

export default MediaCallHistoryInternal;

```