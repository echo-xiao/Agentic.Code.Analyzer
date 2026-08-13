## File: apps/meteor/client/components/GenericCard/GenericCard.tsx

```typescript
import { Card, CardTitle, CardBody, CardControls, CardHeader, FramedIcon } from '@rocket.chat/fuselage';
import { useId } from 'react';
import type { ComponentProps, ReactElement } from 'react';

import type { GenericCardButton } from './GenericCardButton';

export type GenericCardProps = {
	title: string;
	body: string;
	buttons?: ReactElement<typeof GenericCardButton>[];
	icon?: ComponentProps<typeof FramedIcon>['icon'];
	type?: 'info' | 'success' | 'warning' | 'danger' | 'neutral';
} & ComponentProps<typeof Card>;

export const GenericCard = ({ title, body, buttons, icon, type, ...props }: GenericCardProps) => {
    /* Implementation Hidden */
};

```