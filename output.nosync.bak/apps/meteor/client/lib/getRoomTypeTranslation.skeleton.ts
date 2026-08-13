## File: apps/meteor/client/lib/getRoomTypeTranslation.ts

```typescript
import {
	isPublicRoom,
	type IRoom,
	isDirectMessageRoom,
	isPrivateTeamRoom,
	isPublicTeamRoom,
	isPrivateDiscussion,
	isPrivateRoom,
} from '@rocket.chat/core-typings';

import { t } from '../../app/utils/lib/i18n';

export const getRoomTypeTranslation = (room: IRoom) => {
    /* Implementation Hidden */
};

```