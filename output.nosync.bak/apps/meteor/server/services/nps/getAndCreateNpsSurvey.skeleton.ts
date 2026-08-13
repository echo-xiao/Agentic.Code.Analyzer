## File: apps/meteor/server/services/nps/getAndCreateNpsSurvey.ts

```typescript
import { Banner } from '@rocket.chat/core-services';
import type { IBanner, BannerPlatform } from '@rocket.chat/core-typings';
import { serverFetch as fetch } from '@rocket.chat/server-fetch';
import type * as UiKit from '@rocket.chat/ui-kit';

import { getWorkspaceAccessToken } from '../../../app/cloud/server';
import { settings } from '../../../app/settings/server';
import { SystemLogger } from '../../lib/logger/system';

type NpsSurveyData = {
	id: string;
	platform: BannerPlatform[];
	roles: string[];
	survey: UiKit.BannerView;
	createdAt: Date;
	startAt: Date;
	expireAt: Date;
};

export const getAndCreateNpsSurvey = async function getNpsSurvey(npsId: string) {
    /* Implementation Hidden */
};

```