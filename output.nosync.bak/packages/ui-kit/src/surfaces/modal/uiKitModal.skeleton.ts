## File: packages/ui-kit/src/surfaces/modal/uiKitModal.ts

```typescript
import type { ModalSurfaceLayout } from './UiKitParserModal';
import { createSurfaceRenderer } from '../../rendering/createSurfaceRenderer';

export const uiKitModal = createSurfaceRenderer<ModalSurfaceLayout[number]>();

```