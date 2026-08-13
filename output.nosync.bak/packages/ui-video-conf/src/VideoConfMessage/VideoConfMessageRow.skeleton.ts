## File: packages/ui-video-conf/src/VideoConfMessage/VideoConfMessageRow.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';

type VideoConfMessageRowProps = ComponentProps<typeof Box>;

const VideoConfMessageRow = (props: VideoConfMessageRowProps) => <Box p={16} display='flex' justifyContent='space-between' {...props} />;

export default VideoConfMessageRow;

```