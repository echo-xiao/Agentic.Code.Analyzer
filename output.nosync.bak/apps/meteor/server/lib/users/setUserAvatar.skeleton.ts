## File: apps/meteor/server/lib/users/setUserAvatar.ts

```typescript
import { api } from '@rocket.chat/core-services';
import type { IUser } from '@rocket.chat/core-typings';
import type { Updater } from '@rocket.chat/models';
import { Users } from '@rocket.chat/models';
import type { Response } from '@rocket.chat/server-fetch';
import { serverFetch as fetch } from '@rocket.chat/server-fetch';
import { Meteor } from 'meteor/meteor';
import type { ClientSession } from 'mongodb';

import { RocketChatFile } from '../../../app/file/server';
import { FileUpload } from '../../../app/file-upload/server';
import { settings } from '../../../app/settings/server';
import { onceTransactionCommitedSuccessfully } from '../../database/utils';
import { hasPermissionAsync } from '../authorization/hasPermission';
import { SystemLogger } from '../logger/system';

export const setAvatarFromServiceWithValidation = async (
	userId: string,
	dataURI: string,
	contentType?: string,
	service?: string,
	targetUserId?: string,
): Promise<void> => {
    /* Implementation Hidden */
};

export function setUserAvatar(
	user: Pick<IUser, '_id' | 'username'>,
	dataURI: Buffer,
	contentType: string,
	service: 'rest',
	etag?: string,
	updater?: Updater<IUser>,
	session?: ClientSession,
): Promise<void>;
export function setUserAvatar(
	user: Pick<IUser, '_id' | 'username'>,
	dataURI: string,
	contentType?: string,
	service?: 'initials' | 'url' | 'rest' | string,
	etag?: string,
	updater?: Updater<IUser>,
	session?: ClientSession,
): Promise<void>;
export async function setUserAvatar(
	user: Pick<IUser, '_id' | 'username'>,
	dataURI: string | Buffer,
	contentType: string | undefined,
	service?: 'initials' | 'url' | 'rest' | string,
	etag?: string,
	updater?: Updater<IUser>,
	session?: ClientSession,
): Promise<void> {
    /* Implementation Hidden */
}

```