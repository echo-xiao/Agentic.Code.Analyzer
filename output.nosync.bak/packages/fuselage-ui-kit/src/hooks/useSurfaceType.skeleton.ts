## File: packages/fuselage-ui-kit/src/hooks/useSurfaceType.ts

```typescript
import { useContext } from 'react';

import type { SurfaceContextValue } from '../contexts/SurfaceContext';
import { SurfaceContext } from '../contexts/SurfaceContext';

export const useSurfaceType = (): SurfaceContextValue => useContext(SurfaceContext);

```