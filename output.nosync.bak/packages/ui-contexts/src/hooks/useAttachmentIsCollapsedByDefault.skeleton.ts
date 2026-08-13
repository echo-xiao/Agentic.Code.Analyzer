## File: packages/ui-contexts/src/hooks/useAttachmentIsCollapsedByDefault.ts

```typescript
import { useContext } from 'react';

import { AttachmentContext } from '../AttachmentContext';

export const useAttachmentIsCollapsedByDefault = (): boolean => useContext(AttachmentContext).collapsedByDefault;

```