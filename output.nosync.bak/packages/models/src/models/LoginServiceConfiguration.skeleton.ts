## File: packages/models/src/models/LoginServiceConfiguration.ts

```typescript
import type { LoginServiceConfiguration, RocketChatRecordDeleted } from '@rocket.chat/core-typings';
import type { ILoginServiceConfigurationModel } from '@rocket.chat/model-typings';
import type { Collection, Db, Document, FindOptions } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class LoginServiceConfigurationRaw extends BaseRaw<LoginServiceConfiguration> implements ILoginServiceConfigurationModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<LoginServiceConfiguration>>) {
        /* Implementation Hidden */
    }

	async createOrUpdateService(
		serviceName: LoginServiceConfiguration['service'],
		serviceData: Partial<LoginServiceConfiguration>,
	): Promise<LoginServiceConfiguration['_id']> {
        /* Implementation Hidden */
    }

	removeByService(serviceName: LoginServiceConfiguration['service']): Promise<Pick<LoginServiceConfiguration, '_id'> | null> {
        /* Implementation Hidden */
    }

	async findOneByService<P extends Document = LoginServiceConfiguration>(
		serviceName: LoginServiceConfiguration['service'],
		options?: FindOptions<P>,
	): Promise<P | null> {
        /* Implementation Hidden */
    }
}

```