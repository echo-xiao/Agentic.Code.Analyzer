## File: apps/meteor/client/hooks/menuActions/useToggleNotificationsAction.ts

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useEndpoint, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { useTranslation } from 'react-i18next';

type useToggleNotificationActionProps = {
	rid: IRoom['_id'];
	isNotificationEnabled: boolean;
	roomName: string;
};

export const useToggleNotificationAction = ({ rid, isNotificationEnabled, roomName }: useToggleNotificationActionProps) => {
    /* Implementation Hidden */
};

```