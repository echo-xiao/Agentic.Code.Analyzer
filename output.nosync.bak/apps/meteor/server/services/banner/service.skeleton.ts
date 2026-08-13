## File: apps/meteor/server/services/banner/service.ts

```typescript
import { randomUUID } from 'node:crypto';

import { api, ServiceClassInternal } from '@rocket.chat/core-services';
import type { IBannerService } from '@rocket.chat/core-services';
import type { BannerPlatform, IBanner, IBannerDismiss, Optional, IUser } from '@rocket.chat/core-typings';
import { Banners, BannersDismiss, Users } from '@rocket.chat/models';

export class BannerService extends ServiceClassInternal implements IBannerService {
	protected name = 'banner';

	async getById(bannerId: string): Promise<null | IBanner> {
        /* Implementation Hidden */
    }

	async discardDismissal(bannerId: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	async create(doc: Optional<IBanner, '_id' | '_updatedAt'>): Promise<IBanner> {
        /* Implementation Hidden */
    }

	async getBannersForUser(userId: string, platform: BannerPlatform, bannerId?: string): Promise<IBanner[]> {
        /* Implementation Hidden */
    }

	async dismiss(userId: string, bannerId: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	async disable(bannerId: string): Promise<boolean> {
        /* Implementation Hidden */
    }

	async enable(bannerId: string, doc: Partial<Omit<IBanner, '_id'>> = {}): Promise<boolean> {
        /* Implementation Hidden */
    }

	async sendToUsers(banner: IBanner): Promise<boolean> {
        /* Implementation Hidden */
    }
}

```