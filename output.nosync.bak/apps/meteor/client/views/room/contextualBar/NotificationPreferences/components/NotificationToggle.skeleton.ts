## File: apps/meteor/client/views/room/contextualBar/NotificationPreferences/components/NotificationToggle.tsx

```typescript
import { Field, FieldLabel, FieldDescription, FieldGroup, ToggleSwitch, FieldRow } from '@rocket.chat/fuselage';
import type { ComponentProps } from 'react';
import { memo, useId } from 'react';

type NotificationToggleProps = {
	label: string;
	description?: string;
	onChange: (e: unknown) => void;
} & ComponentProps<typeof ToggleSwitch>;

const NotificationToggle = ({ label, description, onChange, ...props }: NotificationToggleProps) => {
    /* Implementation Hidden */
};

export default memo(NotificationToggle);

```