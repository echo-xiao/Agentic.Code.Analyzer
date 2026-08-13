## File: apps/meteor/client/views/room/contextualBar/RoomMembers/types.ts

```typescript
import type { IUser, IRole, SubscriptionStatus, UserStatus, Serialized } from '@rocket.chat/core-typings';

export type RoomMemberUser = Pick<Serialized<IUser>, 'username' | '_id' | 'name' | 'freeSwitchExtension' | 'federated' | 'createdAt'> & {
	roles?: IRole['_id'][];
	status?: UserStatus | SubscriptionStatus;
};

```