## File: packages/ui-contexts/src/hooks/useLoginWithCustomOauth.ts

```typescript
import { useContext } from 'react';

import { AuthenticationContext } from '../AuthenticationContext';

export const useLoginWithCustomOauth = () => useContext(AuthenticationContext).loginWithCustomOauth;

```