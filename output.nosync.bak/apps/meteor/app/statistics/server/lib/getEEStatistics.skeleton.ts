## File: apps/meteor/app/statistics/server/lib/getEEStatistics.ts

```typescript
import { log } from 'console';

import { Analytics } from '@rocket.chat/core-services';
import type { IStats } from '@rocket.chat/core-typings';
import { License } from '@rocket.chat/license';
import { CannedResponse, OmnichannelServiceLevelAgreements, LivechatRooms, LivechatTag, LivechatUnit, Users } from '@rocket.chat/models';

type ENTERPRISE_STATISTICS = IStats['enterprise'];

type GenericStats = Pick<ENTERPRISE_STATISTICS, 'modules' | 'tags' | 'seatRequests'>;

type EEOnlyStats = Omit<ENTERPRISE_STATISTICS, keyof GenericStats>;

export async function getStatistics(): Promise<ENTERPRISE_STATISTICS> {
    /* Implementation Hidden */
}

async function getEEStatistics(): Promise<EEOnlyStats | undefined> {
    /* Implementation Hidden */
}

```