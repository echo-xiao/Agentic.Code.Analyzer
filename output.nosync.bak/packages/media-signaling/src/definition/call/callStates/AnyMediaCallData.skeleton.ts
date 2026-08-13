## File: packages/media-signaling/src/definition/call/callStates/AnyMediaCallData.ts

```typescript
import type { IDirectMediaCallData } from './IDirectMediaCallData';
import type { ITempMediaCallData } from './ITempMediaCallData';

export type AnyMediaCallData = ITempMediaCallData | IDirectMediaCallData;

```