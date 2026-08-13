## File: apps/meteor/ee/server/apps/communication/endpoints/lib/makeAppLogsQuery.ts

```typescript
import type { AppLogsProps } from '@rocket.chat/rest-typings';

/**
 * Creates a query object for fetching app logs based on provided parameters.
 *
 * NOTE: This function expects that all values are in the correct format, as it is
 * used by an endpoint handler which has query parameter validation.
 *
 * @param queryParams - The query parameters.
 * @returns A query object for fetching app logs.
 * @throws {Error} If the date range is invalid.
 */
export function makeAppLogsQuery(queryParams: AppLogsProps) {
    /* Implementation Hidden */
}

```