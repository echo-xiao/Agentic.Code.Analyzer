## File: packages/ui-contexts/src/hooks/useLayout.ts

```typescript
import { useContext } from 'react';

import type { LayoutContextValue } from '../LayoutContext';
import { LayoutContext } from '../LayoutContext';

export const useLayout = (): LayoutContextValue => useContext(LayoutContext);

```