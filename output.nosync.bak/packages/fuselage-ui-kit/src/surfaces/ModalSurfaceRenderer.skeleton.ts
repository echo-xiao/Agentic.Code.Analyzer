## File: packages/fuselage-ui-kit/src/surfaces/ModalSurfaceRenderer.tsx

```typescript
import { FuselageSurfaceRenderer, renderTextObject } from './FuselageSurfaceRenderer';

export class ModalSurfaceRenderer extends FuselageSurfaceRenderer {
	public constructor() {
        /* Implementation Hidden */
    }

	override plain_text = renderTextObject;

	override mrkdwn = renderTextObject;
}

```