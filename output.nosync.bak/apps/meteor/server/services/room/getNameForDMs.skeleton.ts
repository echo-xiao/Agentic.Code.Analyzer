## File: apps/meteor/server/services/room/getNameForDMs.ts

```typescript
import type { AtLeast, IUser } from '@rocket.chat/core-typings';

const getFname = (members: AtLeast<IUser, 'name' | 'username'>[]): string | undefined => {
    /* Implementation Hidden */
};
const getName = (members: AtLeast<IUser, 'name' | 'username'>[]): string | undefined => {
    /* Implementation Hidden */
};

type NameMap = { [userId: string]: { fname: string; name: string } };

export function getNameForDMs(members: AtLeast<IUser, '_id' | 'name' | 'username'>[]): NameMap {
    /* Implementation Hidden */
}

```