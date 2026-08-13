## File: apps/meteor/ee/server/models/raw/LivechatUnitMonitors.ts

```typescript
import type { ILivechatUnitMonitor } from '@rocket.chat/core-typings';
import type { ILivechatUnitMonitorsModel } from '@rocket.chat/model-typings';
import { BaseRaw } from '@rocket.chat/models';
import type { Db, FindCursor, UpdateResult, DeleteResult, IndexDescription } from 'mongodb';

export class LivechatUnitMonitorsRaw extends BaseRaw<ILivechatUnitMonitor> implements ILivechatUnitMonitorsModel {
	constructor(db: Db) {
        /* Implementation Hidden */
    }

	protected override modelIndexes(): IndexDescription[] {
        /* Implementation Hidden */
    }

	findByUnitId(unitId: string): FindCursor<ILivechatUnitMonitor> {
        /* Implementation Hidden */
    }

	findByMonitorId(monitorId: string): FindCursor<ILivechatUnitMonitor> {
        /* Implementation Hidden */
    }

	saveMonitor(monitor: { monitorId: string; unitId: string; username: string }): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	removeByUnitIdAndMonitorId(unitId: string, monitorId: string): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	removeByUnitId(unitId: string): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	removeByMonitorId(monitorId: string): Promise<DeleteResult> {
        /* Implementation Hidden */
    }
}

```