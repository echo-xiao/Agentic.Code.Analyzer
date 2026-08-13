## File: packages/ui-contexts/src/hooks/useLoginWithIframe.ts

```typescript
import { useContext } from 'react';

import { AuthenticationContext } from '../AuthenticationContext';

export const useLoginWithIframe = (): ((token: string, callback?: (error: Error | null | undefined) => void) => Promise<void>) =>
	useContext(AuthenticationContext).loginWithIframe;

```