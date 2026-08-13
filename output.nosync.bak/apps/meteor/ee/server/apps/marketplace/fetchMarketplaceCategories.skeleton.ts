## File: apps/meteor/ee/server/apps/marketplace/fetchMarketplaceCategories.ts

```typescript
import type { AppCategory } from '@rocket.chat/core-typings';
import * as z from 'zod';

import { getMarketplaceHeaders } from './getMarketplaceHeaders';
import { MarketplaceAppsError, MarketplaceConnectionError, MarketplaceUnsupportedVersionError } from './marketplaceErrors';
import { getWorkspaceAccessToken } from '../../../../app/cloud/server';
import { settings } from '../../../../app/settings/server';
import { Apps } from '../orchestrator';

const fetchMarketplaceCategoriesSchema = z.array(
	z.object({
		id: z.string(),
		title: z.string(),
		description: z.string(),
		hidden: z.boolean(),
		createdDate: z.string(),
		modifiedDate: z.string(),
	}),
);

/**
 * Fetches marketplace categories from the marketplace API.
 *
 * @returns An array of marketplace categories (`AppCategory[]`).
 * @throws MarketplaceConnectionError when the HTTP request cannot be made.
 * @throws MarketplaceUnsupportedVersionError when the marketplace responds with status 426 and `errorMsg` equals `"unsupported version"`.
 * @throws MarketplaceAppsError when the marketplace returns an internal error (specific internal codes) or any other non-successful response.
 */
export async function fetchMarketplaceCategories(): Promise<AppCategory[]> {
    /* Implementation Hidden */
}

```