## File: apps/meteor/client/views/admin/users/UsersPageHeaderContent.tsx

```typescript
import { Button, ButtonGroup, Margins } from '@rocket.chat/fuselage';
import { usePermission, useRouter } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

import SeatsCapUsage from './SeatsCapUsage';
import type { SeatCapProps } from './useSeatsCap';
import { useExternalLink } from '../../../hooks/useExternalLink';
import { useCheckoutUrl } from '../subscription/hooks/useCheckoutUrl';

export type UsersPageHeaderContentProps = {
	isSeatsCapExceeded: boolean;
	seatsCap?: Omit<SeatCapProps, 'reload'>;
};

const UsersPageHeaderContent = ({ isSeatsCapExceeded, seatsCap }: UsersPageHeaderContentProps) => {
    /* Implementation Hidden */
};

export default UsersPageHeaderContent;

```