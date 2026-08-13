## File: apps/meteor/server/modules/core-apps/nps/createModal.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';

import { settings } from '../../../../app/settings/server';
import { i18n } from '../../../lib/i18n';

type ModalParams = {
	id: string;
	type: string;
	appId: string;
	npsId: string;
	triggerId: string;
	score: string;
	user: IUser;
};

export const createModal = ({ type = 'modal.open', id, appId, npsId, triggerId, score, user }: ModalParams): any => {
    /* Implementation Hidden */
};

```