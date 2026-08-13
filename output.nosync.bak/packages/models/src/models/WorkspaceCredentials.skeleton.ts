## File: packages/models/src/models/WorkspaceCredentials.ts

```typescript
import type { IWorkspaceCredentials } from '@rocket.chat/core-typings';
import type { IWorkspaceCredentialsModel } from '@rocket.chat/model-typings';
import type { Db, DeleteResult, Filter, IndexDescription, UpdateResult } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class WorkspaceCredentialsRaw extends BaseRaw<IWorkspaceCredentials> implements IWorkspaceCredentialsModel {
	constructor(db: Db) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	getCredentialByScope(scope = ''): Promise<IWorkspaceCredentials | null> {
        /* Implementation Hidden */
    }

	updateCredentialByScope({
		scope,
		accessToken,
		expirationDate,
	}: {
		scope: string;
		accessToken: string;
		expirationDate: Date;
	}): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	removeAllCredentials(): Promise<DeleteResult> {
        /* Implementation Hidden */
    }
}

```