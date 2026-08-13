## File: apps/meteor/server/lib/auditServerEvents/userChanged.ts

```typescript
import type { IAuditServerUserActor, IServerEvents, ExtractDataToParams, IUser } from '@rocket.chat/core-typings';
import { ServerEvents } from '@rocket.chat/models';
import type { UpdateFilter } from 'mongodb';

const userKeysToObfuscate = ['authorizedClients', 'e2e', 'inviteToken', 'oauth'];
const nestableKeysToObfuscate = ['services', 'password', 'bcrypt']; // ex: services.password.bcrypt

const obfuscateServices = (services: Record<string, any>): Record<string, any> => {
    /* Implementation Hidden */
};
export class UserChangedAuditStore {
	private originalUser: Partial<IUser> | undefined;

	private updateFilter: UpdateFilter<IUser> | undefined;

	private actor: IAuditServerUserActor;

	constructor(actor: Omit<IAuditServerUserActor, 'type'>, type: IAuditServerUserActor['type'] = 'user') {
        /* Implementation Hidden */
    }

	public setOriginalUser(user: Partial<IUser>) {
        /* Implementation Hidden */
    }

	public setUpdateFilter(updateFilter: UpdateFilter<IUser>) {
        /* Implementation Hidden */
    }

	private filterUserChangedProperties(originalUser: Partial<IUser>, updateFilter: UpdateFilter<IUser>): Partial<IUser> {
        /* Implementation Hidden */
    }

	private getEventData(
		originalUser: Partial<IUser>,
		updateFilter: UpdateFilter<IUser>,
	): ExtractDataToParams<IServerEvents['user.changed']> {
        /* Implementation Hidden */
    }

	private buildEvent(): ['user.changed', ExtractDataToParams<IServerEvents['user.changed']>, IAuditServerUserActor] {
        /* Implementation Hidden */
    }

	public async commitAuditEvent() {
        /* Implementation Hidden */
    }
}

```