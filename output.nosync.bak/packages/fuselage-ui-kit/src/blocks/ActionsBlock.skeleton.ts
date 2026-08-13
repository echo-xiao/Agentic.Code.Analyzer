## File: packages/fuselage-ui-kit/src/blocks/ActionsBlock.tsx

```typescript
import { Box, Button } from '@rocket.chat/fuselage';
import * as UiKit from '@rocket.chat/ui-kit';
import { memo, useCallback, useMemo, useState } from 'react';

import Action from './ActionsBlock.Action';
import { useSurfaceType } from '../hooks/useSurfaceType';
import type { BlockProps } from '../utils/BlockProps';

export type ActionsBlockProps = BlockProps<UiKit.ActionsBlock>;

const ActionsBlock = ({ className, block, surfaceRenderer }: ActionsBlockProps) => {
    /* Implementation Hidden */
};

export default memo(ActionsBlock);

```