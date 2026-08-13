## File: packages/apps/src/server/accessors/UserBuilder.ts

```typescript
import type { IUserBuilder } from '@rocket.chat/apps-engine/definition/accessors';
import { RocketChatAssociationModel } from '@rocket.chat/apps-engine/definition/metadata';
import type { IUser, IUserEmail } from '@rocket.chat/apps-engine/definition/users';
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