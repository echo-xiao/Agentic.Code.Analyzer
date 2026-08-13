## File: apps/meteor/client/views/marketplace/AppDetailsPage/tabs/AppLogs/AppLogsItemField.tsx

```typescript
import { Box } from '@rocket.chat/fuselage';
import type { ComponentProps, ReactNode } from 'react';

export type AppsLogItemFieldProps = {
	field: ReactNode | string;
	label: string;
} & ComponentProps<typeof Box>;

export const AppsLogItemField = ({ field, label, ...props }: AppsLogItemFieldProps) => {
    /* Implementation Hidden */
};

```