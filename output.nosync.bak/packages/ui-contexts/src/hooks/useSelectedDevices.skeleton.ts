## File: packages/ui-contexts/src/hooks/useSelectedDevices.ts

```typescript
import { useContext } from 'react';

import type { Device } from '../DeviceContext';
import { DeviceContext, isDeviceContextEnabled } from '../DeviceContext';

type SelectedDevices = {
	audioInput?: Device;
	audioOutput?: Device;
};

export const useSelectedDevices = (): SelectedDevices | null => {
    /* Implementation Hidden */
};

```