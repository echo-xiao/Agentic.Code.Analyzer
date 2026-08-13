## File: packages/ui-kit/src/blocks/isContextBlockElement.ts

```typescript
import type { BlockElement } from './BlockElement';
import { BlockElementType } from './BlockElementType';
import type { TextObject } from './TextObject';
import { TextObjectType } from './TextObjectType';
import type { ContextBlock } from './layout/ContextBlock';

export const isContextBlockElement = (block: TextObject | BlockElement): block is ContextBlock['elements'][number] => {
    /* Implementation Hidden */
};

```