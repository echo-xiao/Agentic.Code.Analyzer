## File: apps/meteor/client/views/room/composer/messageBox/hooks/useMessageBoxAutoFocus.ts

```typescript
import type { Ref } from 'react';
import { useCallback, useEffect, useRef } from 'react';

/**
 * if the user is types outside the message box and its not actually typing in any input field
 * then the message box should be focused
 * @returns callbackRef to bind the logic to the message box
 */
export const useMessageBoxAutoFocus = (enabled: boolean): Ref<HTMLElement> => {
    /* Implementation Hidden */
};

```