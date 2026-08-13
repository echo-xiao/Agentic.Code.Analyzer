## File: packages/ui-kit/src/surfaces/attachment/uiKitAttachment.ts

```typescript
import type { AttachmentSurfaceLayout } from './UiKitParserAttachment';
import { createSurfaceRenderer } from '../../rendering/createSurfaceRenderer';

export const uiKitAttachment = createSurfaceRenderer<AttachmentSurfaceLayout[number]>();

```