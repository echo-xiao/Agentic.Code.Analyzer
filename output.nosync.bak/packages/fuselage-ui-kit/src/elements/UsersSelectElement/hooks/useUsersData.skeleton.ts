## File: packages/fuselage-ui-kit/src/elements/UsersSelectElement/hooks/useUsersData.ts

```typescript
import { useEndpoint } from '@rocket.chat/ui-contexts';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { UserAutoCompleteOptionType } from '../UsersSelectElement';

type useUsersDataProps = {
	filter: string;
};

export const useUsersData = ({ filter }: useUsersDataProps) => {
    /* Implementation Hidden */
};

```