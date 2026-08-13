## File: packages/fuselage-ui-kit/src/utils/extractInitialStateFromLayout.ts

```typescript
import type * as UiKit from '@rocket.chat/ui-kit';

import { type Value, getInitialValue } from './getInitialValue';
import { hasElement } from './hasElement';
import { hasElements } from './hasElements';

const isActionableElement = (element: UiKit.BlockElement | UiKit.TextObject): element is UiKit.ActionableElement =>
	'actionId' in element && typeof element.actionId === 'string';

const reduceInitialValuesFromLayoutBlock = (state: { [actionId: string]: Value }, block: UiKit.LayoutBlock) => {
    /* Implementation Hidden */
};

export const extractInitialStateFromLayout = (blocks: UiKit.LayoutBlock[]) => blocks.reduce(reduceInitialValuesFromLayoutBlock, {});

```