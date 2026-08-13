## File: packages/ui-voip/src/providers/useWidgetExternalControlSignalListener.ts

```typescript
import type { EventHandlerOf } from '@rocket.chat/emitter';
import { useEffect } from 'react';

import { useMediaCallInstance, type Signals } from '../context/MediaCallInstanceContext';

export const useWidgetExternalControlSignalListener = <T extends keyof Signals>(signal: T, callback: EventHandlerOf<Signals, T>) => {
    /* Implementation Hidden */
};

```