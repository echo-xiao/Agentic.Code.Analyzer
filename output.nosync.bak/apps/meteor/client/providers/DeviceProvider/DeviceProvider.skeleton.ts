## File: apps/meteor/client/providers/DeviceProvider/DeviceProvider.tsx

```typescript
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import type { Device, DeviceContextValue } from '@rocket.chat/ui-contexts';
import { DeviceContext } from '@rocket.chat/ui-contexts';
import { useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useEffect, useState, useMemo } from 'react';

import { isSetSinkIdAvailable } from './lib/isSetSinkIdAvailable';

export type DeviceProviderProps = {
	children?: ReactNode | undefined;
};

const defaultDevices = {
	audioInput: [],
	audioOutput: [],
	defaultAudioOutputDevice: {
		id: '',
		label: '',
		type: 'audiooutput',
	},
	defaultAudioInputDevice: {
		id: '',
		label: '',
		type: 'audioinput',
	},
};

const devicesQueryKey = ['media-devices-list'];

export const DeviceProvider = ({ children }: DeviceProviderProps) => {
    /* Implementation Hidden */
};

```