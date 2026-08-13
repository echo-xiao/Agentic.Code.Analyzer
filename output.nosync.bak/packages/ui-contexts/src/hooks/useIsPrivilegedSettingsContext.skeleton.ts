## File: packages/ui-contexts/src/hooks/useIsPrivilegedSettingsContext.ts

```typescript
import { useContext } from 'react';

import { SettingsContext } from '../SettingsContext';

export const useIsPrivilegedSettingsContext = (): boolean => useContext(SettingsContext).hasPrivateAccess;

```