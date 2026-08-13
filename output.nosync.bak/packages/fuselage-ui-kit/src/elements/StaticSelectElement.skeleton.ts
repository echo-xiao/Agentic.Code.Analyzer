## File: packages/fuselage-ui-kit/src/elements/StaticSelectElement.tsx

```typescript
import { SelectFiltered } from '@rocket.chat/fuselage';
import type * as UiKit from '@rocket.chat/ui-kit';
import { memo, useCallback, useMemo } from 'react';

import { useStringFromTextObject } from '../hooks/useStringFromTextObject';
import { useUiKitState } from '../hooks/useUiKitState';
import type { BlockProps } from '../utils/BlockProps';

export type StaticSelectElementProps = BlockProps<UiKit.StaticSelectElement>;

const StaticSelectElement = ({ block, context }: StaticSelectElementProps) => {
    /* Implementation Hidden */
};

export default memo(StaticSelectElement);

```