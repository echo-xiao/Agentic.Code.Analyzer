## File: packages/fuselage-ui-kit/src/surfaces/ContextualBarSurfaceRenderer.tsx

```typescript
import * as UiKit from '@rocket.chat/ui-kit';
import type { ReactNode } from 'react';

import { FuselageSurfaceRenderer, renderTextObject } from './FuselageSurfaceRenderer';
import TabNavigationBlock from '../blocks/TabNavigationBlock';
import { AppIdProvider } from '../contexts/AppIdContext';

export class ContextualBarSurfaceRenderer extends FuselageSurfaceRenderer {
	public constructor() {
        /* Implementation Hidden */
    }

	override plain_text = renderTextObject;

	override mrkdwn = renderTextObject;

	tab_navigation(block: UiKit.ExperimentalTabNavigationBlock, context: UiKit.BlockContext, index: number): ReactNode {
        /* Implementation Hidden */
    }
}

```