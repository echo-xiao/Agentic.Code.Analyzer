## File: packages/ui-kit/src/surfaces/attachment/UiKitParserAttachment.ts

```typescript
import type { ActionsBlock } from '../../blocks/layout/ActionsBlock';
import type { CalloutBlock } from '../../blocks/layout/CalloutBlock';
import type { ContextBlock } from '../../blocks/layout/ContextBlock';
import type { DividerBlock } from '../../blocks/layout/DividerBlock';
import type { ImageBlock } from '../../blocks/layout/ImageBlock';
import type { SectionBlock } from '../../blocks/layout/SectionBlock';
import { SurfaceRenderer } from '../../rendering/SurfaceRenderer';

type AttachmentSurfaceLayoutBlock = ActionsBlock | ContextBlock | DividerBlock | ImageBlock | SectionBlock | CalloutBlock;

export abstract class UiKitParserAttachment<T> extends SurfaceRenderer<T, AttachmentSurfaceLayoutBlock> {
	public constructor() {
        /* Implementation Hidden */
    }
}

export type AttachmentSurfaceLayout = AttachmentSurfaceLayoutBlock[];

```