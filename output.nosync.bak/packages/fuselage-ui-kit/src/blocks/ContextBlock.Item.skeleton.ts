## File: packages/fuselage-ui-kit/src/blocks/ContextBlock.Item.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import * as UiKit from '@rocket.chat/ui-kit';
import type { ReactElement } from 'react';

export type ItemProps = {
	block: UiKit.ContextBlock['elements'][number];
	surfaceRenderer: UiKit.SurfaceRenderer<ReactElement<any>>;
	index: number;
};

const Item = ({ block: element, surfaceRenderer: parser, index }: ItemProps) => {
    /* Implementation Hidden */
};

export default Item;

```