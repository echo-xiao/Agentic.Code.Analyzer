## File: apps/meteor/client/hooks/useFireGlobalEvent.ts

```typescript
import { useSetting } from '@rocket.chat/ui-contexts';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import { fireGlobalEventBase } from '../lib/utils/fireGlobalEventBase';

const getScopeForEvent = (eventName: string, scope?: string) => (scope ? `${eventName}/${scope}` : eventName);

export const useFireGlobalEvent = (eventName: string, scope?: string) => {
    /* Implementation Hidden */
};

```