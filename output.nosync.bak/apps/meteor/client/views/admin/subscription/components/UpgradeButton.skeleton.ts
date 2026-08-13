## File: apps/meteor/client/views/admin/subscription/components/UpgradeButton.tsx

```typescript
import { Button } from '@rocket.chat/fuselage';
import type { ButtonProps } from '@rocket.chat/fuselage/dist/components/Button/Button';
import { memo } from 'react';

import { useExternalLink } from '../../../../hooks/useExternalLink';
import { useCheckoutUrl } from '../hooks/useCheckoutUrl';

const UpgradeButton = ({
	children,
	target = '_blank',
	action,
	...props
}: Partial<ButtonProps> & {
	target: string;
	action: string;
}) => {
    /* Implementation Hidden */
};

export default memo(UpgradeButton);

```