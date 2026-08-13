## File: packages/ui-contexts/src/hooks/useLoginWithPassword.ts

```typescript
import { useContext } from 'react';

import { AuthenticationContext } from '../AuthenticationContext';

export const useLoginWithPassword = () => useContext(AuthenticationContext).loginWithPassword;

```