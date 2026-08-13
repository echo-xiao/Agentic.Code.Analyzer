## File: apps/meteor/client/components/message/content/collapsible/CollapsibleContent.tsx

```typescript
import type { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';

import Action from '../Action';

export type CollapsibleContentProps = Omit<ComponentProps<typeof Action>, 'icon'> & { collapsed?: boolean };

const CollapsibleContent = ({ collapsed = false, ...props }: CollapsibleContentProps) => {
    /* Implementation Hidden */
};

export default CollapsibleContent;

```