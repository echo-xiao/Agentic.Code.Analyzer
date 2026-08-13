## File: packages/ui-voip/src/providers/usePlayMediaStream.ts

```typescript
import { useSafeRefCallback } from '@rocket.chat/fuselage-hooks';
import { useCallback, useRef } from 'react';

export const usePlayMediaStream = (
	stream?: MediaStream | null,
): [(node: HTMLAudioElement | null) => void, { current: HTMLAudioElement | null }] => {
    /* Implementation Hidden */
};

```