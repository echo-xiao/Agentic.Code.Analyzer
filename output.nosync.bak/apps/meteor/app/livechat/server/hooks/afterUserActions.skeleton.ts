## File: apps/meteor/app/livechat/server/hooks/afterUserActions.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';

import { callbacks } from '../../../../server/lib/callbacks';
import { afterAgentUserActivated, afterAgentAdded, afterRemoveAgent } from '../lib/hooks';

type IAfterSaveUserProps = {
	user: IUser;
	oldUser: IUser | null;
};

const wasAgent = (user: Pick<IUser, 'roles'> | null) => user?.roles?.includes('livechat-agent');
const isAgent = (user: Pick<IUser, 'roles'> | null) => user?.roles?.includes('livechat-agent');

const handleAgentUpdated = async (userData: IAfterSaveUserProps) => {
    /* Implementation Hidden */
};

const handleAgentCreated = async (user: IUser) => {
    /* Implementation Hidden */
};

const handleDeactivateUser = async (user: IUser) => {
    /* Implementation Hidden */
};

const handleActivateUser = async (user: IUser) => {
    /* Implementation Hidden */
};

callbacks.add('afterCreateUser', handleAgentCreated, callbacks.priority.LOW, 'livechat-after-create-user-update-agent');

callbacks.add('afterSaveUser', handleAgentUpdated, callbacks.priority.LOW, 'livechat-after-save-user-update-agent');

callbacks.add('afterDeactivateUser', handleDeactivateUser, callbacks.priority.LOW, 'livechat-after-deactivate-user-remove-agent');

callbacks.add('afterActivateUser', handleActivateUser, callbacks.priority.LOW, 'livechat-after-activate-user-add-agent');

```