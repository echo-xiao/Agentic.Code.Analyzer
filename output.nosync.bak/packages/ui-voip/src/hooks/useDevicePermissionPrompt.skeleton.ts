## File: packages/ui-voip/src/hooks/useDevicePermissionPrompt.tsx

```typescript
import { useMediaDeviceMicrophonePermission, useSelectedDevices, useSetInputMediaDevice, useSetModal } from '@rocket.chat/ui-contexts';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { PermissionFlowModal, type PermissionFlowModalType } from '../views';

type OnAccept = (stream: MediaStream) => void;
type OnReject = (error?: DOMException) => void;

type DeviceChangePromptProps = {
	onAccept: OnAccept;
	onReject?: OnReject;
	actionType: 'device-change';
};

type OutgoingPromptProps = {
	onAccept: OnAccept;
	onReject?: OnReject;
	actionType: 'outgoing';
};

type IncomingPromptProps = {
	onAccept: OnAccept;
	onReject: OnReject;
	actionType: 'incoming';
};

type UseDevicePermissionPromptProps = DeviceChangePromptProps | OutgoingPromptProps | IncomingPromptProps;

const getModalType = (
	actionType: UseDevicePermissionPromptProps['actionType'],
	state: Exclude<PermissionState, 'granted'>,
): PermissionFlowModalType => {
    /* Implementation Hidden */
};

export const stopTracks = (stream: MediaStream) => {
    /* Implementation Hidden */
};

export class PermissionRequestCancelledCallRejectedError extends Error {
	constructor(message: string) {
        /* Implementation Hidden */
    }
}

export const useDevicePermissionPrompt2 = () => {
    /* Implementation Hidden */
};

```