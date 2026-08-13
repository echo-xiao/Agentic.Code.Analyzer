## File: packages/ui-kit/src/surfaces/banner/UiKitParserBanner.ts

```typescript
import type { ActionsBlock } from '../../blocks/layout/ActionsBlock';
import type { CalloutBlock } from '../../blocks/layout/CalloutBlock';
import type { ContextBlock } from '../../blocks/layout/ContextBlock';
import type { DividerBlock } from '../../blocks/layout/DividerBlock';
import type { ImageBlock } from '../../blocks/layout/ImageBlock';
import type { InputBlock } from '../../blocks/layout/InputBlock';
import type { SectionBlock } from '../../blocks/layout/SectionBlock';
import { SurfaceRenderer } from '../../rendering/SurfaceRenderer';

type BannerSurfaceLayoutBlock = ActionsBlock | ContextBlock | DividerBlock | ImageBlock | InputBlock | SectionBlock | CalloutBlock;

export abstract class UiKitParserBanner<T> extends SurfaceRenderer<T, BannerSurfaceLayoutBlock> {
	public constructor() {
        /* Implementation Hidden */
    }
}

export type BannerSurfaceLayout = BannerSurfaceLayoutBlock[];

```