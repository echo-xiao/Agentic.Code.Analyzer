## File: apps/meteor/client/portals/VideoConfPopupPortal.tsx

```typescript
import { AnchorPortal } from '@rocket.chat/ui-client';
import type { ReactNode } from 'react';
import { memo } from 'react';

const videoConfAnchorId = 'video-conf-root';

export type VideoConfPortalProps = {
	children?: ReactNode;
};

const VideoConfPortal = ({ children }: VideoConfPortalProps) => {
    /* Implementation Hidden */
};

export default memo(VideoConfPortal);

```