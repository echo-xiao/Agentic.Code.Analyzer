## File: packages/media-signaling/src/definition/signals/server/rejected-call-request.ts

```typescript
import type { CallRejectedReason } from '../../call';

export type ServerMediaSignalRejectedCallRequest = {
	callId: string;
	type: 'rejected-call-request';
	toContractId: string;
	reason: CallRejectedReason;
};

```