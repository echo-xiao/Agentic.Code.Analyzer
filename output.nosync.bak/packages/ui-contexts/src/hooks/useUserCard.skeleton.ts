## File: packages/ui-contexts/src/hooks/useUserCard.ts

```typescript
import { useContext } from 'react';

import { UserCardContext } from '../UserCardContext';

export const useUserCard = () => useContext(UserCardContext);

```