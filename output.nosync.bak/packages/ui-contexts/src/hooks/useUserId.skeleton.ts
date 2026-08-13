## File: packages/ui-contexts/src/hooks/useUserId.ts

```typescript
import { useContext } from 'react';

import { UserContext } from '../UserContext';

export const useUserId = () => useContext(UserContext).userId;

```