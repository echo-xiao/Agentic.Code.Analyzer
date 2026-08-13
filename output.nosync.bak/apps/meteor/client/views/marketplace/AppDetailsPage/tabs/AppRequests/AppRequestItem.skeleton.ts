## File: apps/meteor/client/views/marketplace/AppDetailsPage/tabs/AppRequests/AppRequestItem.tsx

```typescript
import { Badge, Box } from '@rocket.chat/fuselage';
import { UserAvatar } from '@rocket.chat/ui-avatar';
import { usePermission } from '@rocket.chat/ui-contexts';

import { useFormatDateAndTime } from '../../../../../hooks/useFormatDateAndTime';

export type AppRequestItemProps = {
	seen: boolean;
	name: string;
	createdDate: string;
	message: string;
	username: string;
};

const AppRequestItem = ({ seen, name, createdDate, message, username }: AppRequestItemProps) => {
    /* Implementation Hidden */
};

export default AppRequestItem;

```