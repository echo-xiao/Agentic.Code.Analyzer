## File: packages/ui-kit/src/surfaces/message/uiKitMessage.ts

```typescript
import type { MessageSurfaceLayout } from './UiKitParserMessage';
import { createSurfaceRenderer } from '../../rendering/createSurfaceRenderer';

export const uiKitMessage = createSurfaceRenderer<MessageSurfaceLayout[number]>();

```