## File: packages/ui-kit/src/blocks/isSectionBlockAccessoryElement.ts

```typescript
import type { BlockElement } from './BlockElement';
import { BlockElementType } from './BlockElementType';
import type { SectionBlock } from './layout/SectionBlock';

export const isSectionBlockAccessoryElement = (block: BlockElement): block is Exclude<SectionBlock['accessory'], undefined> => {
    /* Implementation Hidden */
};

```