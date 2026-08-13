## File: packages/fuselage-ui-kit/src/contexts/SurfaceContext.ts

```typescript
import { createContext } from 'react';

export type SurfaceContextValue = 'attachment' | 'banner' | 'message' | 'modal' | 'contextualBar' | 'custom';

export const SurfaceContext = createContext<SurfaceContextValue>('message');

```