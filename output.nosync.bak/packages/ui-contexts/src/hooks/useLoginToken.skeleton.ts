## File: packages/ui-contexts/src/hooks/useLoginToken.ts

```typescript
import { useContext } from 'react';

import { AuthenticationContext } from '../AuthenticationContext';

export const useLoginToken = (): string | null => useContext(AuthenticationContext).getLoginToken();

```