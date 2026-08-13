## File: packages/fuselage-ui-kit/src/surfaces/BannerSurfaceRenderer.tsx

```typescript
import { FuselageSurfaceRenderer, renderTextObject } from './FuselageSurfaceRenderer';

export class BannerSurfaceRenderer extends FuselageSurfaceRenderer {
	override plain_text = renderTextObject;

	override mrkdwn = renderTextObject;
}

```