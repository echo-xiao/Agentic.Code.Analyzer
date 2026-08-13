## File: apps/meteor/ee/app/livechat-enterprise/server/lib/requestPdfTranscript.ts

```typescript
import { OmnichannelTranscript, QueueWorker } from '@rocket.chat/core-services';
import type { AtLeast, IOmnichannelRoom } from '@rocket.chat/core-typings';
import ExpiryMap from 'expiry-map';

import { logger } from './logger';

// Allow to request a transcript again after 15 seconds, assuming the first one didn't complete
// This won't prevent multiple transcript generated for the same room in a multi-instance deployment since state is not shared, but we're ok with the drawbacks
const LockMap = new ExpiryMap<string, boolean>(15000);

const serviceName = 'omnichannel-transcript' as const;
export const requestPdfTranscript = async (
	room: AtLeast<IOmnichannelRoom, '_id' | 'open' | 'v' | 'pdfTranscriptFileId'>,
	requestedBy: string,
): Promise<void> => {
    /* Implementation Hidden */
};

```