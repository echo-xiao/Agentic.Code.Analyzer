## File: apps/meteor/client/views/room/composer/RoomComposer/hooks/useAutoGrow.ts

```typescript
import { useSafeRefCallback } from '@rocket.chat/fuselage-hooks';
import type { CSSProperties, MutableRefObject, RefCallback } from 'react';
import { useCallback } from 'react';

function shouldScrollToBottom(textarea: HTMLTextAreaElement) {
    /* Implementation Hidden */
}

export const useAutoGrow = (
	ref: MutableRefObject<HTMLTextAreaElement | null>,
	hideTextArea?: boolean,
): {
	textAreaStyle: CSSProperties;
	autoGrowRef: RefCallback<HTMLTextAreaElement>;
} => {
    /* Implementation Hidden */
};

```