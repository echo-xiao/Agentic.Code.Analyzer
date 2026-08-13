## File: apps/meteor/app/integrations/server/lib/updateHistory.ts

```typescript
import type { IIntegrationHistory, OutgoingIntegrationEvent, IIntegration, IMessage, AtLeast } from '@rocket.chat/core-typings';
import { IntegrationHistory } from '@rocket.chat/models';

import { omit } from '../../../../lib/utils/omit';
import { notifyOnIntegrationHistoryChangedById, notifyOnIntegrationHistoryChanged } from '../../../lib/server/lib/notifyListener';

export const updateHistory = async ({
	historyId,
	step,
	integration,
	event,
	data,
	triggerWord,
	ranPrepareScript,
	prepareSentMessage,
	processSentMessage,
	resultMessage,
	finished,
	url,
	httpCallData,
	httpError,
	httpResult,
	error,
	errorStack,
}: {
	historyId: IIntegrationHistory['_id'];
	step: IIntegrationHistory['step'];
	integration?: IIntegration;
	event?: OutgoingIntegrationEvent;
	triggerWord?: string;
	ranPrepareScript?: boolean;
	prepareSentMessage?: { channel: string; message: Partial<IMessage> }[];
	processSentMessage?: { channel: string; message: Partial<IMessage> }[];
	resultMessage?: { channel: string; message: Partial<IMessage> }[];
	finished?: boolean;
	url?: string;
	httpCallData?: Record<string, any>; // ProcessedOutgoingRequest.data
	httpError?: any; // null or whatever error type `fetch` may throw
	httpResult?: string | null;

	error?: boolean;
	errorStack?: any; // Error | Error['stack']

	data?: Record<string, any>;
}) => {
    /* Implementation Hidden */
};

```