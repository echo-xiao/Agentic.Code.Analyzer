## File: packages/fuselage-ui-kit/src/blocks/SectionBlock.tsx

```typescript
import { Box, FlexItem, Grid, GridItem } from '@rocket.chat/fuselage';
import type * as UiKit from '@rocket.chat/ui-kit';
import { memo, useMemo } from 'react';

import Fields from './SectionBlock.Fields';
import type { BlockProps } from '../utils/BlockProps';

export type SectionBlockProps = BlockProps<UiKit.SectionBlock>;

const SectionBlock = ({ className, block, surfaceRenderer }: SectionBlockProps) => {
    /* Implementation Hidden */
};

export default memo(SectionBlock);

```