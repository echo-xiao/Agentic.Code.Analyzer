## File: packages/media-signaling/src/definition/signals/server/remote-sdp.ts

```typescript
import type { MediaStreamIdentification } from '../../media/MediaStreamIdentification';

/** Server is sending the other actor's sdp */
export type ServerMediaSignalRemoteSDP = {
	callId: string;
	toContractId: string;
	type: 'remote-sdp';

	sdp: RTCSessionDescriptionInit;
	negotiationId: string;
	streams?: MediaStreamIdentification[];
};

```