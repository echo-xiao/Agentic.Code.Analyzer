## File: apps/meteor/client/views/marketplace/hooks/useAppsOrchestration.ts

```typescript
import { useContext } from 'react';

import { AppsContext } from '../../../contexts/AppsContext';

export const useAppsOrchestration = () => useContext(AppsContext);

```