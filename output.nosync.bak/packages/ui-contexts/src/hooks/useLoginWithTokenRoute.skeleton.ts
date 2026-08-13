## File: packages/ui-contexts/src/hooks/useLoginWithTokenRoute.ts

```typescript
import { useContext } from 'react';

import { AuthenticationContext } from '../AuthenticationContext';

export const useLoginWithTokenRoute = (): ((token: string, callback?: (error: Error | null | undefined) => void) => Promise<void>) =>
	useContext(AuthenticationContext).loginWithTokenRoute;

```