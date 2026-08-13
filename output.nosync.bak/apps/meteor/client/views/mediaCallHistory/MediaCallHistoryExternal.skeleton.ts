## File: apps/meteor/client/views/mediaCallHistory/MediaCallHistoryExternal.tsx

```typescript
import type { CallHistoryItem, IInternalMediaCallHistoryItem, IMediaCall, Serialized } from '@rocket.chat/core-typings';
import {
	CallHistoryContextualBar,
	useWidgetExternalControls,
	usePeekMediaSessionState,
	type CallHistoryExternalContact,
	type CallHistoryUnknownContact,
} from '@rocket.chat/ui-voip';
import { useMemo } from 'react';

type ExternalCallEndpointData = Serialized<{
	item: Exclude<CallHistoryItem, IInternalMediaCallHistoryItem>;
	call?: IMediaCall;
}>;

export type MediaCallHistoryExternalProps = {
	data: ExternalCallEndpointData;
	onClose: () => void;
};

export const getExternalContact = (item: ExternalCallEndpointData['item']): CallHistoryExternalContact | CallHistoryUnknownContact => {
    /* Implementation Hidden */
};

export const isExternalCallHistoryItem = (data: { item: Serialized<CallHistoryItem> }): data is ExternalCallEndpointData => {
    /* Implementation Hidden */
};

const MediaCallHistoryExternal = ({ data, onClose }: MediaCallHistoryExternalProps) => {
    /* Implementation Hidden */
};

export default MediaCallHistoryExternal;

```