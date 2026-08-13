## File: packages/fuselage-ui-kit/src/blocks/ActionsBlock.Action.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import * as UiKit from '@rocket.chat/ui-kit';
import type { ReactElement } from 'react';

export type ActionProps = {
	element: UiKit.ActionsBlock['elements'][number];
	parser: UiKit.SurfaceRenderer<ReactElement<any>>;
	index: number;
};

const Action = ({ element, parser, index }: ActionProps) => {
    /* Implementation Hidden */
};

export default Action;

```