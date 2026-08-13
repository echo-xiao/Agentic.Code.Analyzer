## File: packages/ui-kit/src/blocks/isActionsBlockElement.ts

```typescript
import type { BlockElement } from './BlockElement';
import { BlockElementType } from './BlockElementType';
import type { ActionsBlock } from './layout/ActionsBlock';

export const isActionsBlockElement = (block: BlockElement): block is ActionsBlock['elements'][number] => {
    /* Implementation Hidden */
};

```