## File: packages/fuselage-ui-kit/src/utils/BlockProps.ts

```typescript
import type { Box } from '@rocket.chat/fuselage';
import type * as UiKit from '@rocket.chat/ui-kit';
import type { ComponentProps, ReactElement } from 'react';

export type BlockProps<B extends UiKit.Block> = {
	className?: ComponentProps<typeof Box>['className'];
	block: B;
	context: UiKit.BlockContext;
	index: number;
	surfaceRenderer: UiKit.SurfaceRenderer<ReactElement<any>>;
};

```