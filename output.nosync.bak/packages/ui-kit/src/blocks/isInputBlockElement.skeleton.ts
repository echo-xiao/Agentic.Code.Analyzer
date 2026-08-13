## File: packages/ui-kit/src/blocks/isInputBlockElement.ts

```typescript
import type { BlockElement } from './BlockElement';
import { BlockElementType } from './BlockElementType';
import type { InputBlock } from './layout/InputBlock';

export const isInputBlockElement = (block: BlockElement): block is InputBlock['element'] => {
    /* Implementation Hidden */
};

```