## File: packages/ui-contexts/src/hooks/useSetInputMediaDevice.ts

```typescript
import { useContext } from 'react';

import type { Device } from '../DeviceContext';
import { DeviceContext, isDeviceContextEnabled } from '../DeviceContext';

type setInputMediaDevice = (inputDevice: Device) => void;

export const useSetInputMediaDevice = (): setInputMediaDevice => {
    /* Implementation Hidden */
};

```