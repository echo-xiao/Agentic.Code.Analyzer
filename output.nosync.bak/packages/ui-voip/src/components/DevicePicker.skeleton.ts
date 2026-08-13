## File: packages/ui-voip/src/components/DevicePicker.tsx

```typescript
import { Box, RadioButton } from '@rocket.chat/fuselage';
import { useSafely } from '@rocket.chat/fuselage-hooks';
import { GenericMenu } from '@rocket.chat/ui-client';
import type { GenericMenuItemProps } from '@rocket.chat/ui-client';
import { useAvailableDevices, useSelectedDevices } from '@rocket.chat/ui-contexts';
import type { ComponentProps, MouseEvent } from 'react';
import { forwardRef, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ActionButton } from '.';
import { useMediaCallView } from '../context/MediaCallViewContext';
import { useDevicePermissionPrompt2, stopTracks } from '../hooks/useDevicePermissionPrompt';

type DevicePickerButtonProps = {
	secondary?: boolean;
	small?: boolean;
} & Omit<ComponentProps<typeof ActionButton>, 'label' | 'icon'>;

// GenericMenu for some reason passes `small: true` when the button is disabled (??).
// so this is just a wrapper to stop that from happening.
const DevicePickerButton = forwardRef<HTMLButtonElement, DevicePickerButtonProps>(function DevicePickerButton(
	{ secondary = false, small: _small, ...props },
	ref,
) {
	return <ActionButton secondary={secondary} flexShrink={1} flexGrow={0} {...props} label='customize' icon='customize' ref={ref} />;
});

const getDefaultDeviceItem = (label: string, type: 'input' | 'output') => ({
	content: (
		<Box is='span' title={label} fontSize={14}>
			{label}
		</Box>
	),
	addon: <RadioButton onChange={() => undefined} checked={true} disabled />,
	id: `default-${type}`,
});

// eslint-disable-next-line react/no-multi-comp
const DevicePicker = ({ secondary = false, className }: { secondary?: boolean; className?: string }) => {
    /* Implementation Hidden */
};

export default DevicePicker;

```