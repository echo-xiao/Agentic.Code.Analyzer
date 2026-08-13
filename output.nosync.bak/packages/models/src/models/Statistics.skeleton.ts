## File: packages/models/src/models/Statistics.ts

```typescript
import type { IStats } from '@rocket.chat/core-typings';
import type { IStatisticsModel } from '@rocket.chat/model-typings';
import type { Db, IndexDescription } from 'mongodb';

import { BaseRaw } from './BaseRaw';

export class StatisticsRaw extends BaseRaw<IStats> implements IStatisticsModel {
	constructor(db: Db) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	async findLast(): Promise<IStats> {
        /* Implementation Hidden */
    }

	async findLastStatsToken(): Promise<IStats['statsToken']> {
        /* Implementation Hidden */
    }

	async findMonthlyPeakConnections() {
        /* Implementation Hidden */
    }

	async findInstallationDates() {
        /* Implementation Hidden */
    }
}

```