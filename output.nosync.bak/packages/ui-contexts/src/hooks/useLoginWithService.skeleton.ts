## File: packages/ui-contexts/src/hooks/useLoginWithService.ts

```typescript
import type { LoginServiceConfiguration } from '@rocket.chat/core-typings';
import { useContext, useMemo } from 'react';

import { AuthenticationContext } from '../AuthenticationContext';

export const useLoginWithService = <T extends LoginServiceConfiguration>(service: T): (() => Promise<true>) => {
    /* Implementation Hidden */
};

```