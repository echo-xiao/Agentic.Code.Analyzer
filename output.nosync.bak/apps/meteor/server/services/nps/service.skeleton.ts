## File: apps/meteor/server/services/nps/service.ts

```typescript
import { createHash } from 'node:crypto';

import type { INPSService, NPSVotePayload, NPSCreatePayload } from '@rocket.chat/core-services';
import { ServiceClassInternal, Banner, NPS, Settings } from '@rocket.chat/core-services';
import type { INpsVote, INps } from '@rocket.chat/core-typings';
import { NPSStatus, INpsVoteStatus } from '@rocket.chat/core-typings';
import { Nps, NpsVote } from '@rocket.chat/models';

import { getBannerForAdmins, notifyAdmins } from './notification';
import { sendNpsResults } from './sendNpsResults';
import { SystemLogger } from '../../lib/logger/system';

export class NPSService extends ServiceClassInternal implements INPSService {
	protected name = 'nps';

	async create(nps: NPSCreatePayload): Promise<boolean> {
        /* Implementation Hidden */
    }

	async sendResults(): Promise<void> {
        /* Implementation Hidden */
    }

	async vote({ userId, npsId, roles, score, comment }: NPSVotePayload): Promise<void> {
        /* Implementation Hidden */
    }

	async closeOpenSurveys(): Promise<void> {
        /* Implementation Hidden */
    }
}

```