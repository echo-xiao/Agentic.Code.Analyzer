## File: packages/fuselage-ui-kit/src/blocks/ContextBlock.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import type * as UiKit from '@rocket.chat/ui-kit';
import { memo, useMemo } from 'react';

import Item from './ContextBlock.Item';
import type { BlockProps } from '../utils/BlockProps';

export type ContextBlockProps = BlockProps<UiKit.ContextBlock>;

const ContextBlock = ({ className, block, surfaceRenderer }: ContextBlockProps) => {
    /* Implementation Hidden */
};

export default memo(ContextBlock);

```