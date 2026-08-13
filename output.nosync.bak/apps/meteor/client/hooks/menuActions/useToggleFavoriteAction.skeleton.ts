## File: apps/meteor/client/hooks/menuActions/useToggleFavoriteAction.ts

```typescript
import type { IRoom } from '@rocket.chat/core-typings';
import { useStableCallback } from '@rocket.chat/fuselage-hooks';
import { useEndpoint, useToastMessageDispatch } from '@rocket.chat/ui-contexts';

export const useToggleFavoriteAction = ({ rid, isFavorite }: { rid: IRoom['_id']; isFavorite: boolean }) => {
    /* Implementation Hidden */
};

```