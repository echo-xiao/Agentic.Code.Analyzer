## File: apps/meteor/app/utils/client/getURL.ts

```typescript
import { settings } from '../../../client/lib/settings';
import { getURLWithoutSettings } from '../lib/getURL';
import { Info } from '../rocketchat.info';

export const getURL = function (
	path: string, // eslint-disable-next-line @typescript-eslint/naming-convention
	params: {
		cdn?: boolean;
		full?: boolean;
		cloud?: boolean;
		cloud_route?: string;
		cloud_params?: Record<string, string>;
	} = {},
	cloudDeepLinkUrl?: string,
	cacheKey?: boolean,
): string {
    /* Implementation Hidden */
};

```