## File: apps/meteor/client/lib/userStatuses.ts

```typescript
import { UserStatus } from '@rocket.chat/core-typings';
import type { ICustomUserStatus } from '@rocket.chat/core-typings';

export type UserStatusDescriptor = {
	id: string;
	name: string;
	statusType: UserStatus;
	localizeName: boolean;
};

export type UserStatusStreamCallback = (data: { userStatusData: ICustomUserStatus }) => void;
export type UserStatusStreamer = (event: 'updateCustomUserStatus' | 'deleteCustomUserStatus', cb: UserStatusStreamCallback) => () => void;
export type UserStatusLister = () => Promise<ICustomUserStatus[] | null | undefined>;

export class UserStatuses implements Iterable<UserStatusDescriptor> {
	public invisibleAllowed = true;

	private store: Map<UserStatusDescriptor['id'], UserStatusDescriptor> = new Map(
		[UserStatus.ONLINE, UserStatus.AWAY, UserStatus.BUSY, UserStatus.OFFLINE].map((status) => [
			status,
			{
				id: status,
				name: status,
				statusType: status,
				localizeName: true,
			},
		]),
	);

	public delete(id: string): void {
        /* Implementation Hidden */
    }

	public put(customUserStatus: UserStatusDescriptor): void {
        /* Implementation Hidden */
    }

	public createFromCustom(customUserStatus: Omit<ICustomUserStatus, '_updatedAt'>): UserStatusDescriptor {
        /* Implementation Hidden */
    }

	public isValidType(type: string): type is UserStatus {
        /* Implementation Hidden */
    }

	public *[Symbol.iterator]() {
        /* Implementation Hidden */
    }

	public async sync(listCustomUserStatus: UserStatusLister) {
        /* Implementation Hidden */
    }

	public watch(stream: UserStatusStreamer, cb?: () => void) {
        /* Implementation Hidden */
    }
}

export const userStatuses = new UserStatuses();

```