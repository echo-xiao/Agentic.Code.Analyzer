## File: packages/fuselage-ui-kit/src/elements/MultiStaticSelectElement.tsx

```typescript
import type { SelectOption } from '@rocket.chat/fuselage';
import { MultiSelectFiltered } from '@rocket.chat/fuselage';
import type * as UiKit from '@rocket.chat/ui-kit';
import { memo, useCallback, useMemo } from 'react';

import { useStringFromTextObject } from '../hooks/useStringFromTextObject';
import { useUiKitState } from '../hooks/useUiKitState';
import type { BlockProps } from '../utils/BlockProps';

export type MultiStaticSelectElementProps = BlockProps<UiKit.MultiStaticSelectElement>;

const MultiStaticSelectElement = ({ block, context }: MultiStaticSelectElementProps) => {
    /* Implementation Hidden */
};

export default memo(MultiStaticSelectElement);

```