## File: packages/ui-voip/src/utils/deriveWidgetStateFromCallState.ts

```typescript
import type { CallRole, CallState } from '@rocket.chat/media-signaling';

import type { State } from '../context/definitions';

export const deriveWidgetStateFromCallState = (
	callState: CallState,
	callRole: CallRole,
): Extract<State, 'ongoing' | 'ringing' | 'calling'> | undefined => {
    /* Implementation Hidden */
};

```