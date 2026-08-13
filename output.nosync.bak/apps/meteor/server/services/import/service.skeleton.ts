## File: apps/meteor/server/services/import/service.ts

```typescript
import { ServiceClassInternal } from '@rocket.chat/core-services';
import type { IImportService } from '@rocket.chat/core-services';
import type { IImportUser, IImport, ImportStatus } from '@rocket.chat/core-typings';
import { Imports, ImportData } from '@rocket.chat/models';
import { ObjectId } from 'mongodb';

import { Importers } from '../../../app/importer/server';
import { settings } from '../../../app/settings/server';
import { validateRoleList } from '../../lib/roles/validateRoleList';
import { getNewUserRoles } from '../user/lib/getNewUserRoles';

export class ImportService extends ServiceClassInternal implements IImportService {
	protected name = 'import';

	public async clear(): Promise<void> {
        /* Implementation Hidden */
    }

	public async newOperation(userId: string, name: string, key: string): Promise<IImport> {
        /* Implementation Hidden */
    }

	private getStateOfOperation(operation: IImport): 'none' | 'new' | 'loading' | 'ready' | 'importing' | 'done' | 'error' | 'canceled' {
        /* Implementation Hidden */
    }

	public async status(): Promise<ImportStatus> {
        /* Implementation Hidden */
    }

	private assertsValidStateForNewData(operation: IImport | undefined): asserts operation is IImport {
        /* Implementation Hidden */
    }

	public async addUsers(users: Omit<IImportUser, '_id' | 'services' | 'customFields'>[]): Promise<void> {
        /* Implementation Hidden */
    }

	public async run(userId: string): Promise<void> {
        /* Implementation Hidden */
    }
}

```