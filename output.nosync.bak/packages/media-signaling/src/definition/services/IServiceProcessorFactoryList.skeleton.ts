## File: packages/media-signaling/src/definition/services/IServiceProcessorFactoryList.ts

```typescript
import type { WebRTCProcessorFactory } from './webrtc/IWebRTCProcessor';

export interface IServiceProcessorFactoryList {
	webrtc?: WebRTCProcessorFactory;
}

```