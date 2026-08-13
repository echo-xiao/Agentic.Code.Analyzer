## File: ee/packages/federation-matrix/src/helpers/createOrUpdateFederatedUser.ts

```typescript
import { type IUser, UserStatus } from '@rocket.chat/core-typings';
import { Users } from '@rocket.chat/models';

/**
 * Helper function to create a federated user
 *
 * Because of historical reasons, we can have users only with federated flag but no federation object
 * So we need to upsert the user with the federation object
 */

export async function createOrUpdateFederatedUser(options: { username: string; name?: string; origin: string }): Promise<IUser> {
    /* Implementation Hidden */
}

```