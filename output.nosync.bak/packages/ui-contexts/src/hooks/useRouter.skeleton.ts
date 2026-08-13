## File: packages/ui-contexts/src/hooks/useRouter.ts

```typescript
import { useContext } from 'react';

import { RouterContext } from '../RouterContext';

export const useRouter = () => useContext(RouterContext);

```