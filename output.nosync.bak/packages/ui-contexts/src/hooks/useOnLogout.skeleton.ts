## File: packages/ui-contexts/src/hooks/useOnLogout.ts

```typescript
import type { OffCallbackHandler } from '@rocket.chat/emitter';
import { useContext } from 'react';

import { UserContext } from '../UserContext';

export const useOnLogout = (): ((callback: () => void) => OffCallbackHandler) => useContext(UserContext).onLogout;

```