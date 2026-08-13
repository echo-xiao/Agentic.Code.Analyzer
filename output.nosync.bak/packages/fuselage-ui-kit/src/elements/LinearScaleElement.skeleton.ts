## File: packages/fuselage-ui-kit/src/elements/LinearScaleElement.tsx

```typescript
import { Box, Button, ButtonGroup } from '@rocket.chat/fuselage';
import * as UiKit from '@rocket.chat/ui-kit';
import { memo, useMemo } from 'react';

import { useUiKitState } from '../hooks/useUiKitState';
import type { BlockProps } from '../utils/BlockProps';

export type LinearScaleElementProps = BlockProps<UiKit.LinearScaleElement>;

const LinearScaleElement = ({ className, block, context, surfaceRenderer }: LinearScaleElementProps) => {
    /* Implementation Hidden */
};

export default memo(LinearScaleElement);

```