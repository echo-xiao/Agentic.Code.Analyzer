## File: packages/ui-client/src/hooks/useUserDisplayName.ts

```typescript
import type { IUser } from '@rocket.chat/core-typings';
import { getUserDisplayName } from '@rocket.chat/core-typings';
import { useSetting } from '@rocket.chat/ui-contexts';

export const useUserDisplayName = ({ name, username }: Pick<IUser, 'name' | 'username'>): string | undefined => {
    /* Implementation Hidden */
};

```