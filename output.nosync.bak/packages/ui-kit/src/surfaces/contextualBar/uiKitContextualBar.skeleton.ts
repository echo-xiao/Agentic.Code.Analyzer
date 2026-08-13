## File: packages/ui-kit/src/surfaces/contextualBar/uiKitContextualBar.ts

```typescript
import type { ContextualBarSurfaceLayout } from './UiKitParserContextualBar';
import { createSurfaceRenderer } from '../../rendering/createSurfaceRenderer';

export const uiKitContextualBar = createSurfaceRenderer<ContextualBarSurfaceLayout[number]>();

```