## File: apps/meteor/app/importer/server/classes/converters/UserConverter.ts

```typescript
import type { IImportUser, IImportUserRecord, IUser, IUserEmail } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';
import { Random } from '@rocket.chat/random';
import { SHA256 } from '@rocket.chat/sha256';
import { hash as bcryptHash } from 'bcrypt';
import { Accounts } from 'meteor/accounts-base';

import { RecordConverter, type RecordConverterOptions } from './RecordConverter';
import { generateTempPassword } from './generateTempPassword';
import { callbacks as systemCallbacks } from '../../../../../server/lib/callbacks';
import { addUserToDefaultChannels } from '../../../../../server/lib/rooms/addUserToDefaultChannels';
import { generateUsernameSuggestion } from '../../../../../server/lib/users/getUsernameSuggestion';
import { saveUserIdentity } from '../../../../../server/lib/users/saveUserIdentity';
import { setUserActiveStatus } from '../../../../../server/lib/users/setUserActiveStatus';
import { notifyOnUserChange } from '../../../../lib/server/lib/notifyListener';
import type { IConversionCallbacks } from '../../definitions/IConversionCallbacks';

export type UserConverterOptions = {
	flagEmailsAsVerified?: boolean;
	skipExistingUsers?: boolean;
	skipNewUsers?: boolean;
	skipUserCallbacks?: boolean;
	skipDefaultChannels?: boolean;

	quickUserInsertion?: boolean;
	enableEmail2fa?: boolean;
	syncVoipExtension?: boolean;
};

export class UserConverter extends RecordConverter<IImportUserRecord, UserConverterOptions & RecordConverterOptions> {
	private insertedIds = new Set<IUser['_id']>();

	private updatedIds = new Set<IUser['_id']>();

	protected override async convertRecord(record: IImportUserRecord): Promise<boolean | undefined> {
        /* Implementation Hidden */
    }

	override async convertData(userCallbacks: IConversionCallbacks = {}): Promise<void> {
        /* Implementation Hidden */
    }

	public async batchConversion({ afterBatchFn, ...callbacks }: IConversionCallbacks = {}): Promise<void> {
        /* Implementation Hidden */
    }

	private async insertUserBatch(users: IUser[], { afterBatchFn }: IConversionCallbacks): Promise<string[]> {
        /* Implementation Hidden */
    }

	async findExistingUser(data: IImportUser): Promise<IUser | null | undefined> {
        /* Implementation Hidden */
    }

	addUserImportId(updateData: Record<string, any>, userData: IImportUser): void {
        /* Implementation Hidden */
    }

	addUserEmails(updateData: Record<string, any>, userData: IImportUser, existingEmails: Array<IUserEmail>): void {
        /* Implementation Hidden */
    }

	addUserServices(updateData: Record<string, any>, userData: IImportUser): void {
        /* Implementation Hidden */
    }

	addCustomFields(updateData: Record<string, any>, userData: IImportUser): void {
        /* Implementation Hidden */
    }

	async insertOrUpdateUser(existingUser: IUser | null | undefined, data: IImportUser): Promise<void> {
        /* Implementation Hidden */
    }

	async updateUser(existingUser: IUser, userData: IImportUser): Promise<void> {
        /* Implementation Hidden */
    }

	async hashPassword(password: string): Promise<string> {
        /* Implementation Hidden */
    }

	generateTempPassword(userData: IImportUser): string {
        /* Implementation Hidden */
    }

	async buildNewUserObject(userData: IImportUser): Promise<Partial<IUser>> {
        /* Implementation Hidden */
    }

	private async buildUserBatch(usersData: IImportUser[]): Promise<IUser[]> {
        /* Implementation Hidden */
    }

	async insertUser(userData: IImportUser): Promise<IUser['_id']> {
        /* Implementation Hidden */
    }

	protected guessNameFromUsername(username: string): string {
        /* Implementation Hidden */
    }

	protected override getDataType(): 'user' {
        /* Implementation Hidden */
    }
}

```