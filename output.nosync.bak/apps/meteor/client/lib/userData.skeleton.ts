## File: apps/meteor/client/lib/userData.ts

```typescript
import type { ILivechatAgent, IUser, Serialized } from '@rocket.chat/core-typings';
import { createTransformFromUpdateFilter } from '@rocket.chat/mongo-adapter';
import { create } from 'zustand';

import { sdk } from '../../app/utils/client/lib/SDKClient';
import { Users } from '../stores';

export const useUserDataSyncReady = create(() => false);

type RawUserData = Serialized<
	Pick<
		IUser,
		| '_id'
		| 'type'
		| 'name'
		| 'username'
		| 'emails'
		| 'status'
		| 'statusDefault'
		| 'statusText'
		| 'statusExpiresAt'
		| 'statusConnection'
		| 'avatarOrigin'
		| 'utcOffset'
		| 'language'
		| 'settings'
		| 'roles'
		| 'active'
		| 'defaultRoom'
		| 'customFields'
		| 'oauth'
		| 'createdAt'
		| '_updatedAt'
		| 'avatarETag'
	> & { statusLivechat?: ILivechatAgent['statusLivechat'] }
>;

const updateUser = (userData: IUser): void => {
    /* Implementation Hidden */
};

let cancel: undefined | (() => void);
export const synchronizeUserData = async (uid: IUser['_id']): Promise<RawUserData | void> => {
    /* Implementation Hidden */
};

export const removeLocalUserData = () => {
    /* Implementation Hidden */
};

```