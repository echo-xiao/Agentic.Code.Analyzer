## File: packages/fuselage-ui-kit/src/elements/TabElement.tsx

```typescript
import { TabsItem } from '@rocket.chat/fuselage';
import * as UiKit from '@rocket.chat/ui-kit';
import type { Dispatch } from 'react';

import { useUiKitState } from '../hooks/useUiKitState';
import type { BlockProps } from '../utils/BlockProps';

export const TabElement = ({
	block,
	context,
	surfaceRenderer,
	index,
	select,
}: BlockProps<UiKit.ExperimentalTabElement> & {
	select: Dispatch<number>;
}) => {
    /* Implementation Hidden */
};

```