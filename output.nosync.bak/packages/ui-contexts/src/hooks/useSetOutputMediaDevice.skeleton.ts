## File: packages/ui-contexts/src/hooks/useSetOutputMediaDevice.ts

```typescript
import { useContext } from 'react';

import type { Device } from '../DeviceContext';
import { DeviceContext, isDeviceContextEnabled } from '../DeviceContext';

// This allows different places to set the output device by providing a HTMLAudioElement

type setOutputMediaDevice = ({ outputDevice, HTMLAudioElement }: { outputDevice: Device; HTMLAudioElement: HTMLAudioElement }) => void;

export const useSetOutputMediaDevice = (): setOutputMediaDevice => {
    /* Implementation Hidden */
};

```