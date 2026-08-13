## File: ee/packages/media-calls/src/server/stripSensitiveData.ts

```typescript
import type { ClientMediaSignal, ServerMediaSignal } from '@rocket.chat/media-signaling';

export function stripSensitiveDataFromSdp<T extends RTCSessionDescriptionInit | null>(sdp: T): T {
    /* Implementation Hidden */
}

export function stripSensitiveDataFromSignal<T extends ClientMediaSignal | ServerMediaSignal>(signal: T): Partial<T> {
    /* Implementation Hidden */
}

```