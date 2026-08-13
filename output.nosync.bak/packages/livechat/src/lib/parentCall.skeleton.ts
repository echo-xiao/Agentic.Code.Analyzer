## File: packages/livechat/src/lib/parentCall.ts

```typescript
import { VALID_CALLBACKS } from '../widget';

const getParentWindowTarget = () => {
    /* Implementation Hidden */
};

export const parentCall = (method: string, ...args: any[]) => {
    /* Implementation Hidden */
};

export const runCallbackEventEmitter = (callbackName: string, data: unknown) =>
	VALID_CALLBACKS.includes(callbackName) && parentCall('callback', callbackName, data);

```