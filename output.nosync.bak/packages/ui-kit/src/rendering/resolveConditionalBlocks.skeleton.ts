## File: packages/ui-kit/src/rendering/resolveConditionalBlocks.ts

```typescript
import type { Conditions } from './Conditions';
import type { Block } from '../blocks/Block';
import { LayoutBlockType } from '../blocks/LayoutBlockType';
import type { ConditionalBlock } from '../blocks/layout/ConditionalBlock';

const conditionsMatch = (conditions: Conditions | undefined = undefined, filters: ConditionalBlock['when'] = {}): boolean => {
    /* Implementation Hidden */
};

export const resolveConditionalBlocks =
	(conditions?: Conditions) =>
	(block: Block): readonly Block[] => {
		if (block.type !== LayoutBlockType.CONDITIONAL) {
			return [block];
		}

		if (conditionsMatch(conditions, block.when)) {
			return block.render;
		}

		return [];
	};

```