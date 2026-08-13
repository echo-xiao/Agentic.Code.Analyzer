## File: packages/ui-contexts/src/hooks/useMediaDevicePermission.ts

```typescript
import { useContext } from 'react';

import { DeviceContext, isDeviceContextEnabled } from '../DeviceContext';

const requestDevice = async ({
	onAccept,
	onReject,
	constraints = { audio: true },
}: {
	onAccept?: (stream: MediaStream) => void;
	onReject?: (error: DOMException) => void;
	constraints?: MediaStreamConstraints;
}): Promise<void> => {
    /* Implementation Hidden */
};

const isPermissionDenied = (state: PermissionState): state is 'denied' => {
    /* Implementation Hidden */
};

type DeniedReturn = { state: 'denied'; requestDevice?: never };
type PromptOrGrantedReturn = { state: 'prompt' | 'granted'; requestDevice: typeof requestDevice };

/**
 * @description Hook to check if the microphone permission is granted. If the permission is denied, or the permission is not requested, the hook will return a function to request the permission. Right now just the microphone permission is handled with this hook, since DeviceContext is only used for audio input and output.
 * @returns { state: 'granted' } if the permission is granted
 * @returns { state: 'denied' } if the permission is denied
 * @returns { state: 'prompt', requestPrompt: function ({onAccept, onReject}) {} } if the permission is in prompt state.
 */
export const useMediaDeviceMicrophonePermission = (): DeniedReturn | PromptOrGrantedReturn => {
    /* Implementation Hidden */
};

```