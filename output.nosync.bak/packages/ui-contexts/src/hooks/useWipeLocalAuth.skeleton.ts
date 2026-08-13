## File: packages/ui-contexts/src/hooks/useWipeLocalAuth.ts

```typescript
import { useContext } from 'react';

import { AuthenticationContext } from '../AuthenticationContext';

export const useWipeLocalAuth = (): (() => void) => useContext(AuthenticationContext).wipeLocalAuth;

```