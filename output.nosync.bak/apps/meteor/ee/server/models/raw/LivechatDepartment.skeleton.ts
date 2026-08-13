## File: apps/meteor/ee/server/models/raw/LivechatDepartment.ts

```typescript
import type { ILivechatDepartment, RocketChatRecordDeleted, LivechatDepartmentDTO } from '@rocket.chat/core-typings';
import type { ILivechatDepartmentModel } from '@rocket.chat/model-typings';
import { LivechatDepartmentRaw } from '@rocket.chat/models';
import type {
	Collection,
	DeleteResult,
	Document,
	Filter,
	FindCursor,
	FindOptions,
	UpdateFilter,
	UpdateResult,
	Db,
	AggregationCursor,
} from 'mongodb';

declare module '@rocket.chat/model-typings' {
	interface ILivechatDepartmentModel {
		removeDepartmentFromForwardListById(departmentId: string): Promise<void>;
		unfilteredFind(query: Filter<ILivechatDepartment>, options: FindOptions<ILivechatDepartment>): FindCursor<ILivechatDepartment>;
		unfilteredFindOne(query: Filter<ILivechatDepartment>, options: FindOptions<ILivechatDepartment>): Promise<ILivechatDepartment | null>;
		unfilteredUpdate(
			query: Filter<ILivechatDepartment>,
			update: UpdateFilter<ILivechatDepartment>,
			options: FindOptions<ILivechatDepartment>,
		): Promise<UpdateResult>;
		unfilteredRemove(query: Filter<ILivechatDepartment>): Promise<DeleteResult>;
		removeParentAndAncestorById(id: string): Promise<UpdateResult | Document>;
		findEnabledWithAgentsAndBusinessUnit<T extends Document = ILivechatDepartment>(
			businessUnit?: string,
			projection?: FindOptions<T>['projection'],
		): FindCursor<T>;
		findByParentId(parentId: string, options?: FindOptions<ILivechatDepartment>): FindCursor<ILivechatDepartment>;
		findAgentsByBusinessHourId(businessHourId: string): AggregationCursor<{ agentIds: string[] }>;
	}
}

export class LivechatDepartmentEE extends LivechatDepartmentRaw implements ILivechatDepartmentModel {
	constructor(db: Db, trash?: Collection<RocketChatRecordDeleted<ILivechatDepartment>>) {
        /* Implementation Hidden */
    }

	override async removeDepartmentFromForwardListById(departmentId: string): Promise<void> {
        /* Implementation Hidden */
    }

	override unfilteredFind(query: Filter<ILivechatDepartment>, options: FindOptions<ILivechatDepartment>): FindCursor<ILivechatDepartment> {
        /* Implementation Hidden */
    }

	override unfilteredFindOne(
		query: Filter<ILivechatDepartment>,
		options: FindOptions<ILivechatDepartment>,
	): Promise<ILivechatDepartment | null> {
        /* Implementation Hidden */
    }

	override unfilteredUpdate(
		query: Filter<ILivechatDepartment>,
		update: UpdateFilter<ILivechatDepartment>,
		options: FindOptions<ILivechatDepartment>,
	): Promise<UpdateResult> {
        /* Implementation Hidden */
    }

	override unfilteredRemove(query: Filter<ILivechatDepartment>): Promise<DeleteResult> {
        /* Implementation Hidden */
    }

	override createOrUpdateDepartment(_id: string | null, data: LivechatDepartmentDTO): Promise<ILivechatDepartment> {
        /* Implementation Hidden */
    }

	override removeParentAndAncestorById(id: string): Promise<UpdateResult | Document> {
        /* Implementation Hidden */
    }

	override findActiveByUnitIds<T extends Document = ILivechatDepartment>(unitIds: string[], options: FindOptions<T> = {}): FindCursor<T> {
        /* Implementation Hidden */
    }

	override findEnabledWithAgentsAndBusinessUnit<T extends Document = ILivechatDepartment>(
		businessUnit?: string,
		projection?: FindOptions<T>['projection'],
	): FindCursor<T> {
        /* Implementation Hidden */
    }

	override findByParentId(parentId: string, options?: FindOptions<ILivechatDepartment>): FindCursor<ILivechatDepartment> {
        /* Implementation Hidden */
    }

	override findAgentsByBusinessHourId(businessHourId: string): AggregationCursor<{ agentIds: string[] }> {
        /* Implementation Hidden */
    }
}

```