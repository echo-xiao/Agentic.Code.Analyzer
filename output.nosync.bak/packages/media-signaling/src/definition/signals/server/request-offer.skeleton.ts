## File: packages/media-signaling/src/definition/signals/server/request-offer.ts

```typescript
/** Server is requesting a webrtc offer */
export type ServerMediaSignalRequestOffer = {
	callId: string;
	toContractId: string;
	type: 'request-offer';

	negotiationId: string;
};

```