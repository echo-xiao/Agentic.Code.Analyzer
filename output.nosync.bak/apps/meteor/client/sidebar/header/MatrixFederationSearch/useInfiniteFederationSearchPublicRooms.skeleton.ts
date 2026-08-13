## File: apps/meteor/client/sidebar/header/MatrixFederationSearch/useInfiniteFederationSearchPublicRooms.ts

```typescript
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useInfiniteQuery } from '@tanstack/react-query';

const tenMinutes = 10 * 60 * 1000;

export const useInfiniteFederationSearchPublicRooms = (serverName: string, roomName?: string, count?: number) => {
    /* Implementation Hidden */
};

```