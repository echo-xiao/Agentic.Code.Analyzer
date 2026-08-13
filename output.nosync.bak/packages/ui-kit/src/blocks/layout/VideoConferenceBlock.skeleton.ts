## File: packages/ui-kit/src/blocks/layout/VideoConferenceBlock.ts

```typescript
import type { LayoutBlockish } from '../LayoutBlockish';

export type VideoConferenceBlock = LayoutBlockish<{
	type: 'video_conf';
	callId: string;
}>;

```