## File: packages/ui-contexts/src/hooks/useAvailableDevices.ts

```typescript
import { useContext } from 'react';

import type { Device } from '../DeviceContext';
import { DeviceContext, isDeviceContextEnabled } from '../DeviceContext';

type AvailableDevices = {
	audioInput?: Device[];
	audioOutput?: Device[];
};

export const useAvailableDevices = (): AvailableDevices | null => {
    /* Implementation Hidden */
};

```