## File: packages/ui-contexts/src/hooks/useLayoutContextualBarPosition.ts

```typescript
import { useContext } from 'react';

import type { LayoutContextValue } from '../LayoutContext';
import { LayoutContext } from '../LayoutContext';

export const useLayoutContextualBarPosition = (): LayoutContextValue['contextualBarPosition'] =>
	useContext(LayoutContext).contextualBarPosition;

```