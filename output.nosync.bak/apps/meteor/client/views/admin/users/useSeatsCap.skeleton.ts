## File: apps/meteor/client/views/admin/users/useSeatsCap.ts

```typescript
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { useQuery } from '@tanstack/react-query';

export type SeatCapProps = {
	maxActiveUsers: number;
	activeUsers: number;
	reload: () => void;
};

export const useSeatsCap = (): SeatCapProps | undefined => {
    /* Implementation Hidden */
};

```