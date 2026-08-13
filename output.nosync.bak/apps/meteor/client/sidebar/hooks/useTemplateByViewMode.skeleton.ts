## File: apps/meteor/client/sidebar/hooks/useTemplateByViewMode.ts

```typescript
import { useUserPreference } from '@rocket.chat/ui-contexts';
import { useMemo } from 'react';

import Condensed from '../Item/Condensed';
import Extended from '../Item/Extended';
import Medium from '../Item/Medium';

export const useTemplateByViewMode = (): typeof Condensed | typeof Extended | typeof Medium => {
    /* Implementation Hidden */
};

```