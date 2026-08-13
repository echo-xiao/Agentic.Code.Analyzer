## File: apps/meteor/server/api/lib/getPaginationItems.ts

```typescript
// If the count query param is higher than the "API_Upper_Count_Limit" setting, then we limit that
// If the count query param isn't defined, then we set it to the "API_Default_Count" setting
// If the count is zero, then that means unlimited and is only allowed if the setting "API_Allow_Infinite_Count" is true
import { settings } from '../../../app/settings/server';

export async function getPaginationItems(params: { offset?: string | number | null; count?: string | number | null }): Promise<{
	readonly offset: number;
	readonly count: number;
}> {
    /* Implementation Hidden */
}

```