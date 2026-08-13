## File: packages/ui-contexts/src/hooks/useLayoutHiddenActions.ts

```typescript
import { useContext } from 'react';

import type { LayoutContextValue } from '../LayoutContext';
import { LayoutContext } from '../LayoutContext';

export const useLayoutHiddenActions = (): LayoutContextValue['hiddenActions'] => useContext(LayoutContext).hiddenActions;

```