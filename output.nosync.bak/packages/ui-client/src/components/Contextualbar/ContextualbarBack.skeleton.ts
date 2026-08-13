## File: packages/ui-client/src/components/Contextualbar/ContextualbarBack.tsx

```typescript
import type { ComponentProps } from 'react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import ContextualbarAction from './ContextualbarAction';

type ContextualbarBackProps = Partial<ComponentProps<typeof ContextualbarAction>>;

const ContextualbarBack = (props: ContextualbarBackProps) => {
    /* Implementation Hidden */
};

export default memo(ContextualbarBack);

```