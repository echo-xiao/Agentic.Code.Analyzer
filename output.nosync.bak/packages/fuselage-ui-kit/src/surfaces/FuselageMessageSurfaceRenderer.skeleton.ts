## File: packages/fuselage-ui-kit/src/surfaces/FuselageMessageSurfaceRenderer.tsx

```typescript
import * as UiKit from '@rocket.chat/ui-kit';
import type { ReactNode } from 'react';

import { FuselageSurfaceRenderer, renderTextObject } from './FuselageSurfaceRenderer';
import VideoConferenceBlock from '../blocks/VideoConferenceBlock';
import { AppIdProvider } from '../contexts/AppIdContext';

export class FuselageMessageSurfaceRenderer extends FuselageSurfaceRenderer {
	public constructor() {
        /* Implementation Hidden */
    }

	override plain_text = renderTextObject;

	override mrkdwn = renderTextObject;

	video_conf(block: UiKit.VideoConferenceBlock, context: UiKit.BlockContext, index: number): ReactNode {
        /* Implementation Hidden */
    }
}

```