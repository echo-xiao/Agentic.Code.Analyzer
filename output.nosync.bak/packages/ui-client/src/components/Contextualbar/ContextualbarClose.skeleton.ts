## File: packages/ui-client/src/components/Contextualbar/ContextualbarClose.tsx

```typescript
import type { ComponentProps } from 'react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import ContextualbarAction from './ContextualbarAction';

type ContextualbarCloseProps = Partial<ComponentProps<typeof ContextualbarAction>>;

const ContextualbarClose = (props: ContextualbarCloseProps) => {
    /* Implementation Hidden */
};

export default memo(ContextualbarClose);

```