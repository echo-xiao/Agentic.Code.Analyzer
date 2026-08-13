## File: apps/meteor/server/lib/ldap/UserConverter.ts

```typescript
import type { IImportUser, IUser } from '@rocket.chat/core-typings';
import { License } from '@rocket.chat/license';
import type { Logger } from '@rocket.chat/logger';
import { Users } from '@rocket.chat/models';

import { logger } from './Logger';
import type { ConverterCache } from '../../../app/importer/server/classes/converters/ConverterCache';
import type { RecordConverterOptions } from '../../../app/importer/server/classes/converters/RecordConverter';
import { UserConverter, type UserConverterOptions } from '../../../app/importer/server/classes/converters/UserConverter';
import { settings } from '../../../app/settings/server';

export class LDAPUserConverter extends UserConverter {
	private mergeExistingUsers: boolean;

	constructor(options?: UserConverterOptions & RecordConverterOptions, logger?: Logger, cache?: ConverterCache) {
        /* Implementation Hidden */
    }

	override async findExistingUser(data: IImportUser): Promise<IUser | undefined | null> {
        /* Implementation Hidden */
    }

	override async insertUser(userData: IImportUser): Promise<IUser['_id']> {
        /* Implementation Hidden */
    }

	static async convertSingleUser(userData: IImportUser, options?: UserConverterOptions): Promise<void> {
        /* Implementation Hidden */
    }
}

```