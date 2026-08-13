## File: apps/meteor/ee/server/models/raw/LivechatUnit.ts

```typescript
import type { IOmnichannelBusinessUnit, ILivechatDepartment } from '@rocket.chat/core-typings';
import type { FindPaginated, ILivechatUnitModel } from '@rocket.chat/model-typings';
import { LivechatUnitMonitors, LivechatDepartment, LivechatRooms, BaseRaw } from '@rocket.chat/models';
import type { FindOptions, Filter, FindCursor, Db, FilterOperators, UpdateResult, DeleteResult, Document, UpdateFilter } from 'mongodb';

const addQueryRestrictions = async (originalQuery: Filter<IOmnichannelBusinessUnit> = {}, unitsFromUser?: string[]) => {
    /* Implementation Hidden */
};

// We don't actually need Units to extends from Departments
export class LivechatUnitRaw extends BaseRaw<IOmnichannelBusinessUnit> implements ILivechatUnitModel {
	constructor(db: Db) {
        /* Implementation Hidden */
    }

	findPaginatedUnits(
		query: Filter<IOmnichannelBusinessUnit>,
		options?: FindOptions<IOmnichannelBusinessUnit>,
	): FindPaginated<FindCursor<IOmnichannelBusinessUnit>> {
        /* Implementation Hidden */
    }

	// @ts-expect-error - Overriding base types :)
	async findOne<P extends Document = IOmnichannelBusinessUnit>(
		originalQuery: Filter<IOmnichannelBusinessUnit>,
		options: FindOptions<IOmnichannelBusinessUnit>,
		extra?: Record<string, any>,
	): Promise<P | null> {
        /* Implementation Hidden */
    }

	override async findOneById<P extends Document = IOmnichannelBusinessUnit>(
		_id: IOmnichannelBusinessUnit['_id'],
		options: FindOptions<IOmnichannelBusinessUnit>,
		extra?: Record<string, any>,
	): Promise<P | null> {
        /* Implementation Hidden */
    }

	remove(query: Filter<IOmnichannelBusinessUnit>): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	async createOrUpdateUnit(
		_id: string | null,
		{ name, visibility }: { name: string; visibility: IOmnichannelBusinessUnit['visibility'] },
		ancestors: string[],
		monitors: { monitorId: string; username: string }[],
		departments: { departmentId: string }[],
	): Promise<Omit<IOmnichannelBusinessUnit, '_updatedAt'>> {
        /* Implementation Hidden */
    }

	removeParentAndAncestorById(parentId: string): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	incrementDepartmentsCount(_id: string): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	decrementDepartmentsCount(_id: string): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	override async removeById(_id: string): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	async removeByIdAndUnit(_id: string, unitsFromUser?: string[]): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	findOneByIdOrName(_idOrName: string, options: FindOptions<IOmnichannelBusinessUnit>): Promise<IOmnichannelBusinessUnit | null> {
        /* Implementation Hidden */
    }

	async findByMonitorId(monitorId: string): Promise<string[]> {
        /* Implementation Hidden */
    }

	async findMonitoredDepartmentsByMonitorId(monitorId: string, includeDisabled: boolean): Promise<ILivechatDepartment[]> {
        /* Implementation Hidden */
    }

	countUnits(): Promise<number> {
        /* Implementation Hidden */
    }
}

```