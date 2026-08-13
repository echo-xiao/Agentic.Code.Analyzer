## File: packages/ui-kit/src/blocks/Block.ts

```typescript
import type { BlockElement } from './BlockElement';
import type { LayoutBlock } from './LayoutBlock';
import type { TextObject } from './TextObject';

export type Block = TextObject | BlockElement | LayoutBlock;

```