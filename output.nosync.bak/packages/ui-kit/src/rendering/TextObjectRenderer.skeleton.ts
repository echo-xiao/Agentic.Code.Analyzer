## File: packages/ui-kit/src/rendering/TextObjectRenderer.ts

```typescript
import type { BlockContext } from './BlockContext';
import type { TextObject } from '../blocks/TextObject';

export type TextObjectRenderer<OutputElement, Block extends TextObject = TextObject> = (
	textObject: Block,
	context: BlockContext,
	index: number,
) => OutputElement | null;

```