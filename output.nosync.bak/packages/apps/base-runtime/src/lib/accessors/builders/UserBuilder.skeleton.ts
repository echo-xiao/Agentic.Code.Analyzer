## File: packages/apps/base-runtime/src/lib/accessors/builders/UserBuilder.ts

```typescript
import type { IUserBuilder } from '@rocket.chat/apps-engine/definition/accessors/IUserBuilder';
import { RocketChatAssociationModel } from '@rocket.chat/apps-engine/definition/metadata/RocketChatAssociations';
import type { IUser } from '@rocket.chat/apps-engine/definition/users/IUser';
import type { IUserEmail } from '@rocket.chat/apps-engine/definition/users/IUserEmail';
import type { IUserSettings } from '@rocket.chat/apps-engine/definition/users/IUserSettings';

export class UserBuilder implements IUserBuilder {
	public kind: RocketChatAssociationModel.USER;

	private user: Partial<IUser>;

	constructor(user?: Partial<IUser>) {
        /* Implementation Hidden */
    }

	public setData(data: Partial<IUser>): IUserBuilder {
        /* Implementation Hidden */
    }

	public setEmails(emails: Array<IUserEmail>): IUserBuilder {
        /* Implementation Hidden */
    }

	public getEmails(): Array<IUserEmail> {
        /* Implementation Hidden */
    }

	public setDisplayName(name: string): IUserBuilder {
        /* Implementation Hidden */
    }

	public getDisplayName(): string {
        /* Implementation Hidden */
    }

	public setUsername(username: string): IUserBuilder {
        /* Implementation Hidden */
    }

	public getUsername(): string {
        /* Implementation Hidden */
    }

	public setRoles(roles: Array<string>): IUserBuilder {
        /* Implementation Hidden */
    }

	public getRoles(): Array<string> {
        /* Implementation Hidden */
    }

	public getSettings(): Partial<IUserSettings> {
        /* Implementation Hidden */
    }

	public getUser(): Partial<IUser> {
        /* Implementation Hidden */
    }
}

```